const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const { psqlConfig, psqlTestHeader } = require('../../db.config.js');
const { Client } = require('pg');
const client = new Client(psqlConfig);
client.connect();
console.log(psqlTestHeader);

const getItems = (storeId, itemId) => {
  var start = StopWatch.start('milliseconds')
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId};`;
  return client.query(query, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      let stop = StopWatch.end(start)
      console.log('getItems-\n', stop, '\n');
    }
  })
}
getItems(1000, 5);

const getStore = (storeId) => {
  var start = StopWatch.start('milliseconds')
  client.query(`SELECT * FROM reviews WHERE storeId = ${storeId}`, (err, res) => {
    if (err) {
      console.error
    } else {
      let stop = StopWatch.end(start)
      console.log('getStore-\n', stop, '\n');
    }
  })
}
getStore(1000);

module.exports = {
  getItems,
  getStore
}
