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
    pointHistory(point, args, { dataSources }) {
      const pointHistoryContent= dataSources.pointHistoryLoader.loader.load(point.id);
     return pointHistoryContent;
    }
  },

  Device: {
    points(device, args, { dataSources}) {
      const pointContent= dataSources.pointLoader.loader.load(device.id);
      return pointContent;
    }
  },
  Site: {
    points(site, args, { dataSources}) {
      const pointContent= dataSources.pointsAPI.getPointsBySiteId(site.id);
      return _.filter(pointContent, args);
    },
    devices(site, args, { dataSources}) {
      const devicesContent=  dataSources.deviceLoader.loader.load(site.id);
      return devicesContent;
    }
  }
};
