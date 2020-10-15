const faker = require('faker');
const { insert } = require('../postgresql/postIndex.js');
const images = require('./birds.js');

// class Seed {
//   constructor() {
//     this.userId = faker.internet.userName()
//     this.userName = faker.name.findName()
//     this.userThumb = faker.image.avatar()
//     this.createdAt = date
//     this.rating = Math.ceil(Math.random() * 5)
//     this.body = faker.lorem.sentences()
//     this.itemId = itemId
//     this.itemName = itemList[itemId]
//     this.itemThumb = images.birds[birdCount];
//     this.storeId = store
//     this.imageURL = images.reviewImages[revIMG],
//     this.helpful = Math.floor(Math.random() * 20);

//   }



//   createItems() {
//     let birdCount = 0
//     let revIMG = 0;

//     for (let x = 1; x < 101; x++) {
//       for (let i = 0; i < Math.ceil(Math.random() * 3) * 5; i++) {
//         this.
//         insert(schema, )
//       }
//     }
//   }
// }

const seed = (store) => {
  const schema = 'userId, userName, userThumb, createdAt, rating, body, itemId, itemName, itemThumb, storeId, imageURL, helpful';
  console.log('BEGIN SEEDING');
  let birdCount = 0
  let revIMG = 0;
  let results = [];
  for (let s = 0; s < 5; s++) {
    for (let d = 0; d < 100; d++) {
      let itemId = d;
      for (let c = 0; c < Math.ceil(Math.random() * 3) * 3; c++) {
        var date = new Date(faker.date.past(6)).toUTCString()
        if (birdCount === 27) {
          birdCount = 0;
        }
        if (revIMG === 15) {
          revIMG = 0;
        }
        var mockData = `'${faker.internet.userName()}', '${images.names[Math.floor(Math.random() * 650)]}', '${faker.image.avatar()}', '${date}', '${Math.ceil(Math.random() * 5)}', '${faker.lorem.sentences()}', '${itemId}', '${images.productNames[itemId]}', '${images.birds[birdCount]}', '${store}', '${images.reviewImages[revIMG]}', '${Math.floor(Math.random() * 20)}'`;
        insert(schema, mockData)
        birdCount++;
        revIMG++;
      }
    }
  }
}

var count = 1
var start = new Date().getSeconds();
var end;
var seeder = setInterval(() => {
  console.log(count)
  seed(count)
  count++
  if (count === 20000) {
    clearInterval(seeder);
    end = new Date().getSeconds();
    console.log(`SEEDING TOOK ${end - start} SECONDS`)
  };
}, 250);













// module.exports.mockData = mockData;
