# Start building with Node-RED (1.3.5-10)
FROM nodered/node-red:1.3.5-10 AS base

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY package.json .

# Install required modules
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.

COPY src/contrib/ngrok/* ./node_modules/node-red-contrib-ngrok/
COPY src/contrib/sendgrid/* ./node_modules/node-red-contrib-sendgrid/

# COPY src/flow/flows_cred.json ./data/flows_cred.json
# COPY src/settings.js ./data/settings.js
COPY src/flow/flows.json ./data/flows_custom.json

# WORKDIR /usr/src/node-red
