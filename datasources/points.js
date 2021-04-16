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
    const points=await this.pointConnector.getPoints(args);
    return points;
    //return _.filter(points, args);
  }

  
 
}

module.exports = PointAPI;
