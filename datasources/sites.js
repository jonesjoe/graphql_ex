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
    const siteValues=await this.siteConnector.getSites(args);
    return siteValues;
  }

  async getAllSites(args) {
    const siteValues=await this.siteConnector.getSites(args);
    return siteValues;
  }

  getSitesById(args) {
    _.filter(sites, { id: parseInt(id) });
    return Sites[0];
  }
}

module.exports = SitesAPI;
