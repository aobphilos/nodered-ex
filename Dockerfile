# Start building with Node-RED (1.0.3-10-amd64)
FROM nodered/node-red:1.0.3-10-amd64 AS base

# Install required modules
RUN npm install \
          --no-package-lock --no-audit \
          dotenv \
          node-red-dashboard \
          node-red-contrib-ngrok \
          node-red-contrib-sendgrid \
          node-red-contrib-ip
        #   node-red-contrib-miio-airpurifier \

WORKDIR /usr/src/node-red

COPY src/contrib/ngrok/* ./node_modules/node-red-contrib-ngrok/
COPY src/contrib/sendgrid/* ./node_modules/node-red-contrib-sendgrid/
COPY src/flow/flows.json ./
