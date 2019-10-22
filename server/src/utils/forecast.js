const request = require('request')
const dotenv = require('dotenv').config()

const WEATHER_KEY = process.env.WEATHER_KEY
const forecast = (latitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/'+ WEATHER_KEYY +'/'+ latitude + ',' + longitude

    request( {url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the Weather Service!!', undefined)
        } else if(body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, {
                // Temperature:  (body.currently.temperature-32) * 5/9,
                // Rain_Possibility: body.currently.precipProbability,
                // Summary: body.daily.data[0].summary
                Summary: body.daily.data[0].summary + '  It is currently ' + (body.currently.temperature-32) * 5/9 + '°C temprature, and '+ body.currently.precipProbability + '% chanses of rain'
            })
        }
    })
}

module.exports = forecast
