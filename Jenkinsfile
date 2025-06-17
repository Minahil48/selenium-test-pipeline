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

    stage('Install Chrome & ChromeDriver') {
      steps {
        echo 'Installing Chrome and ChromeDriver...'
        sh '''
          sudo apt update
          sudo apt install -y wget unzip xvfb libxi6 libgconf-2-4
          
          # Install Google Chrome
          wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
          sudo apt install -y ./google-chrome-stable_current_amd64.deb

          # Install ChromeDriver matching Chrome version
          CHROME_VERSION=$(google-chrome --version | grep -oP '\\d+\\.\\d+\\.\\d+' | head -1)
          DRIVER_VERSION=$(wget -qO- https://chromedriver.storage.googleapis.com/LATEST_RELEASE_$CHROME_VERSION)
          wget https://chromedriver.storage.googleapis.com/${DRIVER_VERSION}/chromedriver_linux64.zip
          unzip chromedriver_linux64.zip
          sudo mv chromedriver /usr/local/bin/
          sudo chmod +x /usr/local/bin/chromedriver
        '''
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
