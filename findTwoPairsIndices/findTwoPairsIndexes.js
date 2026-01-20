'use strict';
/**
 * Источник задачи https://new.contest.yandex.ru/contests/80784/problem?id=149944%2F2025_08_30%2FUTQXOVGmx4
 * Дан массив a, cостоящий из n чисел.
 * Найти две пары индексов i1<j1 и i2<j2 таких что, a[i1] - a[j1] минимально возможное и a[i2] - a[j2] максимально возможное.
 * 
 * Ограничение времени 1с.
 * Ограничение памяти 256.0 МБ
 * Ограничение 3<=n<=10**5
 * Ограничение 1<=a[i]<=10**5 для всех 1<=i<=n 
 * 
 * Ввод стандартный ввод или input.txt
 * Вывод стандартный вывод или output.txt
 * 
 * Формат ввода
 * Первая строка содержит единственное число n -- количество чисел в массиве.
 * Вторая строка содержит n разделенных пробелом чисел a[i], где a[i] число на i-ой позиции в массиве a.
 * 
 * Формат вывода
 * Первая строка вывода должна содержать два разделенных пробелом числа i1 и j1.
 * Если подходящих пар несколько, то нужно выбрать пару с минимальным значением i1.
 * Если пар с минимальным значением i1 несколько, то нужно выбрать пару с минимальным значением j1.
 * Вторая строка вывода должна содержать два разделенных пробелом числа i2 и j2.
 * Если подходящих пар несколько, то нужно выбрать пару с минимальным значением i2.
 * Если пар с минимальным значением i2 несколько, то нужно выбрать пару с минимальным значением j2.
 * 
 * Пример 1
 * Ввод
 * 6
 * 2 1 3 5 2 4
 * Вывод
 * 2 4
 * 4 5
 * 
 * Пример 2
 * Ввод
 * 5
 * 3 2 4 5 6
 * Вывод
 * 2 5
 * 1 2 
 */

const findTwoPairsIndexes = {
  str1: null,
  str2: null,
  quantityNumbersInArr: null,
  numbersInArr: [],
  sortNumbersInArrFromMinToMax: null,
  sortNumbersInArrFromMaxToMin: null,
  pairIdxForMinPossible: [],
  pairIdxForMaxPossible: [],

  settings: {
    minQuantityNumbersInArr: 3,
    maxQuantityNumbersInArr: 10 ** 5,
    minNumberInArr: 1,
    maxNumberInArr: 10 ** 5
  },

  run() {
    this.inputData();
    this.transformData();
    this.sortNumbersInArrFromMinToMax = [...this.numbersInArr].sort((a, b) => a - b);
    this.sortNumbersInArrFromMaxToMin = [...this.sortNumbersInArrFromMinToMax].reverse();

    console.log(this.str1);
    console.log(this.str2);

    console.log(this.quantityNumbersInArr);
    console.log(this.numbersInArr);

    console.log(this.sortNumbersInArrFromMinToMax);
    console.log(this.sortNumbersInArrFromMaxToMin);

    let resultValidation = this.validation();

    if (resultValidation.length > 0) {
      resultValidation.map(msg => console.error(msg));
      return
    }

    // this.setPairIdxForMinPossible();
    this.setPairIdxForMaxPossible();


  },

  // setPairIdxForMinPossible() {
  //   for (let i = 0; i < this.sortNumbersInArrFromMinToMax.length; i++) {
  //     let minNum = this.sortNumbersInArrFromMinToMax[i];
  //     let maxNum = this.sortNumbersInArrFromMaxToMin[i];
  //     let idxMinNum = this.numbersInArr.indexOf(minNum);
  //     let idxMaxNum = this.numbersInArr.indexOf(maxNum);

  //     if (idxMinNum < idxMaxNum) {
  //       this.pairIdxForMinPossible.push(idxMinNum + 1, idxMaxNum + 1);
  //       return console.log(this.pairIdxForMinPossible);
  //     }

  //   }

  // },

  /**
   * 2 1 3 5 2 4
   * 2 4
   * 4 5
   * 
   * [5, 4, 3, 2, 2, 1]
   */
  setPairIdxForMaxPossible() {
    let sortNumbersInArrFromMaxToMinLength = this.sortNumbersInArrFromMaxToMin.length;
    for (let i = 0; i < sortNumbersInArrFromMaxToMinLength; i++) {
      // let minNum = this.sortNumbersInArrFromMinToMax[i];
      let maxNum = this.sortNumbersInArrFromMaxToMin[i]; //5
      // let idxMinNum = this.numbersInArr.indexOf(minNum); 
      let idxMaxNum = this.numbersInArr.indexOf(maxNum); //3
      let quantityNumbersAfterMaxNum = sortNumbersInArrFromMaxToMinLength - idxMaxNum;

      if (quantityNumbersAfterMaxNum === 0) {
        continue
      }

      let sliceArrAfterMaxNum = [...this.numbersInArr].slice(idxMaxNum); //2 4
      
      sliceArrAfterMaxNum.indexOf(Math.min(...sliceArrAfterMaxNum));

      console.log(maxNum, sliceArrAfterMaxNum);

      // if (idxMaxNum < idxMinNum) {
      //   this.pairIdxForMaxPossible.push(idxMaxNum + 1, idxMinNum + 1);
      //   return console.log(this.pairIdxForMaxPossible);
      // }

    }

  },

  validation() {
    let result = [];

    if (this.quantityNumbersInArr < this.settings.minQuantityNumbersInArr) {
      result.push(`Желаемое количество чисел в массиве = ${this.quantityNumbersInArr}, а ожидается больше ${this.settings.minQuantityNumbersInArr}.`);
    }

    if (this.quantityNumbersInArr > 10 ** 5) {
      result.push(`Желаемое количество чисел в массиве = ${this.quantityNumbersInArr}, а ожидается меньше ${this.settings.minQuantityNumbersInArr}.`);
    }

    if (this.sortNumbersInArrFromMinToMax[0] < this.settings.minNumberInArr) {
      result.push(`Минимальное число в массиве = ${this.numbersInArr}, а ожидается больше ${this.settings.minNumberInArr - 1}.`);
    }

    if (this.sortNumbersInArrFromMinToMax[this.sortNumbersInArrFromMinToMax.length - 1] > this.settings.maxNumberInArr) {
      result.push(`Минимальное число в массиве = ${this.sortNumbersInArrFromMinToMax[this.sortNumbersInArrFromMinToMax.length - 1]}, а ожидается меньше ${this.settings.maxNumberInArr + 1}.`);
    }

    return result

  },

  inputData() {
    this.str1 = prompt('Желаемое количество чисел в массиве?', 8);
    this.str2 = prompt('Числа через пробел?', '2 1 3 5 2 4');
  },

  transformData() {
    this.quantityNumbersInArr = Number(this.str1);
    this.str2.split(' ').forEach(char => this.numbersInArr.push(Number(char)));
  }
};

findTwoPairsIndexes.run();






