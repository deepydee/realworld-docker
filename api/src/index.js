const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const { port, host, db, authApiUrl } = require('./configuration');
const { connectDb } = require('./helpers/db');
const app = express();
const postSchema = new mongoose.Schema({
    name: String
});

const Post = mongoose.model('Post', postSchema);

const startServer = () => {
    app.listen(port, () => {
        console.log(`Started api service on port ${port}`);
        console.log(`On host ${host}`);
        console.log(`Our database ${db}`);

        // Post.find(function (err, posts) {
        //     if (err) return console.error(err);
        //     console.log('posts', posts);
        // })

        const silence = new Post({ name: 'Silence' });
        silence.save(function (err, silence) {
            if (err) return console.error(err);
            console.log('savedSilence with volumes', silence);
        });
    })
};

app.get('/test', (req, res) => {
    res.send('Our api server is working correctly');
});

app.get('/api/testapidata', (req, res) => {
    res.json({
        testwithapi: true,
    });
});

app.get('/testwithcurrentuser', (req, res) => {
      axios.get(authApiUrl + '/currentUser').then(response => {
        res.json({
            testwithcurrentuser: true,
            currentUserFromAuth: response.data
        });

      });
      
});

connectDb()
    .on('error', console.error.bind(console, 'connection error:'))
    .on('disconnected', connectDb)
    .once('open', startServer);