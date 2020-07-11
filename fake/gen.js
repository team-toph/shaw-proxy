const fs = require('fs');
const faker = require('faker');

const stm = fs.createWriteStream('./fake/data.js', { flags: 'w' });

const before = function () {
  console.time('generation');
  stm.write('module.exports = [\n');
};
const after = function () {
  stm.write('null\n]\n');
  console.timeEnd('generation');
};
let count = 0;
let target = 10000;
let times = 1000;
for (let i = 0; i < target; i++) {
  setTimeout(function () {
    let str = "";
    for (let i = 0; i < times; i++) {
      str += `{"name": "${faker.commerce.productName()}","img":"https://source.unsplash.com/1600x900/?${faker.commerce.productAdjective()}","rat":${Math.ceil(Math.random() * 5)},"cost":"${faker.commerce.price()}","cond":"${Math.random() < 0.5 ? "New" : "Old"}"},\n`;
    }
    if (count === 0) {
      before();
    }
    stm.write(str);
    count++;
    if (count === target) {
      after();
    }
  }, 0);
}