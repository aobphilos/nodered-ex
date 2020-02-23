const ng = require('ngrok');
require('dotenv').config();

module.exports = function(RED) {
  const loadConfigFromEnv = () => {
    let options = {
      proto: process.env.NGROK_PROTO || this.proto,
      addr: process.env.NGROK_PORT || this.port,
      subdomain: process.env.NGROK_SUB_DOMAIN || this.subdomain,
      authtoken: process.env.NGROK_TOKEN || this.authtoken,
      region: process.env.NGROK_REGION || this.region
    };

    const _auth = process.env.NGROK_AUTH || this.auth;
    if (_auth) {
      const auth = _auth.split(':');

      if (auth && auth.length === 2) {
        options.auth = _auth;
      }
    }

    return options;
  };

  function ngrok(config) {
    RED.nodes.createNode(this, config);
    var node = this;
    this.creds = RED.nodes.getNode(config.creds);
    this.subdomain = config.subdomain;
    this.region = config.region;
    this.auth = config.auth;
    this.proto = config.proto;
    if (RED.nodes.getNode(config.creds) == null) {
      this.authtoken = '';
    } else {
      this.authtoken = RED.nodes.getNode(config.creds).credentials.authtoken;
    }
    if (config.port == '') {
      this.port = RED.settings.uiPort;
    } else {
      this.port = config.port;
    }
    node.on('input', function(msg) {
      let options = loadConfigFromEnv();

      clean(options);
      if (msg.payload == 'on') {
        (async function() {
          try {
            console.log('ngrok-options - ', options);
            const url = await ng.connect(options);
            msg.payload = url;
            node.send(msg);
            node.status({ fill: 'green', shape: 'dot', text: url });
          } catch (err) {
            node.error('ngrok error: ', err);
            console.log(`Connect error: ${err.message}`);
          }
        })();
      } else if (msg.payload == 'off') {
        (async function() {
          await ng.kill();
          msg.payload = null;
          node.send(msg);
          node.status({ fill: 'red', shape: 'ring', text: 'disconnected' });
        })();
      }
    });
  }
  function ngrokauth(n) {
    RED.nodes.createNode(this, n);
    this.authtoken = n.authtoken;
  }

  RED.nodes.registerType('ngrok', ngrok);
  RED.nodes.registerType('ngrokauth', ngrokauth, {
    credentials: {
      authtoken: { type: 'text' }
    }
  });
};

function clean(obj) {
  for (var propName in obj) {
    if (
      obj[propName] === null ||
      obj[propName] === undefined ||
      obj[propName] === ''
    ) {
      delete obj[propName];
    }
  }
}
