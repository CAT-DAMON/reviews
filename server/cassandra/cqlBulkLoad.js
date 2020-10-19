const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();
const { cass } = require('../../db.config.js');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client(cass.config);
client.connect();

const bulkLoad = () => {
  var start = StopWatch.start('seconds');
  client.execute(cass.bulkLoad)
    .then((confirm) => {
      StopWatch.end(start, 'Cassandra: bulkLoad', confirm)();
    })
    .catch((err) => {
      console.error(err);
    });
};
bulkLoad();

// CURRENTLY THE QUERY ONLY WORKS IN COMMAND LINE //
