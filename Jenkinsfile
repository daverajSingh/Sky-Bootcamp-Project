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
            // Clean using a root container to remove any root-owned files from previous runs
            sh '''
              set +e
              if command -v docker >/dev/null 2>&1; then
                docker run --rm -v "$WORKSPACE":/w alpine sh -c 'rm -rf /w/* /w/.[!.]* /w/..?* || true'
              else
                chmod -R u+rwX . 2>/dev/null || true
                find . -mindepth 1 -maxdepth 1 -exec rm -rf {} + 2>/dev/null || true
              fi
            '''
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

    stage('Connectivity check (non-blocking)') {
      steps {
        script {
          // Try local and public URL without failing the build; print diagnostics to help debugging
          def url = params.FRONTEND_URL?.trim()
          if (!url) { url = 'http://localhost:84' }
          sh label: 'Probe localhost:84 and FRONTEND_URL', script: """
            set +e
            echo '--- Connectivity check start ---'
            echo '[1/3] Curl localhost:84'
            for i in 1 2 3 4 5; do
              curl -sS -D - -o /dev/null http://localhost:84 && break || sleep 2
            done || echo 'Curl to localhost:84 failed'
            echo '\n[2/3] Curl FRONTEND_URL: ${url}'
            for i in 1 2 3 4 5; do
              curl -sS -D - -o /dev/null "${url}" && break || sleep 2
            done || echo 'Curl to FRONTEND_URL failed (likely firewall or DNS)'
            echo '\n[3/3] Frontend container recent logs'
            (docker compose -f "${WORKSPACE}/docker-compose.yml" logs --no-color --tail=100 frontend || docker-compose -f "${WORKSPACE}/docker-compose.yml" logs --no-color --tail=100 frontend || true)
            echo '--- Connectivity check end ---'
            exit 0
          """
        }
      }
    }

    stage('Inspect frontend container (non-blocking)') {
      steps {
        sh '''
          set +e
          echo '--- Inspect frontend container ---'
          FRONTEND_CID=$(docker compose -f "${WORKSPACE}/docker-compose.yml" ps -q frontend 2>/dev/null || docker-compose -f "${WORKSPACE}/docker-compose.yml" ps -q frontend 2>/dev/null)
          if [ -n "$FRONTEND_CID" ]; then
            echo '[1/4] Process list:'
            docker exec "$FRONTEND_CID" sh -lc 'ps aux | sed -n "1,80p"' || true
            echo '\n[2/4] Listening TCP ports:'
            docker exec "$FRONTEND_CID" sh -lc 'command -v ss >/dev/null 2>&1 && ss -ltpn || (command -v netstat >/dev/null 2>&1 && netstat -ltpn) || echo "ss/netstat not available"' || true
            echo '\n[3/4] Node/NPm versions:'
            docker exec "$FRONTEND_CID" sh -lc 'node -v && npm -v' || true
            echo '\n[4/4] App dir check:'
            docker exec "$FRONTEND_CID" sh -lc 'ls -la /app | sed -n "1,120p"; [ -d /app/node_modules ] && echo "node_modules present" || echo "node_modules missing"' || true
          else
            echo 'Frontend container ID not found.'
          fi
          echo '--- End inspect ---'
          exit 0
        '''
      }
    }
  }

  post {
    always {
      script {
        // Use absolute path to avoid workspace suffix issues (e.g., @2)
        def composeFile = "${env.WORKSPACE}/docker-compose.yml"
        sh """
          set -e
          if [ -f "${composeFile}" ]; then
            (docker compose -f "${composeFile}" ps || docker-compose -f "${composeFile}" ps || true)
            (docker compose -f "${composeFile}" logs --no-color --tail=200 frontend || docker-compose -f "${composeFile}" logs --no-color --tail=200 frontend || true)
          fi
        """
        archiveArtifacts artifacts: 'docker-compose.yml', fingerprint: true, onlyIfSuccessful: false
      }
    }
  }
}
