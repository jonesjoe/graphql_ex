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
      const deviceValues=await this.deviceConnector.getDevices();
    //  console.log(deviceValues)
    return _.filter(deviceValues, args);
  }

  async getDevicesBySiteId(siteid) {
    deviceLoader.loader.load(siteid);
    // load ids
    //const deviceValues=await this.deviceConnector.getDevices();
    //const devicesContent = _.filter(deviceValues, { siteId: siteid});
    //return devicesContent;
  } 
 
}

module.exports = DevicesAPI;
