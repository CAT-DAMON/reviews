
module.exports.psql = {
  config: {
    user: 'jase',
    host: '13.56.238.252',
    database: 'sdc',
    password: 'keeppushing',
    port: 5432
  },
  testHeader: 'POSTGRESQL W/ 60M IN DATABASE\n::.........................::\n',
  bulkLoad: `COPY reviews(storeId, itemId, createdAt, helpful, userId, userName, userThumb, rating, body, itemName, itemThumb, imageURL)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/pg_data1.csv'
WITH DELIMITER ',';`,
  insert: `INSERT INTO reviews(id, storeId, itemId, createdAt, helpful, userId, userName, userThumb, rating, body, itemName, itemThumb, imageURL) VALUES (200000000, 200000,0,'30 Nov 2018 12:44:13 GMT',14,'Berneice_Marquardt96','Dr. Guadalupe Gutmann','https://s3.amazonaws.com/uifaces/faces/twitter/raquelwilson/128.jpg',5,'Reprehenderit animi atque quaerat eligendi. Dicta et ad vel beatae corporis quo.','Incredible Cotton Salad - Intelligent- Clothing','http://placeimg.com/640/480','http://placeimg.com/640/480') RETURNING *;`

};

module.exports.psq2 = {
  config: {
    user: 'jase',
    host: '13.56.238.252',
    database: 'sdc',
    password: 'keeppushing',
    port: 5432
  },
  testHeader: 'POSTGRESQL W/ 60M IN DATABASE\n::.........................::\n',
  bulkLoad: `COPY reviews(storeId, itemId, createdAt, helpful, userId, userName, userThumb, rating, body, itemName, itemThumb, imageURL)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/pg_data1.csv'
WITH DELIMITER ',';`,
  insert: `INSERT INTO reviews(id, storeId, itemId, createdAt, helpful, userId, userName, userThumb, rating, body, itemName, itemThumb, imageURL) VALUES (200000000, 200000,0,'30 Nov 2018 12:44:13 GMT',14,'Berneice_Marquardt96','Dr. Guadalupe Gutmann','https://s3.amazonaws.com/uifaces/faces/twitter/raquelwilson/128.jpg',5,'Reprehenderit animi atque quaerat eligendi. Dicta et ad vel beatae corporis quo.','Incredible Cotton Salad - Intelligent- Clothing','http://placeimg.com/640/480','http://placeimg.com/640/480') RETURNING *;`

};

module.exports.cass = {
  config: {
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: ''
  },
  testHeader: 'CASSANDRA W/ 60M IN DATABASE \n::........................::\n',
  bulkLoad: `COPY reviews(storeId, itemId, createdAt, helpful, userId, userName, userThumb, rating, body, itemName, itemThumb, imageURL) FROM '/Users/jasedinardo/SDC/Reviews/server/database/sampleData2.csv' WITH DELIMITER = ',';`,
  insert: `INSERT INTO reviews(storeId, itemId, createdAt, helpful, userId, userName, userThumb, rating, body, itemName, itemThumb, imageURL) VALUES (200000,0,'30 Nov 2018 12:44:13 GMT',14,'Berneice_Marquardt96','Dr. Guadalupe Gutmann','https://s3.amazonaws.com/uifaces/faces/twitter/raquelwilson/128.jpg',5,'Reprehenderit animi atque quaerat eligendi. Dicta et ad vel beatae corporis quo.','Incredible Cotton Salad - Intelligent- Clothing','http://placeimg.com/640/480','http://placeimg.com/640/480');`
};

