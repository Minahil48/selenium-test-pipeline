pipeline {
  agent any

  stages {
    stage('Clone Repo') {
      steps {
        echo "Repo already cloned by Jenkins"
      }
    }

    stage('Install Dependencies') {
      steps {
        echo 'Installing Node.js packages...'
        sh 'npm install --prefix selenium-tests'
      }
    }

    stage('Run Selenium Tests in Docker') {
      steps {
        echo 'Running tests inside Docker container...'
        dir('selenium-tests') {
          sh '''
            docker build -t selenium-tests-image .
            docker run --rm selenium-tests-image
          '''
        }
      }
    }
  }
}
