'use strict';
/*

Дан массив a, состоящий из n чисел.
Позиция i, является локальным минимумом, если для неё выполнены 2 условия
2<=i<=n-1 и a[i-1]>a[i]<a[i+1];

Требуется удалить из массива все элементы, стоящие в позициях локальных минимумов, определённых относительно исходного массива.

Формат ввода
Первая строка содержит единственное число n -- количество чисел в массиве.
Вторая строка содержит n, разделённых пробелами, чисел a[i], где a[i] -- число на i-й позиции в массиве a.
Ограничения: 3<=n<=10**5; 1<=a[i]<=10**5 для всех 1<=i<=n.

Формат вывода
Первая строка должна содержать одно число k -- количество элементов в массиве, которые остались после удаления.

Вторая строка должна содержать k, разделённых пробелами, чисел -- оставшиеся элементы массива a.

Пример1
Ввод
5
1 3 2 5 4
Вывод
4
1 3 5 4

Пример2
Ввод
5
3 2 1 2 3
Вывод
4
3 2 2 3

Пример3
Ввод
6
5 3 1 2 4 6

Вывод
5
5 3 2 4 6

Пример4
Ввод
7
2 1 2 1 2 1 2
Вывод
4
2 2 2 2

*/

//Пример1
let n = Number(prompt('Количество чисел в массиве', 5));
let str2 = prompt('Количество чисел в массиве', '1 3 2 5 4');

//Пример2
// let n = Number(prompt('Количество чисел в массиве', 5));
// let str2 = prompt('Количество чисел в массиве', '3 2 1 2 3');

//Пример3
// let n = Number(prompt('Количество чисел в массиве', 6));
// let str2 = prompt('Количество чисел в массиве', '5 3 1 2 4 6');

//Пример4
// let n = Number(prompt('Количество чисел в массиве', 7));
// let str2 = prompt('Количество чисел в массиве', '2 1 2 1 2 1 2');

let k = '';
let result = [];

let numberInArr = [];
let numbersOutOfRange = '';

str2.split(' ').map(el => {
  if (el < 1 || el > 10 ** 5) {
    numbersOutOfRange += el + ' ';
  }
  numberInArr.push(Number(el));
});

console.log(n, numberInArr);
console.log(isValid(n, numberInArr, numbersOutOfRange) ? 'Нормуль:)' : 'Что-то нужно исправить при вводе данных.');

addFirstEl(numberInArr[0]);

for (let i = 1, prevIdx = i - 1, nextIdx = i + 1; i + 1 < numberInArr.length; i++, prevIdx++, nextIdx++) {
  if (numberInArr[prevIdx] > numberInArr[i] && numberInArr[i] < numberInArr[nextIdx]) {

  } else {
    result.push(numberInArr[i]);
  }
}

addFirstEl(numberInArr[numberInArr.length - 1]);

k = result.length;

outputInConsole(result);

function isValid(n, numberInArr, numbersOutOfRange) {
  let minLimLengthArr = 3;
  let maxLimLengthArr = 10 ** 5;

  return n > minLimLengthArr && n < maxLimLengthArr && numberInArr.length > minLimLengthArr && numberInArr.length < maxLimLengthArr
    && numbersOutOfRange.length === 0;
}

function addFirstEl(el) {
  result.push(el)
}

function outputInConsole(result) {
  console.log(String(k));
  console.log(result.join(' '));
}