const { ApolloServer, gql } = require('apollo-server');

const SitesAPI = require('./datasources/sites');
const DevicesAPI = require('./datasources/devices');
const PointAPI = require('./datasources/points');
const PointHistoryAPI = require('./datasources/pointhistory');


const typeDefs = require('./schema.js');
const resolvers = require('./resolvers.js');

const dataSources = () => ({
  sitesAPI: new SitesAPI(),
  devicesAPI: new DevicesAPI(),
  pointsAPI: new PointAPI(),
  pointHistoryAPI: new PointHistoryAPI()
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
});

server.listen({ port: process.env.PORT || 4000, hostname:'0.0.0.0' }).then(({ url }) => {
  console.log(`graphQL running at ${url}`);
});


