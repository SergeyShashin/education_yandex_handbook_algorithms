'use strict';

/*
Дан массив a, состоящий из n чисел.
Удалите элемент в самой правой (с наибольшим номером) позиции, содержащий максимальный элемент массива.

Формат ввода
Первая строка содержит единственное число n -- количество чисел в массиве.
Вторая строка содержит n, разделённых пробелами, чисел a[i], где a[i] -- число на i-й позиции в массиве a.

Ограничения: 3<=n<=10**5; 1<=a[i]<=10**5 для всех 1<=i<=n.

Формат вывода
Выведите n−1 число -- оставшиеся элементы массиваa. Числа разделяйте пробелами.

Пример1
Ввод
5
3 2 5 1 4
Вывод
3 2 1 4

Пример2
Ввод
5
1 2 5 3 5
Вывод
1 2 5 3

Пример3
Ввод
7
1 2 1 2 1 2 1
Вывод
1 2 1 2 1 1 

*/

//Пример1
let n = Number(prompt('Количество чисел в массиве', 5));
let str2 = prompt('Количество чисел в массиве', '3 2 5 1 4');

//Пример2
// let n = Number(prompt('Количество чисел в массиве', 5));
// let str2 = prompt('Количество чисел в массиве', '1 2 5 3 5');

//Пример3
// let n = Number(prompt('Количество чисел в массиве', 5));
// let str2 = prompt('Количество чисел в массиве', '1 2 1 2 1 2 1');

let numberInArr = [];
let numbersOutOfRange = '';
let maxNum;
let result = [];

str2.split(' ').map((el, idx) => {
  if (el < 1 || el > 10 ** 5) {
    numbersOutOfRange += el + ' ';
  }

  if (idx == 0) {
    maxNum = Number(el);
  }

  if (el > maxNum) {
    maxNum = Number(el);
  }

  numberInArr.push(Number(el));
});


console.log(n, numberInArr, maxNum);
console.log(isValid(n, numberInArr, numbersOutOfRange) ? 'Нормуль:)' : 'Что-то нужно исправить при вводе данных.');

result = [...numberInArr];
result.splice(result.reverse().indexOf(maxNum), 1);

result.reverse();
output(result);

function isValid(n, numberInArr, numbersOutOfRange) {
  let minLimLengthArr = 3;
  let maxLimLengthArr = 10 ** 5;

  return n > minLimLengthArr && n < maxLimLengthArr && numberInArr.length > minLimLengthArr && numberInArr.length < maxLimLengthArr
    && numbersOutOfRange.length === 0;
}

function output(result) {
  alert(result.join(' '));
}