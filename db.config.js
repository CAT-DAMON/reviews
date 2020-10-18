module.exports.psql = {
  config: {
    user: 'username',
    host: 'localhost',
    database: 'sdc',
    password: 'password123',
    port: 5432
  },
  testHeader: 'POSTGRESQL W/ 40M IN DATABASE \n::.........................::\n',
  bulkLoad: `COPY reviews(userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/sampleData2.csv'
WITH DELIMITER = ',';`

};


module.exports.cass = {
  config: {
  contactPoints: ['localhost'],
  localDataCenter: 'datacenter1',
  keyspace: 'sdc'
  },
  testHeader: 'CASSANDRA W/ 40M IN DATABASE \n::........................::\n',
  bulkLoad: `COPY reviews(userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/sampleData2.csv'
WITH DELIMITER = ',';`
};

