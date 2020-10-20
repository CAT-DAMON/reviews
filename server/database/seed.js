const { Timer } = require('../../point_in_time_v1/timer.js');
const StopWatch = new Timer();
console.log('WRITING TO CSV IN 5 ROUNDS \n0/5 ROUNDS INSERTED...')

const faker = require('faker');
const fake = require('./seedValues.js');
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'sampleData5.csv');
const writeReviews = fs.createWriteStream(file, {flags: 'a'});
const itemCount = 100;

const seed = (storeStart, storeEnd, count) => {
  for (let s = storeStart; s < storeEnd; s++) {
    for (let d = 0; d < itemCount; d++) {
      let reviewCount = Math.ceil(Math.random() * 11)
      for (let c = 0; c < reviewCount; c++) {
        count++;
        let itemId = d;
        let date = new Date(faker.date.past(6)).toUTCString().split(',').slice(1);
        let mockData = `${s},${itemId},${date},${Math.floor(Math.random() * 20)},${faker.internet.userName()},${fake.names[Math.floor(Math.random() * 650)]},${faker.image.avatar()},${Math.ceil(Math.random() * 5)},${faker.lorem.sentences()},${fake.productNames[itemId]},${faker.image.imageUrl()},${faker.image.imageUrl()}\n`;
        writeReviews.write(mockData, (err) => {
          if (err) {
            console.error(err);
          };
        });
      };
    };
  };
  return count;
};
// CSV1 SETTINGS
// START = 0
// END = 10,000
// CSV2 SETTINGS
// START = 50,000
// END = 60,000
// STORECOUNTEND += 10,000 Batches 1M items
var storeCountStart = 0;
var storeCountEnd = 10;
var totalCount = 0;
const start = StopWatch.start('seconds');
const controller = (limit) => {
  const pacer = setImmediate(() => {
    const count = seed(storeCountStart, storeCountEnd, 0);
    totalCount += count;
    console.log(`${limit}/5 ROUNDS: ${count} INSERTED...`)
    if (limit < 5) {
      storeCountStart = storeCountEnd;
      storeCountEnd += 10;
      controller(++limit);
    } else {
      StopWatch.end(start, 'Seeding Script CSV2', `Total Reviews: ${totalCount}`)();
      console.log([`\n${totalCount + 30002573} REVIEWS READY TO BE STORED`])
      return;
    }
  });
}
controller(1);
