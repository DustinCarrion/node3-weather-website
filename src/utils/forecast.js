const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/6d5692dfa3f4ef74dae1442416ae6c9e/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si';

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const summary = body.daily.data[0].summary;
            const temperature = body.currently.temperature;
            const apparentTemperature = body.currently.apparentTemperature;
            const highTemp = body.daily.data[0].temperatureHigh;
            const lowTemp = body.daily.data[0].temperatureLow;
            const precipProbability = Math.round(body.currently.precipProbability * 10000)/100;
            
            const data = summary + ' It is currently ' + temperature + '°C out, the apparent temperature is ' + apparentTemperature + '°C. The maximum temparature is ' + highTemp + '°C and the minimum is ' + lowTemp + '°C. Additionally, there is a ' + precipProbability + '% chance of rain.';
            
            callback(undefined, data);
        }
    });

}


module.exports = forecast;