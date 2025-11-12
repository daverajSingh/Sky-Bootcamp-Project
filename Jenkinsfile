pipeline {
  agent any

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
                file(credentialsId: 'frontend-env-team4', variable: 'FRONTEND_ENV')
            ]) {
                sh '''
                    cp $BACKEND_ENV ./backend/  # copy root .env to repo root
                    cp $FRONTEND_ENV ./frontend/  # copy frontend .env
                '''
            }
        }
    }

    // stage('MYSQL Server') {

    // }

    stage('Install Frontend Dependencies & Build') {
        steps {
            sh "npm install"
            sh "npm run build"
        }
    }

    stage('Run Frontend Test') {
        steps {
          // Run the ReactJS tests
          sh "npm run test"
        }
    }

    // stage('Install Backend Dependencies & Build') {
    //     steps {
    //         sh ""
    //     }
    // }

    // stage('Run Backend Tests') {
    //     steps {

    //     }
    // }



    // stage('SonarQube Analysis') {
    //   environment {
    //     scannerHome = tool 'sonarqube'
    //   }
    //     steps {
    //         withSonarQubeEnv('sonar-qube-1') {        
    //           sh "${scannerHome}/bin/sonar-scanner"
    //     }
    //     timeout(time: 10, unit: 'MINUTES'){
    //       waitForQualityGate abortPipeline: true
    //     }
    //   }
    // }
  }
}