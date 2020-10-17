const {Timer} = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer()
const { Client } = require('pg');
const client = new Client({
  user: 'username',
  host: 'localhost',
  database: 'sdc',
  password: 'password123',
  port: 5432
});
client.connect();

const headings = 'userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful';
const file = '/Users/jasedinardo/SDC/Reviews/server/database/sampleData1.csv';
var count = 2;

const bulkLoad = (schema, mockData) => {
  var start = StopWatch.start('seconds');
  const file = `/Users/jasedinardo/SDC/Reviews/server/database/sampleData${count}.csv`;
  client.query(`COPY reviews(${headings}) FROM '${file}' WITH DELIMITER ',';`, (err, res) => {
    if (err) {
      console.error(err, 'POSTGRES BULK LOAD')
    }
    console.log(StopWatch.end(start));
  });
};
bulkLoad();
