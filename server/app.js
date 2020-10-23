const path = require('path');
const cors = require('cors');
require('newrelic');
const {addReview, getItems, getStore, isHelpful, isOffensiveReview, getPhotos} = require('./postgresql/psql.js');

const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/listing/:storeId/:itemId', express.static(path.join(__dirname, '../client/dist')));
app.use('/loaderio-57b40a668d1dd8a0be4909090725acfe.txt', express.static(path.join(__dirname, '../loader.io.txt')));

app.post('/api/create-review', (req, res) => {
  const api = req.body;
  return addReview()
    .then((confirmation) => {
      res.send('created');
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });
});

app.get('/api-photos/:store/:item', (req, res) => {
  const api = req.params;
  return getPhotos(api.store, api.item)
    .then((photos) => {
      res.send(photos.rows);
    })
    .catch((err) => {
      res.header(500).send(err);
    });
});

app.get('/api-store/:store/:sort', (req, res) => {
  const api = req.params;
  return getStore(api.store, api.sort)
    .then((storeData) => {
      res.send(storeData.rows);
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });
});

app.get('/api-items/:store/:item/:sort', (req, res) => {
  const api = req.params;
  return getItems(api.store, api.item, api.sort)
    .then((itemData) => {
      res.send(itemData.rows);
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });
});


<<<<<<< HEAD
app.put('/api-update/:id', (req, res) => {
=======
app.patch('/api-helpful/:id', (req, res) => {
>>>>>>> c63cc7f32a583a1d8f607e992e683443cc92f90f
  const api = req.params;
  return isHelpful(api.id)
    .then((confirmation) => {
      res.send('updated');
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });
});

app.delete('/api-delete/:store/:id', (req, res) => {
  const api = req.params;
  return isOffensiveReview(api.store, api.id)
    .then((confirmation) => {
      res.send(confirmation);
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    })
});

module.exports = app;
