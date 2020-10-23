const path = require('path');
const cors = require('cors');
require('newrelic');
const {addReview, getItems, getStore, isHelpful, isOffensiveReview, getPhotos} = require('./postgresql/psql.js');
const {addReview2, getItems2, getStore2, isHelpful2, isOffensiveReview2, getPhotos2} = require('./postgresql/psql2.js');


const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/listing/:storeId/:itemId', express.static(path.join(__dirname, '../client/dist')));
app.use(/*'FILL_ME_IN'*/, express.static(path.join(__dirname, '../loader.io.txt')));

app.post('/api/create-review/:storeId/:itemId', (req, res) => {
  const api = req.params;
  return addReview(req.body, api.storeId, api.itemId)
    .then((confirmation) => {
      res.send('created');
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });
});

app.get('/api-photos/:store/:item', (req, res) => {
  const api = req.params;
  if (api.store < 50000) {
    return getPhotos(api.store, api.item)
      .then((photos) => {
        res.send(photos.rows);
      })
      .catch((err) => {
        res.header(500).send(err);
      });
  } else {
    return getPhotos2(api.store, api.item)
      .then((photos) => {
        res.send(photos.rows);
      })
      .catch((err) => {
        res.header(500).send(err);
      });
  };
});

app.get('/api-store/:store/:sort', (req, res) => {
  const api = req.params;

  if (api.store < 50000) {
    return getStore(api.store, api.sort)
      .then((storeData) => {
        res.send(storeData.rows);
      })
      .catch((err) => {
        res.header(500).send(confirmation)
      });
  } else {
    return getStore2(api.store, api.sort)
    .then((storeData) => {
      res.send(storeData.rows);
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });
  }
});

app.get('/api-items/:store/:item/:sort', (req, res) => {
  const api = req.params;
  if (api.store < 50000) {
    return getItems(api.store, api.item, api.sort)
      .then((itemData) => {
        res.send(itemData.rows);
      })
      .catch((err) => {
        res.header(500).send(confirmation)
      });
  } else {
    return getItems2(api.store, api.item, api.sort)
      .then((itemData) => {
        res.send(itemData.rows);
      })
      .catch((err) => {
        res.header(500).send(confirmation)
      });
  }
});



app.patch('/api-helpful/store:/:id', (req, res) => {
  const api = req.params;
  if (api.store < 50000) {
    return isHelpful(api.id)
      .then((confirmation) => {
        res.send('updated');
      })
      .catch((err) => {
        res.header(500).send(confirmation)
      });
  } else {
    return isHelpful2(api.id)
    .then((confirmation) => {
      res.send('updated');
    })
    .catch((err) => {
      res.header(500).send(confirmation)
    });

  }
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
