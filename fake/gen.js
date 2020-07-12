const wf = require('worker-farm');
const fs = require('fs');
// const { exit } = require('process');

const files = 8;
const max = 1;
const targets = 1000 * 1000;
for (let i = 0; i < files; i++) {
  const workers = wf(require.resolve('./worker.js'));
  const target = Math.floor(targets / files);

  const stm = fs.createWriteStream(`./fake/data_${i}.json`, { flags: 'w' });

  let strc = 0;

  console.log(`worker start: ${i}`);

  const before = function () {
    stm.write('[\n');
  };

  const after = function () {
    stm.write(']\n');
  };

  for (let i = 0; i < max; i++) {
    workers({ max: Math.ceil(target / (max)), place: i }, function (str) {
      if (strc === 0) {
        before();
      }
      strc += 1;
      if (strc === max) {
        stm.write(str.slice(0, -2) + '\n');
        after();
        wf.end(workers);
      }
      else {
        stm.write(str);
      }
    });
  }
}
// exit();