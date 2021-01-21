const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
require('dotenv').config()

const app = express()

app.use(express.static("staticfiles"))
app.use(bodyParser.urlencoded({extended:true}))


app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html')
})

app.post("/", function(req,res){
    const state = req.body.state
    const city = req.body.city
    console.log(typeof(state),typeof(city))

    apikey= process.env.API_KEY
    const filterstate="&filters[state]="+state
    const filtercity="&filters[city]="+city
    const filter=filterstate+filtercity
    console.log(filter)
    url = "https://api.data.gov.in/resource/3b01bcb8-0b14-4abf-b6f2-c1bfd384ba69?api-key="+apikey+"&format=json&offset=0"+filter
    console.log(url)
    https.get(url,function(response){
        console.log(response.statusCode)

        response.on("data",function(data){
            const aqidata = JSON.parse(data)
            const obj = aqidata.records.filter(function(row){
                return row.pollutant_id==="PM2.5"
            })
            console.log(obj)
            res.send(obj)
        })

    })

})

app.listen(3000,function(){
    console.log('Server is Running')
})

