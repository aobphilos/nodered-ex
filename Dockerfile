# Start building with Node-RED (1.0.3-10-amd64)
FROM nodered/node-red:1.0.3-10-amd64 AS base

# Install required modules
RUN npm install node-red-contrib-miio-airpurifier node-red-dashboard

WORKDIR /usr/src/node-red

COPY flows.json ./
