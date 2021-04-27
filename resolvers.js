const _ = require('lodash');

module.exports = {
  Query: {
    sites: (parent, args, context, info) => {
      console.log(context.kauth.isAuthenticated())
      return context.sitesAPI.getSites(args);
    },
    devices: (parent, args, context, info) => {
      return context.devicesAPI.getDevices(args);
    },
    points: (parent, args, context, info) => {
      return context.pointsAPI.getPoints(args);
    },
    pointhistory:(parent, args, context, info) => {
      return context.pointHistoryAPI.getPointHistory(args);
    },
    pointhistoryById: (parent, args, context, info) => {
      const pointHistoryContent= context.pointHistoryAPI.getPointHistoryById(parent.id);
      return pointHistoryContent;
    }
  },
  Point: {
    async pointHistory(point, args, context) {
      const pointHistoryContent= await context.pointHistoryLoader.loader.load({id:point.id,args});
      return pointHistoryContent;
      //return _.filter(pointHistoryContent, args);
    }
  },
 Device: {
    points(device, args, context) {
      const pointContent= context.pointLoader.loader.load({id:device.id,args});
      return pointContent;
    }
  },
  Site: {
    points(site, args, context) {
      const pointContent= context.pointsAPI.getPointsBySiteId({id:site.id,args});
      return pointContent
    },
    devices(site, args, context) {
      const devicesContent=  context.deviceLoader.loader.load({id:site.id,args});
      return devicesContent;
    },
    weatherBySite(site, args, context) {
      const wearherContent= context.weatherAPI.getWeatherBySite(site);
      return wearherContent
    },

  }
};
