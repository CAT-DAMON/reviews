const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const cassandra = require('cassandra-driver');
const { cassConfig } = require('../../db.config.js');
const cass = new cassandra.Client(cassConfig);

cass.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Cassandra Connected')
  }
});

const getItem = (storeId, itemId) => {
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId} ALLOW FILTERING;`;
  var start = StopWatch.start('milliseconds');
  cass.execute(query, null, { prepare: true })
    .then((reviews) => {
      console.log(StopWatch.end(start), 'Cassandra - getItem')
      // console.log(reviews);
      return;
    })
    .catch((err) => {
      console.error(err)
    })
};
getItem(1000, 5);

const getStore = (storeId) => {
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId}`;
  var start = StopWatch.start('milliseconds');
  cass.execute(query, null, { prepare: true })
    .then((items) => {
      console.log(StopWatch.end(start), 'Cassandra - getStore');
    })
}
getStore(1000)
module.exports.cassandra = cass;
