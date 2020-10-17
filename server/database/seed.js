const faker = require('faker');
const fake = require('./seedValues.js');
const fs = require('fs');
const path = require('path');
const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer()
const file = path.join(__dirname, 'sampleData5.csv');
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
// CSV1 SETTINGS
// START = 0
// END = 10,000
// CSV2 SETTINGS
// START = 50,000
// END = 60,000
var storeCountStart = 0
var storeCountEnd = 1000
var start = StopWatch.start('seconds');
console.log('WRITING TO CSV IN 5 ROUNDS \n0/5 ROUNDS INSERTED...')
var controller = (limit) => {
  var pacer = setImmediate(() => {
    seed(storeCountStart, storeCountEnd);
    console.log(limit + '/5 ROUNDS INSERTED...' )
    if (limit < 5) {
      storeCountStart = storeCountEnd;
      storeCountEnd += 1000;
      controller(++limit);
    } else {
      console.log(StopWatch.end(start));
      return;
    }
  });
}
controller(1);
// controller(5)