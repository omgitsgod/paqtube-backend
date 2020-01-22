require('dotenv').config();
const express = require('express');
const fetch   = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const url = 'https://www.googleapis.com/youtube/v3/search';
const key = process.env.KEY || "Insert your YouTube Data Api Key here";
const channelId = 'UCvO6uJUVJQ6SrATfsWR5_aA';
const part = 'snippet';
const type = 'video';
const maxResults = 30;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  fetch(`${url}?key=${key}&channelId=${channelId}&type=${type}&part=${part}&maxResults=${maxResults}`)
  .then(r => r.json())
  .then(json => {
    res.json(json);
  });
});

app.get('/page/:token', (req, res) => {
  const token = req.params.token
  fetch(`${url}?key=${key}&channelId=${channelId}&type=${type}&part=${part}&maxResults=${maxResults}&pageToken=${token}`)
  .then(r => r.json())
  .then(json => {
    res.json(json);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
