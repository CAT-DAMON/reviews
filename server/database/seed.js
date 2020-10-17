const faker = require('faker');
const fake = require('./birds.js');
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'sampleData2.csv');
const writeReviews = fs.createWriteStream(file, {flags: 'a'});

const seed = (storeStart, storeEnd) => {
  for (let s = storeStart; s < storeEnd; s++) {                  // 10000 stores
    for (let d = 0; d < 100; d++) {                              // 100 items
      for (let c = 0; c < Math.ceil(Math.random() * 11); c++) {  // 5 reviews per item === 5M Rev per Round
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

var storeCountStart = 50000
var storeCountEnd = 60000
// START BACK AT 0
var time = new Date()
var start = time.getTime() / 1000;
console.log('WRITING TO CSV IN 5 ROUNDS \n0/5 ROUNDS INSERTED...')
var controller = (limit) => {
  var pacer = setImmediate(() => {  // using setImmediate to clear some memory between calls
    seed(storeCountStart, storeCountEnd);
    console.log(limit + '/5 ROUNDS INSERTED...' ) // 5,000,000 reviews AVERAGE added everytime it is reached this point
    if (limit < 5) {
      storeCountStart = storeCountEnd;
      storeCountEnd += 10000;
      controller(++limit);
    } else {
      let endTime = new Date();
      let end = endTime.getTime() / 1000;
      console.log(`FINISHED IN ${Math.floor((end - start) / 60)} MIN ${Math.floor((end  - start) % 60)} SECONDS`);
      return;
    }
  });
}
controller(1);
// controller(5)