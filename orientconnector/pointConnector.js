var OrientJs = require('orientjs');

class PointOrientConnector  {

    constructor() {
 }
    async getPoints() {
        const client = await OrientJs.OrientDBClient.connect({
            host: "rapidquerydevdb.rycom.com",
            port: 2424
          })
        const session=await client.session({ name: "rycom", username: "root", password: "fireflies" })
        const sites = await session.query('SELECT from Point').all();
        return sites;
    } 
  }
  module.exports = PointOrientConnector;

