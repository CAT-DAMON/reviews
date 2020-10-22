const path = require('path')
const cors = require('cors')
require('newrelic');
// const postgres = require('./postgresql/psql1.js');
// const {cassandra} = require('./cassandra/cql.js');

const express = require('express')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/listing/:itemId', express.static(path.join(__dirname, '../client/dist')))

app.get('/api-item/:store/:itemId/:sort', (req, res) => {
  // get Item sorted
  res.send('got items from store');
})

app.get('/api-store/:store/:sort', (req, res) => {
  // get Store sorted
  res.send('got the whole store');
});

app.get('/api/photo-reviews/:itemId', (req, res) => {
  // get photos/ reviews for modal
  res.send('got modal reviews');
})

app.post('/api/create-review', (req, res) => {
  // add a review
  res.send('created');
})

app.put('/api/helpful-review', (req, res) => {
  // add 1 to helpful
  res.send('updated')
})

app.delete('/remove/:item/from/:store', (req, res) => {
  // remove from database
  res.send('deleted')
})

module.exports = app;
