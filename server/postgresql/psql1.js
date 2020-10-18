const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();

const { psqlConfig } = require('../../db.config.js');
const { Client } = require('pg');
const client = new Client(psqlConfig);
client.connect(() => {
  console.log('Postgres Connected')
});

const insert = (schema, mockData) => {
  client.query(`INSERT INTO reviews(${schema}) VALUES (${mockData})`, (err, res) => {
    if (err) {
      console.error(err, 'POSTGRES QUERY 1')
    }
  });
}

const getItems = (storeId, itemId) => {
  var start = StopWatch.start('milliseconds')
  const query = `SELECT * FROM reviews WHERE storeId = ${storeId} AND itemId = ${itemId};`;
  return client.query(query, (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(StopWatch.end(start), 'Postgresql')
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
      console.log(StopWatch.end(start), 'Postgresql')
    }
  })
}
getStore(1000);

module.exports = {
  insert,
  getItems,
  getStore
}
