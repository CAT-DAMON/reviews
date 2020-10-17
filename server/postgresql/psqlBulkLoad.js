
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
var count = 1;
const pointInTime = (interval) => {
  if (interval === 'seconds') {
    let time = new Date();
    let moment = time.getTime() / 1000;
    return moment;
  }
}
const howLongItTook = (start, end) => {
  return `FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS`
}

const bulkLoad = (schema, mockData) => {
  var start = pointInTime('seconds');
  const file = `/Users/jasedinardo/SDC/Reviews/server/database/sampleData${count}.csv`;
  client.query(`COPY reviews(${headings}) FROM '${file}' WITH DELIMITER ',';`, (err, res) => {
    if (err) {
      console.error(err, 'POSTGRES BULK LOAD')
    } else {
      let end = pointInTime('seconds');
      console.log(howLongItTook(start, end))
    }
  });
};
bulkLoad()