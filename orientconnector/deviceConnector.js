const pool = require('./orientPool');

class DeviceOrientConnector {

  constructor() {
  }

  async getDevices() {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    console.log('SELECT from Device');
    const sites = await session.query('SELECT from Device').all();
    session.close();
    return sites;
  }

  async getDevicesbySiteIds(ids) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const idStrings = ids.map(id => "'" + id + "'");
    console.log('SELECT from Device where siteId in [' + idStrings.join(',') + ']')
    const sites = await session.query('SELECT from Device where siteId in [' + idStrings.join(',') + ']').all();
    session.close();
    return sites;
  }
}
module.exports = DeviceOrientConnector;

