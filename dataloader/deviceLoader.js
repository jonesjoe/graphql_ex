const DataLoader = require('dataloader');
const DeviceOrientConnector = require('../orientconnector/deviceConnector');
const { DataSource } = require('apollo-datasource');

class DeviceLoader extends DataSource {
    constructor() {
        super();
        this.loader = new DataLoader(async (obj) => {
            const keys=obj.map(val=>val.id);
            const args=obj[0].args;
            const devices = await this.deviceConnector.getDevicesbySiteIds(keys,args);
            const grouping = {};
            devices.forEach(device => {
                grouping[device.siteId] = grouping[device.siteId] ? [...grouping[device.siteId], device] : [device]
            });
            return keys.map(key => grouping[key]);
        });
        this.deviceConnector = new DeviceOrientConnector();
    }
}

module.exports = DeviceLoader;

