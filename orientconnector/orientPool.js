var OrientJs = require('orientjs');

let pool;

 async function createPool(){
     console.log("inside pool")
    if(!pool){
const client = await OrientJs.OrientDBClient.connect({
    host: "144.217.15.247",
    port: 2424
  })
   pool = await client.sessions({
    name: "rycom", 
    username: "root",
     password: "rootpwd",
    pool: { max: 10 }
  });
 }
 return pool;
}

module.exports = createPool