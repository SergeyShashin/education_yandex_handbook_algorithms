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
    this.obj = {};
    this.result = {};
    data.map((row, idx) => row.map(num => {
      if (this.obj[num]) {
        this.obj[num]++;
      } else {
        this.obj[num] = idx;
      }
    }
    ));

    console.log(this.result);
  }
}

getSizeCrossingArrayUnicue.run(dataForExample1);
getSizeCrossingArrayUnicue.run(dataForExample2);
