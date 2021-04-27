const { RESTDataSource } = require('apollo-datasource-rest');

class WeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.initialize({});

  }

  async getWeatherBySite(site) {
    console.log(this);
    const lat=site.latitude;
    const long=site.longitude;
    const key="d152666fd15beeb67e9eec1cb3d5371c";
    const response = await this.get(`/weather?lat=${lat}&lon=${long}&appid=${key}`);
    const weatherContent={
    "timestamp": response.dt,
 "location": response.name,
 "condition": response.weather[0].id,
 "description": response.weather[0].description,
 "temperature": response.main.temp,
 "pressure": response.main.pressure,
 "humidity": response.main.humidity,
 "wind_speed": response.wind.speed,
 "wind_direction": response.wind.deg,
 "cloud_cover": response.clouds.all};
 console.log(weatherContent)
    return weatherContent;
  }

  async getSpeakerByTimeStamp() {
    const data = await this.get('/');
    return data;
  }
}

module.exports = WeatherAPI;
