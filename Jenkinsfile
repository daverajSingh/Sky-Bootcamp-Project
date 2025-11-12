pipeline {
    agent any

    environment {
        // Backend environment
        BACKEND_DIR = 'backend'
        FRONTEND_DIR = 'frontend'
        DB_NAME = 'simpossible'
        DB_USER = 'root'
        DB_PORT = '3306'
    }

    stages {
        stage('Preparation') {
            steps {
                echo 'Cleaning workspace...'
                cleanWs()
                checkout scm
            }
        }

        stage('Start MySQL Server') {
            steps {
                echo 'Starting MySQL service...'
                sh '''
                    sudo service mysql start
                    mysql -u root -e "CREATE DATABASE IF NOT EXISTS ${DB_NAME};"
                '''
            }
        }

        stage('Setup Backend') {
            steps {
                dir("${BACKEND_DIR}") {
                    echo 'Setting up Python backend environment...'
                    sh '''
                        python3 -m venv venv
                        source venv/bin/activate
                        pip install -r requirements.txt
                    '''
                }
            }
        }

        // stage('Run Backend Tests') {
        //     steps {
        //         dir("${BACKEND_DIR}") {
        //             echo 'Running backend tests...'
        //             sh '''
        //                 source venv/bin/activate
        //                 pytest --maxfail=1 --disable-warnings -q
        //             '''
        //         }
        //     }
        // }

        // stage('Setup Frontend') {
        //     steps {
        //         dir("${FRONTEND_DIR}") {
        //             echo 'Installing frontend dependencies...'
        //             sh '''
        //                 npm install
        //             '''
        //         }
        //     }
        // }

        // stage('Run Frontend Tests') {
        //     steps {
        //         dir("${FRONTEND_DIR}") {
        //             echo 'Running frontend tests...'
        //             sh '''
        //                 npm test
        //             '''
        //         }
        //     }
        // }

        stage('Start Applications') {
            parallel {
                stage('Run Backend Server') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            echo 'Launching backend server...'
                            sh '''
                                source venv/bin/activate
                                nohup python3 app.py > backend.log 2>&1 &
                            '''
                        }
                    }
                }

                stage('Run Frontend Server') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            echo 'Launching frontend server...'
                            sh '''
                                nohup npm run dev > frontend.log 2>&1 &
                            '''
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Stopping background processes and cleaning up...'
            sh '''
                pkill -f "python3 app.py" || true
                pkill -f "vite" || true
                sudo service mysql stop || true
            '''
        }
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed.'
        }
    }
}
