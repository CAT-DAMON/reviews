////////////////////////////////////////////////////////////////
// POSTGRESQL QUERIES //////////////////////////////////////////
CREATE TABLE
reviews (
  id serial PRIMARY KEY,
  userId VARCHAR(110) NOT NULL,
  userName VARCHAR(110) NOT NULL,
  userThumb VARCHAR(200) NOT NULL,
  createdAt TIMESTAMP WITH TIME ZONE NOT NULL,
  rating INT NOT NULL,
  body VARCHAR(600) NOT NULL,
  itemId INT NOT NULL,
  itemName VARCHAR(110) NOT NULL,
  itemThumb VARCHAR(200) NOT NULL,
  storeId INT NOT NULL,
  imageURL VARCHAR(200) NOT NULL,
  helpful INT NOT NULL
);
////////////////////////////////////////////////////////////////
// CASSANDRA QUERIES ///////////////////////////////////////////
CREATE KEYSPACE sdc
WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '1'} AND durable_writes = 'true';
////////////////////
CREATE TABLE reviews
(
  userId text,
  userName text,
  userThumb text,
  createdAt text,
  rating int,
  body text,
  itemId int,
  itemName text,
  itemThumb text,
  storeId int,
  imageURL text,
  helpful int,
  PRIMARY KEY(storeId, itemId)
)
WITH CLUSTERING ORDER BY (itemId DESC);
// export JAVA_HOME=/usr/bin/java
JAVA_HOME=/usr/lib/jvm/java-8-oracle

// BULK LOAD COMMAND ((NEEDS WORK, MAY NOT BE NECESSARY))
bin/dsbulk load -k sdc -t reviews --connector.csv.urlfile "server/database/sampleData1.csv"
// CREATES THE SAMPLEDATA1 AND SAMPLEDATA2 FILES
// EACH FILE CARRIES 25M
// ::TIMING::
// POSTGRESQL - '2:30 to Add 25M, no loss recorded. Query time is under 500ms for all of 1 store (500 items sorted)
// CASSANDRA - '24995000 rows imported in 17 minutes and 18.998 seconds (0 skipped) Avg. rate:   24057 rows/s'
//              NOTE: last 5000 have not been recorded, there was a loss at very end
COPY reviews(userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/sampleData2.csv'
WITH DELIMITER = ',';
// COPY reviews(userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful)
// FROM '/Users/jasedinardo/SDC/Reviews/server/database/sampleData2.csv'
// WITH DELIMITER ',';
