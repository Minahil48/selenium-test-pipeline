# Use Node.js as base image
FROM node:18-slim

# Install Chrome
RUN apt-get update && apt-get install -y wget gnupg unzip curl \
  && wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" \
     > /etc/apt/sources.list.d/google-chrome.list \
  && apt-get update && apt-get install -y google-chrome-stable \
  && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy test project files
COPY . .

# Install Node.js dependencies
RUN npm install

# Run tests
CMD ["npx", "mocha", "test_login.mjs", "--timeout", "30000"]
