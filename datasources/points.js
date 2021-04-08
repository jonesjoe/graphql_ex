const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const PointOrientConnector = require('../orientconnector/pointConnector');


class PointAPI extends DataSource {
  constructor() {
    super();
    this.pointConnector=new PointOrientConnector();
  }

  initialize(config) {}

  async getPoints(args) {
    const points=await this.pointConnector.getPoints();
    return _.filter(points, args);
  }

  async getPointsByDeviceId(deviceId) {
    const points=await this.pointConnector.getPoints();
    const pointHistoryContent = _.filter(points, { deviceId: deviceId});
    return pointHistoryContent;
  }

  async getPointsBySiteId(siteId) {
    const points=await this.pointConnector.getPoints();
    const pointHistoryContent = _.filter(points, { siteId: siteId});
    return pointHistoryContent;
  }
 
}

module.exports = PointAPI;
