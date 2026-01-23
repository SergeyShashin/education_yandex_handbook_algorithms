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
  obj: null,
  result: null,
  dataLength: null,
  
  run(data) {
    this.obj = {};
    this.dataLength = data.length;
    this.result = 0;

    data.map((row, idx) => row.map(num => {
      if (this.obj[num]) {
        this.obj[num].push(idx);
      } else {
        this.obj[num] = [idx];
      }
    }
    ));

    Object.values(this.obj).map(arrWithIdx => arrWithIdx.length === data.length ? this.result++ : '');

    console.log(`Размер пересечения всех данных множеств = ${this.result}.`);
  }
}

getSizeCrossingArrayUnicue.run(dataForExample1);
getSizeCrossingArrayUnicue.run(dataForExample2);
