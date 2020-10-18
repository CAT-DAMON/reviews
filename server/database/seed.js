const faker = require('faker');
const fake = require('./seedValues.js');
const fs = require('fs');
const path = require('path');
const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer()
const file = path.join(__dirname, 'sampleData5.csv');
const writeReviews = fs.createWriteStream(file, {flags: 'a'});

const seed = (storeStart, storeEnd) => {
  for (let s = storeStart; s < storeEnd; s++) {
    for (let d = 0; d < 100; d++) {
      let reviewCount = Math.ceil(Math.random() * 11)
      for (let c = 0; c < reviewCount; c++) {
        let itemId = d;
        console.log(c)
        let date = new Date(faker.date.past(6)).toUTCString().split(',').slice(1);
        let mockData = `${faker.internet.userName()},${fake.names[Math.floor(Math.random() * 650)]},${faker.image.avatar()},${date},${Math.ceil(Math.random() * 5)},${faker.lorem.sentences()},${itemId},${fake.productNames[itemId]},${faker.image.imageUrl()},${s},${faker.image.imageUrl()},${Math.floor(Math.random() * 20)}\n`;


                        //  Gillian20,
                        //  Opal,
                        //  https://,
                        //  25 Sep 2018 20:59:06 GMT,
                        //  1,
                        //  Assumenda.,
                        //  0,
                        //  Incredible-Clothing',
                        //  'http://0',
                        //  '14'
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
// STORECOUNTEND += 10,000 Batches 1M items
var storeCountStart = 0
var storeCountEnd = 10
var start = StopWatch.start('seconds');
console.log('WRITING TO CSV IN 5 ROUNDS \n0/5 ROUNDS INSERTED...')
var controller = (limit) => {
  var pacer = setImmediate(() => {
    seed(storeCountStart, storeCountEnd);
    console.log(limit + '/5 ROUNDS INSERTED...' )
    if (limit < 5) {
      storeCountStart = storeCountEnd;
      storeCountEnd += 10;
      controller(++limit);
    } else {
      console.log(StopWatch.end(start));
      return;
    }
  });
}
controller(1);
// controller(5)