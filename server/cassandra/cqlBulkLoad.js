const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();
const { cass } = require('../../db.config.js');

const cassandra = require('cassandra-driver');
const client = new cassandra.Client(cass.config);
client.connect();

const bulkLoad = () => {
  var start = StopWatch.start('seconds');
  client.query(cass.bulkLoad)
    .then((confirm) => {
      let end = StopWatch.end(start);
      console.log(end);
    })

}





