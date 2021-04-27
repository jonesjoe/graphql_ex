const DataLoader = require('dataloader');
const PointOrientConnector = require('../orientconnector/pointConnector');
const { DataSource } = require('apollo-datasource');

class PointLoader extends DataSource {
    constructor() {
        super();
        this.pointConnector = new PointOrientConnector();
        this.loader = new DataLoader(async (obj) => {
            const keys=obj.map(val=>val.id);
            const args=obj[0].args;
            const points = await this.pointConnector.getPointsByDeviceId(keys,args);
            
            const grouping = {};
            points.forEach(point => {
                grouping[point.deviceId] = grouping[point.deviceId] ? [...grouping[point.deviceId], point] : [point]
            });
            return keys.map(key => grouping[key]);
        });
    }
}

module.exports = PointLoader;

