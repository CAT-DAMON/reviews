const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const { psql2 } = require('../../db.config.js');

const { Client } = require('pg');
const client = new Client(psql2.config);
client.connect(() => {/*console.log(psql2.testHeader)*/});

const addReview2 = (review) => {
  const start = StopWatch.start('milliseconds');
  return client.query(psql2.insert)
  .then((newReview) => {
    StopWatch.end(start, 'addReview2')();
    return newReview;
  })
  .catch((err) => {
    console.error(err);
  });
};

const getPhotos2 = (storeId, itemId, order = 'createdAt') => {
  const start = StopWatch.start('milliseconds');
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} LIMIT 20`;
  return client.query(query)
    .then((photos) => {
      StopWatch.end(start, 'getPhotos');
      return photos;
    })
    .catch((err) => {
      console.error(err);
    });
};

const getItems2 = (storeId, itemId, order = 'createdAt') => {
  const start = StopWatch.start('milliseconds');
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId} ORDER BY ${order} DESC;`;
  return client.query(query)
  .then((itemReviews) => {
    StopWatch.end(start, 'getItems2')();
    return itemReviews;
  })
  .catch((err) => {
    console.error(err);
  });
};

const getStore2 = (storeId, order = 'createdAt') => {
  const start = StopWatch.start('milliseconds');
  return client.query(`SELECT * FROM reviews WHERE storeId = ${storeId} ORDER BY ${order} DESC LIMIT 300`)
  .then((store) => {
    StopWatch.end(start, 'getStore2')();
    return store;
  })
  .catch((err) => {
    console.error(err);
  });
};

const isHelpful2 = (id) => {
  const start = StopWatch.start('milliseconds');
  return client.query(`UPDATE reviews SET helpful = helpful + 1 WHERE id = ${id} RETURNING helpful;`)
  .then((updated) => {
    StopWatch.end(start, 'isHelpful2')();
    return updated;
  })
  .catch((err) => {
    console.error(err);
  });
};

const isOffensiveReview2 = (storeId, id) => {
  const start = StopWatch.start('milliseconds');
  return client.query(`DELETE FROM reviews WHERE storeId = ${storeId} AND id = ${id}`)
  .then((deleted) => {
    StopWatch.end(start, 'isOffensiveReview2')();
  })
  .catch((err) => {
    console.error(err);
  });
};

const wipeTable2 = (tableName) => {
  const start = StopWatch.start('seconds');
  return client.query(`DELETE FROM ${tableName};`)
  .then((confirmation) => {
    StopWatch.end(start, 'Wipe Table')();
  })
  .catch((err) => {
    console.error(err);
  });
};

(async function stressIt2(tableIsDirty) {
  const newReview = await addReview2();
  const newStoreId = newReview.rows[0]['storeid'];
  const newId = newReview.rows[0]['id'];
  const results = await getItems2(20, 10, 'helpful');
  const storeId = results.rows[0]['storeid'];
  await getStore2(storeId);
  await isHelpful2(newId);
  await isOffensiveReview2(newStoreId, newId);
  if (tableIsDirty) {
    wipeTable2('reviews');
  };
});

module.exports = {
  addReview2,
  getPhotos2,
  getItems2,
  getStore2,
  isHelpful2,
  isOffensiveReview2
};
