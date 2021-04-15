var OrientJs = require('orientjs');
const pool = require('./orientPool');

class SiteOrientConnector  {

    constructor() {
 }
    async getSites () {
      const poolValue=await pool();
      const session = await poolValue.acquire();
            const sites = await session.query('SELECT from Site').all();
        session.close();
        return sites;
    } 
  }
  module.exports = SiteOrientConnector;

