const pool = require('./orientPool');

class PointHistoryOrientConnector {

  constructor() {
  }
  async getPointHistory() {
    const poolValue=await pool();
    const session = await poolValue.acquire();
      const sites = await session.query('SELECT from Point_History').all();
    session.close();
    return sites;
  }


  async getPointHistoryByPoints(keys) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const idStrings = keys.map(id => "'" + id + "'");
    console.log(new Date());
    console.log('SELECT from Point_History ' + keys.length)
    const pointhistories = await session.query('SELECT from Point_History where id in [' + idStrings.join(',') + '] limit 100').all();
    session.close();
    console.log('retrieved ' + pointhistories.length)
    console.log(new Date());
    return pointhistories;
  }
}


module.exports = PointHistoryOrientConnector;

