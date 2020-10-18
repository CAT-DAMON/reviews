const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const { psql } = require('../../db.config.js');
console.log(psql.testHeader);

const { Client } = require('pg');
const client = new Client(psql.config);
client.connect();

const addReview = (review) => {
  var start = StopWatch.start('milliseconds');
  return client.query(psql.insert)
    .then((newReview) => {
      let stop = StopWatch.end(start)
      console.log('insertReview-\n', stop, '\n');
      return 'inserted review'
    })
    .catch((err) => {
      console.error(err);
    });
};

const getItems = (storeId, itemId, order = 'createdAt') => {
  var start = StopWatch.start('milliseconds')
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId} ORDER BY ${order} DESC;`;
  return client.query(query)
    .then((itemReviews) => {
      let stop = StopWatch.end(start)
      console.log('getItems-\n', stop, '\n');
      return itemReviews;
    })
    .catch((err) => {
      console.error(err);
    });
};


const getStore = (storeId, order = 'createdAt') => {
  var start = StopWatch.start('milliseconds');
  return client.query(`SELECT * FROM reviews WHERE storeId = ${storeId} ORDER BY ${order} DESC`)
    .then((store) => {
      let stop = StopWatch.end(start)
      console.log('getStore-\n', stop, '\n');
      return store;
    })
    .catch((err) => {
      console.error(err);
    });
};


const isHelpful = (storeId, id) => {
  var start = StopWatch.start('milliseconds');
  return client.query(`UPDATE reviews SET helpful = helpful + 1 WHERE storeId = ${storeId} AND id = ${id} RETURNING helpful;`)
    .then((updated) => {
      let stop = StopWatch.end(start);
      console.log('isHelpful\n', stop, '\n');
      return updated
    })
    .catch((err) => {
      console.error(err)
    });
};

const isOffensiveReview = (storeId, id) => {
  var start = StopWatch.start('milliseconds');
  return client.query(`DELETE FROM reviews WHERE storeId = ${storeId} AND id = ${id}`)
    .then((deleted) => {
      let stop = StopWatch.end(start);
      console.log('deleteReview-\n', stop, '\n');
    })
    .catch((err) => {
      console.error(err);
    });
};

async function stressIt() {
  await addReview() // add review to: store0 at item0 w/ id0
  const results = await getItems(0, 0, 'helpful');
  const data = results.rows[0];
  const storeId = data.storeid;
  const id = data.id;
  await getStore(storeId);
  await isHelpful(storeId, id);
  await isOffensiveReview(storeId, id);
}
stressIt();

module.exports = {
  addReview,
  getItems,
  getStore,
  isHelpful,
  isOffensiveReview
}
