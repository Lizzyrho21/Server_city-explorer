

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const weather = require('./data/weather.json');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;



// per instruction, we create an class that will find the properties we need ahead of time.
// function Forecast(day) {
//   this.date = day.valid_date
//   this.description = day.weather.description
// }
// app.use('*', (request, response) => response.status(404).send('page not found'));

const handleWeather = async (request, response) => {
  // we set the name and ask for the wuery requested
  let {lat} = request.query;
  let {lon} =  request.query;

 

  

  // find the city depending on what we searched for in our query
  // const city = weather.find(city => city.city_name.toLowerCase() === search.toLowerCase());
  //  lat
  // lon
  // 35.7796
  // -78.6382
  try{
    // Look through the data of json given, and pull out what we need to put into our object
      // const weatherArray = city.data.map(day => new Forecast(day));
      const weatherArray = await axios.get(`http://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&include=minutely`);
      // console.log(weatherArray.data);
      response.status(200).send(weatherArray.data);
    } catch(error) {
      console.error(error);
      errorHandler(error, response);
    }

  }

  app.get('/weather', handleWeather);



function errorHandler(error, response) {
  console.log(error);
  response.status(500).send('something went wrong');
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));