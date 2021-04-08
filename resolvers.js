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
      const pointHistoryContent= dataSources.pointHistoryAPI.getPointHistoryById(point.id);
      return _.filter(pointHistoryContent, args);
    }
  },

  Device: {
    points(device, args, { dataSources }) {
      const pointContent= dataSources.pointsAPI.getPointsByDeviceId(device.id);
      return _.filter(pointContent, args);
    }
  },
  Site: {
    points(site, args, { dataSources }) {
      const pointContent=  dataSources.pointsAPI.getPointsBySiteId(site.id);
      return _.filter(pointContent, args);
    },
    devices(site, args, { dataSources }) {
      const devicesContent= dataSources.devicesAPI.getDevicesBySiteId(site.id);
      return _.filter(devicesContent, args);

    }
  }


};
