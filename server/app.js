const express = require('express')
const cors = require('cors')
const path = require('path')
// const reviews = require('./database/helpers.js')
const postgres = require('./postgresql/postIndex.js');
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/listing/:itemId', express.static(path.join(__dirname, '../client/dist')))

app.post('/api/create-review', (req, res) => {
  res.send('created')
})
app.put('/api/helpful-review', (req, res) => {
  res.send('updated')
})
app.delete('/api/item-reviews', (req, res) => {
  res.send('deleted')
})
module.exports = app
// app.get('/api/item-reviews/:itemId/:sort', (req, res) => {
//   reviews.getItem(req.params.itemId, req.params.sort)
//     .then((reviews) => {
//       console.log('sorted 1')
//       res.status(200).send(reviews);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     })
// })

// app.get('/api/store-reviews/:itemId/:sort', (req, res) => {
//   reviews.getStoreId(req.params.itemId)
//     .then((storeId) => {
//       console.log('sorted 2')
//       return reviews.getStore(storeId, req.params.sort);
//     })
//     .then((reviews) => {
//       res.status(200).send(reviews);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     })
// })

// app.get('/api/photo-reviews/:itemId', (req, res) => {
//   reviews.getStoreId(req.params.itemId)
//     .then((storeId) => {
//       return reviews.getPhoto(req.params.itemId, storeId);
//     })
//     .then((reviews) => {
//       res.status(200).send(reviews);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     })
// })

// app.patch('/api/helpful-review/:reviewId', (req, res) => {
//   reviews.patchHelpful(req.params.reviewId)
//     .then((results) => {
//       console.log('helped')
//       res.status(200).send(results);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     })
// })

