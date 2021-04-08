const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    pointhistoryById: [Point_History]
    sites( name: String
      address: String
      city: String
      state: String
      area: String
      ): [Site]
     devices(tags: [String]
      name: String): [Device] 
     points(tags: [String] 
          name: String):[Point] 
    pointhistory(value: String 
                ts: String
                id: String):[Point_History] 
      }
  type Session {
    id: ID!
    title: String!
    description: String
    startsAt: String
    endsAt: String
    room: String
    day: String
    format: String
    track: String
      @deprecated(
        reason: "Too many sessions do not fit into a single track, we will be migrating to a tags based system in the future..."
      )
    level: String
  }
  type Site {
    name: String
    id: ID!
    address: String
    city: String
    state: String
    area: String
    postcode: String
    country: String
    latitude: String
    longitude: String
    points:[Point]
    devices(tags: [String]
      name: String
      siteId: String):[Device]
  }
  type Device {
    tags: [String]
    id: ID!
    name: String
    siteId: String
    points(tags: [String]
      name: String):[Point]
  }
  type Point{
    tags: [String]
    name: String
    deviceId: String
    siteId: String
    id: ID!
    pointHistory(val: String
      ts: String) : [Point_History]
  }
  type Point_History{
    val: String
    ts: String
    id: String
  }`;
