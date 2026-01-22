'use strict';

const dataForExample1 = [
  [1, 2, 3],
  [2, 3, 4, 5],
  [2, 3]
];

const dataForExample2 = [
  [1, 2, 3, 4],
  [2, 3, 5],
  [2, 3, 4, 6, 7]
];

const getSizeCrossingArrayUnicue = {
  result: null,
  run(data) {
    this.result = {};
    data.map(row => row.map(num => {
      this.result[num] ? this.result[num]++ : this.result[num] = 1;
    }
    ));

    console.log(this.result);
  }
}

getSizeCrossingArrayUnicue.run(dataForExample1);
getSizeCrossingArrayUnicue.run(dataForExample2);
