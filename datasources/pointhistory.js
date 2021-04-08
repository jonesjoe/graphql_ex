const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const PointHistoryOrientConnector = require('../orientconnector/pointHistoryConnector');

class PointHistoryAPI extends DataSource {
  constructor() {
    super();
    this.pointHistoryConnector=new PointHistoryOrientConnector();
  }

  initialize(config) {}

 async getPointHistory(args) {
      const pointhistory=await this.pointHistoryConnector.getPointHistory();
    return _.filter(pointhistory, args);
  }

  async getPointHistoryById(id) {
    const pointhistory=await this.pointHistoryConnector.getPointHistory();
    const pointHistoryContent = _.filter(pointhistory, { id: id});
    return pointHistoryContent;
  } 
}

module.exports = PointHistoryAPI;
