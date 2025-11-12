pipeline {
  agent any

  options {
    timestamps()
    ansiColor('xterm')
  }

  environment {
    COMPOSE_CMD = ''
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Prepare Compose Command') {
      steps {
        script {
          def hasPlugin = sh(returnStatus: true, script: 'docker compose version >/dev/null 2>&1') == 0
          def hasLegacy = sh(returnStatus: true, script: 'docker-compose version >/dev/null 2>&1') == 0
          if (hasPlugin) {
            env.COMPOSE_CMD = 'docker compose'
          } else if (hasLegacy) {
            env.COMPOSE_CMD = 'docker-compose'
          } else {
            error "Neither 'docker compose' nor 'docker-compose' is available on this agent."
          }
        }
      }
    }

    stage('Create environment files') {
      steps {
        sh 'mkdir -p backend frontend'
        // Expect three Secret Text credentials in Jenkins containing the full file content
        // - ID: backend-env  -> for backend/.env
        // - ID: frontend-env -> for frontend/.env
        // - ID: db-env       -> for backend/.env.db
        withCredentials([
          string(credentialsId: 'backend-env', variable: 'BACKEND_ENV'),
          string(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV'),
          string(credentialsId: 'db-env', variable: 'DB_ENV')
        ]) {
          writeFile file: 'backend/.env', text: "${BACKEND_ENV}\n"
          writeFile file: 'frontend/.env', text: "${FRONTEND_ENV}\n"
          writeFile file: 'backend/.env.db', text: "${DB_ENV}\n"
        }
      }
    }

    stage('Build and Run with Compose') {
      steps {
        sh '''
          set -euxo pipefail
          ${COMPOSE_CMD} down || true
          ${COMPOSE_CMD} up -d --build
          ${COMPOSE_CMD} ps
        '''
      }
    }

    stage('Smoke test') {
      when { expression { return env.SKIP_SMOKE_TEST != 'true' } }
      steps {
        sh '''
          set +e
          # Wait for backend to be ready
          for i in $(seq 1 40); do
            curl -fsS http://localhost:5004/api/faq >/dev/null 2>&1 && exit 0
            sleep 3
          done
          echo "Backend did not become ready in time" >&2
          ${COMPOSE_CMD} logs backend || true
          exit 1
        '''
      }
    }
  }

  post {
    always {
      sh "${env.COMPOSE_CMD ?: 'docker compose'} ps || true"
      sh "${env.COMPOSE_CMD ?: 'docker compose'} logs --no-color --tail=200 || true"
      archiveArtifacts artifacts: 'docker-compose.yml', fingerprint: true, onlyIfSuccessful: false
    }
  }
}
