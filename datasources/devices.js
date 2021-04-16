const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const DeviceOrientConnector = require('../orientconnector/deviceConnector');
const DataLoader = require('dataloader');
const deviceLoader = require('../dataloader/deviceLoader');


class DevicesAPI extends DataSource {
  constructor() {
    super();
    this.deviceConnector=new DeviceOrientConnector();
  }

  initialize(config) {}

  async getDevices(args) {
      const deviceValues=await this.deviceConnector.getDevices(args);
    //  console.log(deviceValues)
    return _.filter(deviceValues, args);
  }

 
 
}

module.exports = DevicesAPI;
