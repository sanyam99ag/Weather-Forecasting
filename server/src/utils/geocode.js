const request = require('request')
const dotenv = require('dotenv').config()

const GEO_KEYY = process.env.GEO_KEYY

const geocode = (address, callback) => {
    
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.'+ GEO_KEYY
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to the location service !!', undefined)
        } else if(body.features.length === 0) {
            callback('The given location is invalid :( ', undefined)
        } else {
            callback(undefined, {
                Place: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode    