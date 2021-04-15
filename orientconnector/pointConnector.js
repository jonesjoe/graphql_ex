const pool = require('./orientPool');

class PointOrientConnector {

  constructor() {
  }
  async getPoints() {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const sites = await session.query('SELECT from Point limit 100').all();
    session.close();
    return sites;
  }

  async getPointsByDeviceId(keys) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
      const idStrings = keys.map(id => "'" + id + "'");
    console.log('SELECT from point ' + keys.length)
    console.log(new Date());
    const points = await session.query('SELECT from point where deviceId in [' + idStrings.join(',') + '] limit 100').all();
    console.log('retrieved ' + points.length)
    console.log(new Date());
    session.close();
    return points;
  }
}
module.exports = PointOrientConnector;

