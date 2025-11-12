pipeline {
  agent any

  options {
    timestamps()
    skipDefaultCheckout(true)
  }

  parameters {
    string(name: 'FRONTEND_URL', defaultValue: 'http://localhost:84', description: 'Public URL where the frontend will be available')
  }

  environment {
    COMPOSE_CMD = ''
  }

  stages {
    stage('Checkout') {
      options { timeout(time: 5, unit: 'MINUTES') }
      steps {
        script {
          // Clean workspace, then perform a robust explicit Git checkout
          retry(2) {
            // Relax perms and clear any leftover files that might be owned by another user
            sh '''
              set +e
              chmod -R u+rwX . 2>/dev/null || true
              find . -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
            '''
            deleteDir()
            checkout([
              $class: 'GitSCM',
              branches: [[name: '*/dev-ops-again']],
              doGenerateSubmoduleConfigurations: false,
              extensions: [
                [$class: 'CleanBeforeCheckout'],
                [$class: 'CloneOption', noTags: false, reference: '', shallow: false, depth: 0, timeout: 60]
              ],
              userRemoteConfigs: [[url: 'https://github.com/daverajSingh/Sky-Bootcamp-Project']]
            ])
          }
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
            cp "$BACKEND_ENV_FILE" backend/.env
            cp "$FRONTEND_ENV_FILE" frontend/.env
            cp "$DB_ENV_FILE" backend/.env.db
            # Secure the copied files (leave directory perms intact)
            chmod 600 backend/.env backend/.env.db frontend/.env || true
          '''
        }
      }
    }

    stage('Build and Run with Compose') {
      steps {
        sh '''
          set -ex
          # Try docker compose v2, then fall back to legacy docker-compose
          (docker compose -f docker-compose.yml down || docker-compose -f docker-compose.yml down || true)
          (docker compose -f docker-compose.yml up -d --build || docker-compose -f docker-compose.yml up -d --build)
          (docker compose -f docker-compose.yml ps || docker-compose -f docker-compose.yml ps)
        '''
      }
    }

    stage('Report deployment URL') {
      steps {
        script {
          def url = params.FRONTEND_URL?.trim()
          if (!url) { url = 'http://localhost:84' }
          echo "Frontend is available at: ${url}"
          currentBuild.description = "Frontend: ${url}"
        }
      }
    }
  }

  post {
    always {
      script {
        node {
          dir(env.WORKSPACE) {
            if (fileExists('docker-compose.yml')) {
              sh '''
                set -e
                (docker compose -f docker-compose.yml ps || docker-compose -f docker-compose.yml ps || true)
                (docker compose -f docker-compose.yml logs --no-color --tail=200 || docker-compose -f docker-compose.yml logs --no-color --tail=200 || true)
              '''
              archiveArtifacts artifacts: 'docker-compose.yml', fingerprint: true, onlyIfSuccessful: false
            }
          }
        }
      }
    }
  }
}
