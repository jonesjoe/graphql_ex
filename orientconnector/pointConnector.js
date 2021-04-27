const pool = require('./orientPool');

class PointOrientConnector {

  constructor() {
  }
  async getPoints(args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const limit=args['first']?'limit '+args['first']:'';
    const sites = await session.query('SELECT from Point '+limit).all();
    session.close();
    return sites;
  }

  async getPointsByDeviceId(keys, args, context) {
    const limit=args['first']?'limit '+args['first']:'';
    const poolValue=await pool();
    const session = await poolValue.acquire();
      const idStrings = keys.map(id => "'" + id + "'");
    console.log(new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}))
    const points=await session.query('SELECT from point where deviceId in [' + idStrings.join(',') + '] ', { pageSize: 15000}).all();
    console.log('retrieved ' + points.length)
    console.log(new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}))
    session.close();
    return points;
  }
}
module.exports = PointOrientConnector;

