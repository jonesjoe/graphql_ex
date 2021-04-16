const pool = require('./orientPool');

class DeviceOrientConnector {

  constructor() {
  }

  async getDevices(args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const limit=args['first']?'limit '+args['first']:'';
    console.log(limit)

    console.log('SELECT from Device');
    const sites = await session.query('SELECT from Device '+limit).all();
    session.close();
    return sites;
  }

  async getDevicesbySiteIds(ids, args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const idStrings = ids.map(id => "'" + id + "'");
    const limit=args['first']?'limit '+args['first']:'';
    console.log(limit)

    console.log('SELECT from Device where siteId in [' + idStrings.join(',') + ']')
    const sites = await session.query('SELECT from Device where siteId in [' + idStrings.join(',') + '] '+limit).all();
    session.close();
    return sites;
  }
}
module.exports = DeviceOrientConnector;

