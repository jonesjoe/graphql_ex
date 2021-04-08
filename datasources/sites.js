const sites = require('../data/sites.json');
const SiteOrientConnector = require('../orientconnector/siteConnector');

const { DataSource } = require('apollo-datasource');
const _ = require('lodash');

class SitesAPI extends DataSource {
  constructor() {
    super();
    this.siteConnector=new SiteOrientConnector();
  }

  initialize(config) {}

  async getSites(args) {
    const siteValues=await this.siteConnector.getSites();
    return _.filter(siteValues, args);
  }

  getSitesById(id) {
    _.filter(sites, { id: parseInt(id) });
    return Sites[0];
  }
}

module.exports = SitesAPI;
