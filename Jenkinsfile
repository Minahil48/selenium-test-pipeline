pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'markhobson/maven-chrome'
    }

    stages {
        stage('Clone Repo') {
            steps {
                echo 'Code is already cloned by Jenkins SCM'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                script {
                    docker.image("${DOCKER_IMAGE}").inside {
                        sh 'mvn test'
                    }
                }
            }
        }
    }

    post {
        success {
            mail to: 'minahilashfaq48@gmail.com',
                 subject: "Build Success - Selenium Tests Passed",
                 body: "All test cases passed successfully."
        }

        failure {
            mail to: 'minahilashfaq48@gmail.com',
                 subject: "Build Failed - Test Errors",
                 body: "Some test cases failed. Please check Jenkins logs."
        }
    }
}
