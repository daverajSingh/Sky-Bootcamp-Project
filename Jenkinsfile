pipeline {
  agent any

  options {
    timestamps()
  }

  environment {
    COMPOSE_CMD = ''
  }

  stages {
    stage('Checkout') {
      options { timeout(time: 5, unit: 'MINUTES') }
      steps {
        retry(2) {
          deleteDir()
          checkout([
            $class: 'GitSCM',
            branches: [[name: '*/dev-ops-again']],
            doGenerateSubmoduleConfigurations: false,
            extensions: [[
              $class: 'CloneOption',
              noTags: false,
              reference: '',
              shallow: false,
              depth: 0,
              timeout: 30
            ]],
            userRemoteConfigs: [[
              url: 'https://github.com/daverajSingh/Sky-Bootcamp-Project'
            ]]
          ])
        }
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
        // Expect three Secret File credentials in Jenkins containing the file contents
        // - ID: backend-env  -> binds path to $BACKEND_ENV_FILE (will be copied to backend/.env)
        // - ID: frontend-env -> binds path to $FRONTEND_ENV_FILE (will be copied to frontend/.env)
        // - ID: db-env       -> binds path to $DB_ENV_FILE (will be copied to backend/.env.db)
        withCredentials([
          file(credentialsId: 'backend-env', variable: 'BACKEND_ENV_FILE'),
          file(credentialsId: 'frontend-env', variable: 'FRONTEND_ENV_FILE'),
          file(credentialsId: 'db-env', variable: 'DB_ENV_FILE')
        ]) {
          sh '''
            set -eux
            cp "$BACKEND_ENV_FILE" backend/.env
            cp "$FRONTEND_ENV_FILE" frontend/.env
            cp "$DB_ENV_FILE" backend/.env.db
          '''
        }
      }
    }

    stage('Build and Run with Compose') {
      steps {
        sh '''
          set -eux
          ${COMPOSE_CMD} down || true
          ${COMPOSE_CMD} up -d --build
          ${COMPOSE_CMD} ps
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
