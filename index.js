const { ApolloServer, gql } = require('apollo-server-express');

const SitesAPI = require('./datasources/sites');
const DevicesAPI = require('./datasources/devices');
const PointAPI = require('./datasources/points');
const PointHistoryAPI = require('./datasources/pointhistory');
const DeviceLoader = require('./dataloader/deviceLoader');
const PointLoader = require('./dataloader/PointLoader');
const PointHistoryLoader = require('./dataloader/pointhistoryLoader');

const express = require('express');
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

const app = express();
server.applyMiddleware({ app });

app.get('/sites', async (req, res) => {
  const sites=await new SitesAPI().getAllSites();
  res.send(sites);
})

app.get('/device', async (req, res) => {
  const devices=await new DevicesAPI().getDevices();
  res.send(devices);
})

app.get('/point', async (req, res) => {
  const points=await new PointAPI().getPoints();
  res.send(points);
  } )

app.get('/pointhistory', async (req, res) => {
  const pointHistories=await new PointHistoryAPI().getPointHistory();
  res.send(pointHistories);
  })

 app.listen({ port: process.env.PORT || 4000, hostname:'0.0.0.0' }, ()  => {
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}).setTimeout(1000*60*10)



