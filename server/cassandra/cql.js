const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();
const { cass } = require('../../db.config.js');
console.log(cass.testHeader);

const cassandra = require('cassandra-driver');
const client = new cassandra.Client(cass.config);

client.connect((err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Cassandra Connected')
  }
});

const getItem = (storeId, itemId) => {
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId} ALLOW FILTERING;`;
  var start = StopWatch.start('milliseconds');
  client.execute(query)
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
  client.execute(query)
    .then((items) => {
      console.log(StopWatch.end(start), 'Cassandra - getStore');
    })
}
getStore(1000)
module.exports.cassandra = client;
