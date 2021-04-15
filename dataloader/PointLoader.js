const DataLoader = require('dataloader');
const PointOrientConnector = require('../orientconnector/pointConnector');
const { DataSource } = require('apollo-datasource');

class PointLoader extends DataSource {
    constructor() {
        super();
        this.pointConnector = new PointOrientConnector();
        this.loader = new DataLoader(async (keys) => {
            const points = await this.pointConnector.getPointsByDeviceId(keys);
            const grouping = {};
            points.forEach(point => {
                grouping[point.deviceId] = grouping[point.deviceId] ? [...grouping[point.deviceId], point] : [point]
            });
             console.log("PointLoader:"+keys.map(key => grouping[key]).length)
            return keys.map(key => grouping[key]);
        });
    }
}

module.exports = PointLoader;

