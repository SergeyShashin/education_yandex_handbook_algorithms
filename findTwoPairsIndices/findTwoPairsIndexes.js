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
  quantityNumbersInArr: null,
  numbersInArr: [],
  minNumber: null,
  maxNumber: null,
  resultValidation: null,
  minPossible: 0,
  maxPossible: 0,
  pairIdxForMinPossible: '',
  pairIdxForMaxPossible: '',

  settings: {
    minQuantityNumbersInArr: 3,
    maxQuantityNumbersInArr: 10 ** 5,
    minNumberInArr: 1,
    maxNumberInArr: 10 ** 5
  },

  run(str1, str2) {
    this.init(str1, str2);

    if (!this.isValid()) {
      this.resultValidation.map(msg => console.error(msg));
      return
    }

    this.setPairIdxForMinAndForMaxPossible();
    this.output();
  },

  init(str1, str2) {
    this.quantityNumbersInArr = Number(str1);
    this.minNumber = Number(str2[0]);
    this.maxNumber = this.minNumber;

    str2.split(' ').map(char => {
      let number = Number(char);
      if (number < this.minNumber) {
        this.minNumber = number;
      }

      if (number > this.maxNumber) {
        this.maxNumber = number;
      }

      this.numbersInArr.push(number);
    });

    this.resultValidation = this.validation();

  },

  isValid() {
    return this.resultValidation.length === 0
  },

  outpuErrors() {
    this.resultValidation.map(msg => console.error(msg));
  },

  setPairIdxForMinAndForMaxPossible() {
    for (let i = 0; i + 1 < this.numbersInArr.length; i++) {
      for (let j = i + 1; j < this.numbersInArr.length; j++) {
        let difference = this.numbersInArr[i] - this.numbersInArr[j];

        if (difference < this.minPossible) {
          this.minPossible = difference;
          this.pairIdxForMinPossible = `${i + 1} ${j + 1}`;
        }

        if (difference > this.maxPossible) {
          this.maxPossible = difference;
          this.pairIdxForMaxPossible = `${i + 1} ${j + 1}`;
        }
      }
    }
  },

  output() {
    console.log(this.pairIdxForMinPossible);
    console.log(this.pairIdxForMaxPossible);
  },

  validation() {
    let result = [];

    if (this.quantityNumbersInArr < this.settings.minQuantityNumbersInArr) {
      result.push(`Желаемое количество чисел в массиве = ${this.quantityNumbersInArr}, а ожидается больше ${this.settings.minQuantityNumbersInArr}.`);
    }

    if (this.quantityNumbersInArr > 10 ** 5) {
      result.push(`Желаемое количество чисел в массиве = ${this.quantityNumbersInArr}, а ожидается меньше ${this.settings.minQuantityNumbersInArr}.`);
    }

    if (this.minNumber < this.settings.minNumberInArr) {
      result.push(`Минимальное число в массиве = ${this.minNumber}, а ожидается больше ${this.settings.minNumberInArr - 1}.`);
    }

    if (this.maxNumber > this.settings.maxNumberInArr) {
      result.push(`Максимальное число в массиве = ${this.maxNumber}, а ожидается меньше ${this.settings.maxNumberInArr + 1}.`);
    }

    return result

  },


};

findTwoPairsIndexes.run(prompt('Желаемое количество чисел в массиве?', 6), prompt('Числа через пробел?', '2 1 3 5 2 4')); // 2 4   4 5
findTwoPairsIndexes.run(prompt('Желаемое количество чисел в массиве?', 5), prompt('Числа через пробел?', '3 2 4 5 6')); // 2 5   1 2






