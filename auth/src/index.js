const express = require('express');
const axios = require('axios');
const { port, host, db, apiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');
const app = express();


const startServer = () => {
    app.listen(port, () => {
        console.log(`Started auth service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our database ${db}`);
    })
};

app.get('/test', (req, res) => {
    res.send('Our auth server is working correctly');
});

app.get('/testwithapidata', (req, res) => {
    axios.get(apiUrl + '/testapidata').then(response => {
        res.json({
            testapidata: response.data.testwithapi
        });
    });
});

app.get("/api/currentUser", (req, res) => {
    res.json({
        id: "1234",
        email: "foo@gmail.com"
    });
});

connectDb()
    .on('error', console.error.bind(console, 'connection error:'))
    .on('disconnected', connectDb)
    .once('open', startServer);