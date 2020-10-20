const {Timer} = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();
const { psql } = require('../../db.config.js');

const { Client } = require('pg');
const client = new Client(psql.config);
client.connect();

const bulkLoad = () => {
  var start = StopWatch.start('seconds');
  client.query(psql.bulkLoad)
    .then((confirmation) => {
      StopWatch.end(start, 'Postgres: bulkLoad')();
      console.log(confirmation);
    })
    .catch((err) => {
      console.error(err);
    });
};
bulkLoad();
