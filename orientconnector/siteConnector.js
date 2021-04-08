var OrientJs = require('orientjs');

class SiteOrientConnector  {

    constructor() {
 }
    async getSites () {
        const client = await OrientJs.OrientDBClient.connect({
            host: "rapidquerydevdb.rycom.com",
            port: 2424
          })
        const session=await client.session({ name: "rycom", username: "root", password: "fireflies" })
        const sites = await session.query('SELECT from Site').all();
        return sites;
    } 
  }
  module.exports = SiteOrientConnector;

