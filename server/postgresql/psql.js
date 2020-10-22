const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const { psql } = require('../../db.config.js');

const { Client } = require('pg');
const client = new Client(psql.config);
client.connect(() => {console.log(psql.testHeader)});

const addReview = (review) => {
  const start = StopWatch.start('milliseconds');
  return client.query(psql.insert)
  .then((newReview) => {
    StopWatch.end(start, 'addReview')();
    return newReview;
  })
  .catch((err) => {
    console.error(err);
  });
};

const getItems = (storeId, itemId, order = 'createdAt') => {
  const start = StopWatch.start('milliseconds');
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId} ORDER BY ${order} DESC;`;
  return client.query(query)
  .then((itemReviews) => {
    StopWatch.end(start, 'getItems')();
    return itemReviews;
  })
  .catch((err) => {
    console.error(err);
  });
};

const getStore = (storeId, order = 'createdAt') => {
  const start = StopWatch.start('milliseconds');
  return client.query(`SELECT * FROM reviews WHERE storeId = ${storeId} ORDER BY ${order} DESC LIMIT 300;`)
  .then((store) => {
    StopWatch.end(start, 'getStore')();
    return store;
  })
  .catch((err) => {
    console.error(err);
  });
};

const isHelpful = (storeId, id) => {
  const start = StopWatch.start('milliseconds');
  return client.query(`UPDATE reviews SET helpful = helpful + 1 WHERE storeId = ${storeId} AND id = ${id} RETURNING helpful;`)
  .then((updated) => {
    StopWatch.end(start, 'isHelpful')();
    return updated;
  })
  .catch((err) => {
    console.error(err);
  });
};

const isOffensiveReview = (storeId, id) => {
  const start = StopWatch.start('milliseconds');
  return client.query(`DELETE FROM reviews WHERE storeId = ${storeId} AND id = ${id}`)
  .then((deleted) => {
    StopWatch.end(start, 'isOffensiveReview')();
  })
  .catch((err) => {
    console.error(err);
  });
};

const wipeTable = (tableName) => {
  const start = StopWatch.start('seconds');
  return client.query(`DELETE FROM ${tableName};`)
  .then((confirmation) => {
    StopWatch.end(start, 'Wipe Table')();
  })
  .catch((err) => {
    console.error(err);
  });
};

(async function stressIt(tableIsDirty) {
  const newReview = await addReview();
  const newStoreId = newReview.rows[0]['storeid'];
  const newId = newReview.rows[0]['id'];
  const results = await getItems(20, 10, 'helpful');
  const storeId = results.rows[0]['storeid'];
  await getStore(storeId);
  await isHelpful(newStoreId, newId);
  await isOffensiveReview(newStoreId, newId);
  if (tableIsDirty) {
    wipeTable('reviews');
  };
})();

module.exports = {
  addReview,
  getItems,
  getStore,
  isHelpful,
  isOffensiveReview
};
