const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const { cass } = require('../../db.config.js');
console.log(cass.testHeader);

const cassandra = require('cassandra-driver');
const client = new cassandra.Client(cass.config);
client.connect();

const addReview = () => {
  var start = StopWatch.start('milliseconds');
  return client.execute(cass.insert)
    .then((newReview) => {
      StopWatch.end(start, 'addReview')();
      return 'inserted review';
    })
    .catch((err) => {
      console.error(err);
    });
};

const getItem = (storeId, itemId) => {
  const start = StopWatch.start('milliseconds');
  return client.execute(`SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId} ALLOW FILTERING;`)
    .then((reviews) => {
      StopWatch.end(start, 'getItem')();
      return reviews;
    })
    .catch((err) => {
      console.error(err);
    });
};

const getStore = (storeId) => {
  const start = StopWatch.start('milliseconds');
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId}`;
  return client.execute(query)
  .then((items) => {
    StopWatch.end(start, 'getStore')();
    return items;
  })
  .catch((err) => {
    console.error(err);
  });
};

const isHelpful = (helpful, storeId, body) => {
  const start = StopWatch.start('milliseconds');
  const query = `UPDATE reviews SET helpful = ${helpful} WHERE storeid = ${storeId} AND itemId = 0 AND body = $$${body}$$ IF EXISTS;`;
  return client.execute(query)
    .then((updated) => {
      StopWatch.end(start, 'isHelpful')();
      return updated;
    })
    .catch((err) => {
      console.error(err);
    });
};

const isOffensiveReview = (storeId, body) => {
  const start = StopWatch.start('milliseconds');
  const query = `DELETE FROM reviews WHERE storeId = ${storeId} AND body = ${body};`
  return client.execute(query)
    .then((deleted) => {
      StopWatch.end(start, 'isOffensiveReview')();
    })
    .catch((err) => {
      console.error(err);
    });
};

const wipeTable = (tableName) => {
  const start = StopWatch.start('seconds');
  return client.execute(`TRUNCATE ${tableName}`)
    .then((confirmation) => {
      StopWatch.end(start, 'Table Wiped', confirmation)();
      return confirmation;
    });
};

(async function stressCass(tableIsDirty) {
  await addReview();
  const results = await getItem(20, 10);
  const data = results.rows[0];
  const storeId = data.storeid;
  const body = data.body;
  const updatedHelpful = data.helpful + 1;
  await getStore(storeId);
  // await isHelpful(updatedHelpful, storeId, body);
  // await isOffensiveReview(storeId, body);
  if (tableIsDirty) {
    wipeTable('reviews');
  };
})();

module.exports = {
  addReview,
  getItem,
  getStore,
  isHelpful,
  isOffensiveReview,
  wipeTable
};
