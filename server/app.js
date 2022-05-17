const express = require("express");
require('dotenv').config({path: './.env'})
const parse = require('./utils').parse
const save = require('./utils').save

const secret = process.env.SECRET

let app = express()
app.use(express.static('build'));
app.use(express.json());

app.get('/api/read', function (req, res) {

    let response = parse();
    if (!response.success) {
        res.status(500).json(response);
    } else {
        res.json(response);
    }
})

app.post('/api/save', function (req, res) {
    if (secret !== req.body.secret) {
        res.status(403).json({success: false, error: "Wrong secret"});
    } else {
        let response = save(req.body.data);
        if (!response.success) {
            res.status(500).json(response);
        } else {
            res.json(response);
        }
    }


})


app.listen(Number(process.env.SERVER_PORT), function () {
    console.log(`Config editor app listening on port ${process.env.SERVER_PORT}`)
})