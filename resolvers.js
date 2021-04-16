const _ = require('lodash');

module.exports = {
  Query: {
    sites: (parent, args, { dataSources }, info) => {
      return dataSources.sitesAPI.getSites(args);
    },
    devices: (parent, args, { dataSources }, info) => {
      return dataSources.devicesAPI.getDevices(args);
    },
    points: (parent, args, { dataSources }, info) => {
      return dataSources.pointsAPI.getPoints(args);
    },
    pointhistory:(parent, args, { dataSources }, info) => {
      return dataSources.pointHistoryAPI.getPointHistory(args);
    },
    pointhistoryById: (parent, args, { dataSources }, info) => {
      const pointHistoryContent= dataSources.pointHistoryAPI.getPointHistoryById(parent.id);
      return pointHistoryContent;
    }
  },
  Point: {
    async pointHistory(point, args, { dataSources }) {
      const pointHistoryContent= await dataSources.pointHistoryLoader.loader.load({id:point.id,args});
      return pointHistoryContent;
      //return _.filter(pointHistoryContent, args);
    }
  },
 Device: {
    points(device, args, { dataSources}) {
      const pointContent= dataSources.pointLoader.loader.load({id:device.id,args});
      return pointContent;
    }
  },
  Site: {
    points(site, args, { dataSources}) {
      const pointContent= dataSources.pointsAPI.getPointsBySiteId({id:site.id,args});
      return pointContent
    },
    devices(site, args, { dataSources}) {
      const devicesContent=  dataSources.deviceLoader.loader.load({id:site.id,args});
      return devicesContent;
    }
  }
};
