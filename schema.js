const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    pointhistoryById: [Point_History]
    sites( name: String
      address: String
      city: String
      state: String
      area: String
      ): [Site] @hasRole(role: "realm:test")
     devices(first: Int
      tags: [String] 
      name: String): [Device]
     points(first: Int
           tags: [String] 
          name: String):[Point] 
    pointhistory(value: String 
                ts: String
                id: String
                timeStampRange: dateRange
                valueRange: stringRange
                timeStampGreaterThan: String
                orderBy:[orderBy]
                ):[Point_History] @hasRole(role: "point:access")
      financialData:[Financial_Report]          
      getSiteFlattenResult( siteName: String
        deviceName: String 
        deviceTags: [String]
        pointName: String):[flattenSiteResult]
      }
  
    input dateRange {
      start: String
      end: String
    }    

    input orderBy{
      orderBy:String
      sort: SortDirection
    }

    input stringRange {
      start: String
      end: String
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
    weatherBySite: Weather
    points:[Point]
    devices(first: Int
      tags: [String]
      name: String
      siteId: String):[Device]
  }
  type Device {
    tags: [String]
    id: ID!
    name: String
    siteId: String
    points(first: Int 
      tags: [String]
      name: String):[Point]
  }
  type Point{
    tags: [String]
    name: String
    deviceId: String
    siteId: String
    id: ID!
    pointHistory(value: String 
      ts: String
      id: String
      timeStampRange: dateRange
      valueRange: stringRange
      timeStampGreaterThan: String
      orderBy:[orderBy]) : [Point_History]
  }
  type Point_History{
    val: String
    ts: String
    id: String
  }
  type Weather {
    timestamp: Int
    location: String
    condition: Int
    description: String
    temperature: Float
    pressure: Float
    humidity: Float
    wind_speed: Float
    wind_direction: Int
    cloud_cover: Float
    rain_volume: Float
    snow_volume: Float
   }
   type Financial_Report {
    property1: String,
    property2: String,
    property3: String
   }
   
   
   type flattenSiteResult{
    siteName: String
    deviceName: String 
    deviceTags: [String]
    pointName: String
    pointTags: [String]
    pointVal:String
    pointTimetamp:String
   }


   

   enum SortDirection {
    ASCENDING
    DESCENDING
}
   `;
