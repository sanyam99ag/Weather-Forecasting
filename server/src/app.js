const path = require('path')
const express = require('express')
const hbs  = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

var myParser = require("body-parser");

// define path for express config
const app = express()
const pdp = path.join(__dirname, '../assets')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const request = require('request')

// const address = req.query.address

// setup handerbars engine
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(pdp))

app.get('', (req, res) =>{
        res.render('index', {
            title: 'Weather',
            name: 'sanyam agarwal'
        })
})



app.get('/help', (req, res) =>{
    res.render('help', {
        want: 'HELP',
        title: 'Help',
        name: 'sanyam agarwal'
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        name: 'Sanyam',
        age: 20, 
        title: 'about'
    })
})     

// app.get('/product', (req, res) =>{
//     console.log(req.query);
//     if(!req.query.search){
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     res.send({
//         products: []
//     })
// })

app.get('/weather', (req, res)=>{

    if(!req.query.address){
        return res.send({
            error: 'Please enter address to find weather'
        })
    }

    

    geocode(req.query.address, (error, {latitude, longitude, Place} = {}) => {
        if(error) {
            return res.send({ error })  
        }
    
        forecast(latitude, longitude, (error, fcdata) => {
            if(error ){
                return res.send({ error })
            }
            
            res.send({
                location: Place,
                forecast: fcdata,
                address: req.query.address
            })
            
        })
    })
})

app.get('*', (req, res) => {
    res.send('My 404 Page ;p')
})
// app.use(myParser.urlencoded({extended : true}));
// app.post('/bose', (req, res)=>{
//     console.log(req.body);
//     console.log("req.body");
    
// });

app.listen(3000, () =>{
    console.log('Server is on port no. 3000')
})