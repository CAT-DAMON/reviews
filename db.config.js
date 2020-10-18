module.exports.psql = {
  config: {
    user: 'username',
    host: 'localhost',
    database: 'sdc',
    password: 'password123',
    port: 5432
  },
  testHeader: 'POSTGRESQL W/ 40M IN DATABASE\n::.........................::\n',
  bulkLoad: `COPY reviews(userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/sampleData2.csv'
WITH DELIMITER = ',';`,
  insert: `INSERT INTO reviews(id, userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful) VALUES (0, 'Nico.Corwin57' ,'Julian Goyette' , 'https://s3.amazonaws.com/uifaces/faces/twitter/ntfblog/128.jpg', '07 Dec 2014 22:46:58 GMT', 0,'Quis dignissimos ullam ipsum aut error magni est rerum occaecati. Praesentium itaque autem in quis dolore aliquam omnis. Illum ipsam totam ipsa sequi distinctio. Voluptas praesentium iure. Error in sint est corporis.', 0, 'Incredible Cotton Salad - Intelligent- Clothing', 'http://placeimg.com/640/480',0,'http://placeimg.com/640/480',0) RETURNING *;`

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
WITH DELIMITER = ',';`,
};

