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

    stage('Test with Selenium') {
      steps {
        echo 'Running Selenium tests...'
        sh 'npx mocha selenium-tests/test_login.mjs --timeout 30000'
      }
    }
  }
}
