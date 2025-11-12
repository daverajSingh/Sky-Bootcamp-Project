pipeline {
  agent any

  environment {
    COMPOSE_FILE = 'docker-compose.yml'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Inject .env files') {
      steps {
        withCredentials([
          file(credentialsId: 'backend-env-team4', variable: 'BACKEND_ENV'),
          file(credentialsId: 'frontend-env-team4', variable: 'FRONTEND_ENV'),
          file(credentialsId: 'sql-env-team4', variable: 'DB_ENV')
        ]) {
          sh '''
            echo "[INFO] Injecting environment files..."
            cp $BACKEND_ENV ./backend/.env
            chmod 600 ./backend/.env
            cp $FRONTEND_ENV ./frontend/.env
            chmod 600 ./frontend/.env
            cp $DB_ENV ./.env
            chmod 600 ./.env
          '''
        }
      }
    }

    // stage('Frontend Tests') {
    //   steps {
    //     dir('frontend') {
    //       sh '''
    //         echo "[INFO] Running frontend tests..."
    //         npm ci
    //         npm run test
    //       '''
    //     }
    //   }
    // }

    // stage('Backend Tests') {
    //   steps {
    //     dir('backend') {
    //       sh '''
    //         echo "[INFO] Running backend tests..."
    //         pip install -r requirements.txt
    //         pytest --maxfail=1 --disable-warnings -q
    //       '''
    //     }
    //   }
    // }

    stage('Build Docker Images') {
      steps {
        script {
          echo "[INFO] Building backend and frontend Docker images..."
          sh 'docker build -t app-backend:latest ./backend'
          sh 'docker build -t app-frontend:latest ./frontend'
        }
      }
    }

    stage('Deploy with Docker Compose') {
      steps {
        script {
          echo "[INFO] Starting application with Docker Compose..."
          sh '''
            docker compose up -d --build
          '''
        }
      }
    }

    // stage('Verify Deployment') {
    //   steps {
    //     script {
    //       echo "[INFO] Verifying deployment..."
    //       // Replace with your actual frontend health endpoint
    //       sh 'curl -f http://localhost:84 || (echo "Frontend not reachable" && exit 1)'
    //     }
    //   }
    // }
  }

  // post {
  //   always {
  //     echo "[INFO] Cleaning up unused Docker resources..."
  //     sh 'docker system prune -f'
  //   }
  //   failure {
  //     echo "[ERROR] Pipeline failed."
  //   }
  //   success {
  //     echo "[SUCCESS] Pipeline completed successfully!"
  //   }
  // }
}
