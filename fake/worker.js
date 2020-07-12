const faker = require('faker');

module.exports = function ({ max, place }, cb) {
  let str = "";
  let offset = max * place;
  for (let n = 0; n < max; n++) {
    str += `  [${offset + n},"${faker.commerce.productName()}","https://source.unsplash.com/1600x900/?${faker.commerce.productAdjective()}",${Math.ceil(Math.random() * 5)},"${faker.commerce.price()}","${Math.random() < 0.5 ? "false" : "true"}"],\n`;
  }
  cb(str);
}
