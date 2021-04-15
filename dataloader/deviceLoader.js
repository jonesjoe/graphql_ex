const DataLoader = require('dataloader');
const DeviceOrientConnector = require('../orientconnector/deviceConnector');
const { DataSource } = require('apollo-datasource');

class DeviceLoader extends DataSource {
    constructor() {
        super();
        this.loader = new DataLoader(async (keys) => {
            const devices = await this.deviceConnector.getDevicesbySiteIds(keys);
            const grouping = {};
            devices.forEach(device => {
                grouping[device.siteId] = grouping[device.siteId] ? [...grouping[device.siteId], device] : [device]
            });
             console.log(keys.map(key => grouping[key]).length)
            return keys.map(key => grouping[key]);
        });
        this.deviceConnector = new DeviceOrientConnector();
    }
}

module.exports = DeviceLoader;

