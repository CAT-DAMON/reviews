const faker = require('faker');
const fake = require('./birds.js');
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'psqlData.csv');
const writeReviews = fs.createWriteStream(file, {flags: 'a'});

const seed = () => {
  let birdCount = 0
  let revIMG = 0;
  let results = [];
  for (let s = 0; s < 10000; s++) {
    for (let d = 0; d < 100; d++) {
      let itemId = d;
      for (let c = 0; c < 5; c++) {
        let date = new Date(faker.date.past(6)).toUTCString().split(',').slice(1);
        if (birdCount === 27) {
          birdCount = 0;
        }
        if (revIMG === 15) {
          revIMG = 0;
        }
        let mockData = `${faker.internet.userName()},${fake.names[Math.floor(Math.random() * 650)]},${faker.image.avatar()},${date},${Math.ceil(Math.random() * 5)},${faker.lorem.sentences()},${itemId},${fake.productNames[itemId]},${faker.image.imageUrl()},${s},${faker.image.imageUrl()},${Math.floor(Math.random() * 20)}\n`;
        birdCount++;
        revIMG++;
        writeReviews.write(mockData, (err) => {
          if (err) {
            console.error(err);
          }
        })
      }
    }
  }
}

var controller = (limit) => {
  var pacer = setImmediate(() => {
    seed();
    console.log(limit * 10000000)
    if (limit < 5) {
      controller(++limit);
    } else {
      return;
    }
  });
}

controller(1);
// controller(200);
// controller(300);
// controller(400);
// controller(500);
















// module.exports.mockData = mockData;
