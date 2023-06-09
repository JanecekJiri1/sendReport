const { merge } = require('mochawesome-merge');

const options = {
  files: [
    './report/*.json',
    './mochawesome-report/*.json',
  ],
};

merge(options).then(report => {
  console.log(report);
});