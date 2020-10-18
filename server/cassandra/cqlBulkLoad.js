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