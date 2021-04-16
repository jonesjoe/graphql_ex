const pool = require('./orientPool');

class PointOrientConnector {

  constructor() {
  }
  async getPoints(args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const limit=args['first']?'limit '+args['first']:'';
    console.log(limit)
    const sites = await session.query('SELECT from Point '+limit).all();
    session.close();
    return sites;
  }

  async getPointsByDeviceId(keys, args) {
    const limit=args['first']?'limit '+args['first']:'';
    console.log(limit)
    const poolValue=await pool();
    const session = await poolValue.acquire();
      const idStrings = keys.map(id => "'" + id + "'");
    console.log('SELECT from point ' + keys.length)
    console.log(new Date());
    const points = await session.query('SELECT from point where deviceId in [' + idStrings.join(',') + '] '+limit).all();
    console.log('retrieved ' + points.length)
    console.log(new Date());
    session.close();
    return points;
  }
}
module.exports = PointOrientConnector;

