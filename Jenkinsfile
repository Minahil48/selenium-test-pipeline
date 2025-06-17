 pipeline {
  agent any

  stages {
    stage('Clone Repo') {
      steps {
        echo "Repo already cloned by Jenkins"
      }
    }

    stage('Test with Selenium') {
      agent {
        dockerfile {
          filename 'Dockerfile'
          dir 'selenium-tests'
        }
      }
      steps {
        echo 'Running Selenium tests...'
        sh 'npx mocha test_login.mjs --timeout 30000'
      }
    }
  }
}
