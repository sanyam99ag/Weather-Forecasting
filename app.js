const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const address = process.argv[2]

if(!address) {
    console.log('Please enter the address to check the weather!!')
} else {
    geocode(address, (error, {latitude, longitude, Place}) => {
        if(error) {
            return console.log(error)
        }
    
        forecast(latitude, longitude, (error, fcdata) => {
            if(error ){
                return console.log(error)
            }
    
            console.log(Place)
            console.log(fcdata)
        })
    })
        
}
