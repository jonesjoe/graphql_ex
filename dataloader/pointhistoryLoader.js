const DataLoader = require('dataloader');
const PointHistoryOrientConnector = require('../orientconnector/pointHistoryConnector');
const { DataSource } = require('apollo-datasource');

class PointHistoryLoader extends DataSource {
    constructor() {
        super();
        this.pointHistoryConnector = new PointHistoryOrientConnector();
        this.loader = new DataLoader(async (keys) => {
            const pointHistories = await this.pointHistoryConnector.getPointHistoryByPoints(keys);
            const grouping = {};
            pointHistories.forEach(pointHistory => {
                grouping[pointHistory.id] = grouping[pointHistory.id] ? [...grouping[pointHistory.id], pointHistory] : [pointHistory]
            });
             console.log("PointHistoryLoader:"+keys.map(key => grouping[key]).length)
            return keys.map(key => grouping[key]);
        });
    }
}

module.exports = PointHistoryLoader;

