const express = require('express')
const bodyParser = require('body-parser')
const {ObjectId} = require('mongodb')

const mongoose = require('mongoose')
const url = 'mongodb://admin:admin1@ds139614.mlab.com:39614/zuckerino'
mongoose.connect(url)
let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDb connection error:'))
let linksModel = require('./links.js')

express()
    .use(bodyParser.urlencoded({
        extended: false
    }))
    .use(bodyParser.json())
    .use(express.static(__dirname + '/views/'))
    .set('view engine', 'hjs')
    .get('/', (req, res) => {
        res.render('index')
    })
    .get('/:id', (req, res) => {
        let id = req.params.id
        linksModel.findOne({'_id': ObjectId(id)}, (err, link) => {
            res.render('link', {
                link: link.link
            })
        })
    })
    .post('/addLink', (req, res) => {
        let link = req.body.link
        linksModel.create({'link': link}, (err, newLink) => {
            res.render('copy', {
                link: 'http://localhost:3000/' + newLink._id
            })
        })
    })


    .listen(3000)

