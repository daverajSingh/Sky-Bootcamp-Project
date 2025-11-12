pipeline {
  agent any

  environment {
    DOCKER_COMPOSE_FILE = 'docker-compose.yml'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Inject environment files') {
      steps {
        withCredentials([
          file(credentialsId: 'backend-env-team4', variable: 'BACKEND_ENV'),
          file(credentialsId: 'frontend-env-team4', variable: 'FRONTEND_ENV'),
          file(credentialsId: 'sql-env-team4', variable: 'DB_ENV')
        ]) {
            script {
                def dbEnvContent = readFile(file: env.DB_ENV)
                def backendEnvContent = readFile(file: env.BACKEND_ENV)
                def frontendEnvContent = readFile(file: env.FRONTEND_ENV)

                writeFile file: '/.env', text: dbEnvContent
                writeFile file: '/backend/.env', text: backendEnvContent
                writeFile file: '/frontend/.env', text: frontendEnvContent
            }
        }
      }
    }

    stage('Build and Deploy with Docker Compose') {
      steps {
        script {
          echo 'Deploying services with docker compose'
          dir("${WORKSPACE}") {
            // Stop old containers but keep images for caching
            sh 'docker compose -f ${DOCKER_COMPOSE_FILE} down --remove-orphans || true'
            sh 'docker container prune -f || true'

            // Build and start containers
            sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up -d --build --force-recreate'

            // Give containers time to start and show status
            sleep time: 5, unit: 'SECONDS'
            sh 'docker compose -f ${DOCKER_COMPOSE_FILE} ps'
          }
        }
      }
    }
  }

  post {
    always {
      script {
        echo '=== docker compose ps ==='
        dir("${WORKSPACE}") {
          sh 'docker compose -f ${DOCKER_COMPOSE_FILE} ps || true'
          sh 'docker compose -f ${DOCKER_COMPOSE_FILE} logs --tail=200 || true'
        }
      }
    }

    success {
      script {
        echo '✓ Pipeline completed successfully!'
        echo 'Services running:'
        echo '  - Frontend: http://localhost:84'
        echo '  - Backend: http://localhost:5004'
        echo '  - MySQL: localhost:3304'
      }
    }

    failure {
      script {
        echo '✗ Pipeline failed — collecting debug info...'
        dir("${WORKSPACE}") {
          sh 'docker compose -f ${DOCKER_COMPOSE_FILE} ps || true'
          sh 'docker compose -f ${DOCKER_COMPOSE_FILE} logs --tail=500 || true'
        }
      }
    }
  }
}
}
