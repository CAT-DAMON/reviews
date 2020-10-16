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



COPY reviews(userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful)
FROM '/Users/jasedinardo/SDC/Reviews/server/database/psqlData.csv'
CSV;


export JAVA_HOME=`/usr/libexec/java_home -v 1.8.0_265`
run cassandra // opens and logs data
