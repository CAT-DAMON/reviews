const faker = require('faker');
const fake = require('./birds.js');
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'sampleData3.csv');
const writeReviews = fs.createWriteStream(file, {flags: 'a'});

const seed = () => {
  for (let s = 0; s < 10000; s++) {  // 10000 stores
    for (let d = 0; d < 100; d++) {  // 100 items
      for (let c = 0; c < 5; c++) {  // 5 reviews per item === 5M reviews
        let itemId = d;
        let date = new Date(faker.date.past(6)).toUTCString().split(',').slice(1);
        let mockData = `${faker.internet.userName()},${fake.names[Math.floor(Math.random() * 650)]},${faker.image.avatar()},${date},${Math.ceil(Math.random() * 5)},${faker.lorem.sentences()},${itemId},${fake.productNames[itemId]},${faker.image.imageUrl()},${s},${faker.image.imageUrl()},${Math.floor(Math.random() * 20)}\n`;
        writeReviews.write(mockData, (err) => {
          if (err) {
            console.error(err);
          }
        });
      }
    }
  }
}

var controller = (limit) => {
  var pacer = setImmediate(() => {  // using setImmediate to invoke garbage collection between calls
    seed();
    console.log(limit * 5000000) // 1,000,000 reviews added everytime it is reached this point
    if (limit < 1) {
      controller(++limit);
    } else {
      return;
    }
  });
}
controller(1);
