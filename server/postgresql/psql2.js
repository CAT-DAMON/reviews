
const { Client } = require('pg');
const client2 = new Client({
  user: 'username',
  host: 'localhost',
  database: 'sdc',
  password: 'password123',
  port: 5433
});
client2.connect();


var count = 1
const insert2 = (schema, mockData) => {
  client2.query(`INSERT INTO reviews(${schema}) VALUES (${mockData})`, (err, res) => {
    if (err) {
      console.error(err, 'POSTGRES QUERY 1')
    }
  });
  console.log(count);
  count++;
}

const getItemReviews2 = (item) => {
  return client2.query('SELECT * FROM reviews', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res.rows);
    }
  })
}

const getStoreReviews2 = (store) => {
  client2.query(`SELECT * FROM`, (err, res) => {
    if (err) {
      console.error
    }
  })
}

module.exports = {
  insert2,
  getItemReviews2,
  getStoreReviews2
}