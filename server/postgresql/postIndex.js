
const { Client } = require('pg');
const client = new Client({
  user: 'username',
  host: 'localhost',
  database: 'sdc',
  password: 'password123',
  port: 5432
});
client.connect();


var count = 1
const insert = (schema, mockData) => {
  client.query(`INSERT INTO reviews(${schema}) VALUES (${mockData})`, (err, res) => {
    if (err) {
      console.error(err, 'POSTGRES QUERY 1')
    }
  });
  console.log(count);
  count++;
}

const getItemReviews = (item) => {
  return client.query('SELECT * FROM reviews', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log(res.rows);
    }
  })
}

const getStoreReviews = (store) => {
  client.query(`SELECT * FROM`, (err, res) => {
    if (err) {
      console.error
    }
  })
}

module.exports = {
  insert,
  getItemReviews,
  getStoreReviews
}