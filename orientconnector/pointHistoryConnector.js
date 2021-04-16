const pool = require('./orientPool');

class PointHistoryOrientConnector {

  constructor() {
  }
  async getPointHistory(args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const limit=args['first']?'limit '+args['first']:'';

      const sites = await session.query('SELECT from Point_History '+limit).all();
    session.close();
    return sites;
  }


  async getPointHistoryByPoints(keys, args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const idStrings = keys.map(id => "'" + id + "'");
    const limit=args['first']?'limit '+args['first']:'';
    console.log(new Date());
    console.log('SELECT from Point_History ' + keys.length)
    const pointhistories = await session.query('SELECT from Point_History where id in [' + idStrings.join(',') + '] '+limit).all();
    session.close();
    console.log('retrieved ' + pointhistories.length)
    console.log(new Date());
    return pointhistories;
  }
}


module.exports = PointHistoryOrientConnector;

