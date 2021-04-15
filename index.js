const { ApolloServer, gql } = require('apollo-server');

const SitesAPI = require('./datasources/sites');
const DevicesAPI = require('./datasources/devices');
const PointAPI = require('./datasources/points');
const PointHistoryAPI = require('./datasources/pointhistory');
const DeviceLoader = require('./dataloader/deviceLoader');
const PointLoader = require('./dataloader/PointLoader');
const PointHistoryLoader = require('./dataloader/pointhistoryLoader');


const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const dataSources = () => ({
  sitesAPI: new SitesAPI(),
  devicesAPI: new DevicesAPI(),
  pointsAPI: new PointAPI(),
  pointHistoryAPI: new PointHistoryAPI(),
  deviceLoader: new DeviceLoader(),
  pointLoader: new PointLoader(),
  pointHistoryLoader: new PointHistoryLoader()
  });

console.log(new DeviceLoader())
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
});


 server.listen({ port: process.env.PORT || 4000, hostname:'0.0.0.0' }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
})

