/**
 * ==============================================================
 * Token: 5148b7d1d0a0ea0983ee33f10e38cee9
 *
 * ==============================================================
 * Connected to MiioDevice {
 *  model         = zhimi.airmonitor.v1,
 *  types         = miio:air-monitor, sensor, miio, air-monitor,
 *  capabilities  = charging-state, battery-level, pm2.5,
 *                  restorable-state, power, state,
 *                  switchable-power
 * }
 *
 * ==============================================================
 */
const crypto = require('crypto');
const miio = require('miio');

const handleErrorHere = err => {
  console.error(err);
};
const handler = ({ action }, device) =>
  console.log('Action', action, 'performed on', device);
try {
  // Resolve a device, resolving the token automatically or from storage
  miio
    .device({
      address: '192.168.13.1'
      // address: '192.168.1.100',
      // token: '4817d547ac9a7d80066395ee7b3cab6e'
    })
    .then(device => {
      console.log('Connected to', device);
    })
    .catch(err => handleErrorHere);

  const devices = miio.devices({
    cacheTime: 300 // 5 minutes. Default is 1800 seconds (30 minutes)
  });

  devices.on('available', async ({ device }) => {
    const token = device.management.token;
    console.log(`token: `, token);
    device.management
      .updateWireless({
        ssid: 'MOSHI_PARK_WIFI',
        passwd: 'rfedwsqa'
      })
      .then(info => {
        console.log('after wireless changed: ', info);
        return device.management.updateToken(token);
      })
      .catch(console.error);

    if (device.matches('cap:pm2.5')) {
      console.log(await device.pm2_5());
      device.on('pm2.5Changed', (score, ctx) => {
        console.log('pm2.5 changed: ', score);
      });
    }

    // // Can use it
    // if(device.matches('cap:switchable-power')) {
    //   device.setPower(false)
    //     .then(console.log)
    //     .catch(console.error);
    // }
  });

  devices.on('unavailable', device => {
    // Device is no longer available and is destroyed
    console.log('unavailable');
  });
} catch (error) {
  console.error(error);
}
