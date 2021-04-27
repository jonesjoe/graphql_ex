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

  async getPointHistoryValues() {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    console.log(new Date());
      const points = await session.query('SELECT from Point_History ').all();
      console.log(new Date());
      session.close();
    return points;
  }



  async getPointHistoryByPoints(keys, args) {
    const poolValue=await pool();
    const session = await poolValue.acquire();
    const idStrings = keys.map(id => "'" + id + "'");
    const limit=args['first']?'limit '+args['first']:'';
    console.log(new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}))
   // console.log('SELECT from Point_History where id in [' + idStrings.join(',') + '] '+limit)
    const pointhistories = await session.query('SELECT from Point_History where id in [' + idStrings.join(',') + '] ', { pageSize: 15000}).all();
    session.select().from("Point")
  
    session.close();
    console.log('retrieved ' + pointhistories.length)
    console.log(new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'}))
    return pointhistories;
  }
}


module.exports = PointHistoryOrientConnector;

