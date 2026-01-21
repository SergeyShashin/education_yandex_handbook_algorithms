'use strict';
/*

Ограничение времени
1 с
Ограничение памяти
256.0 Мб
Ввод
стандартный ввод или input.txt
Вывод
стандартный вывод или output.txt

Дан массив a, состоящий из n чисел, и q запросов. Каждый запрос состоит из одного целого числа x[i].
Найдите и выведите индекс p[i], который является первым, самым левым, вхождением числа x[i] в массив a.
Если x[i] не встречается среди элементов массива, то p[i] = -1.

Формат ввода
Первая строка содержит два разделенных пробелом числа n и q -- количество чисел в массиве и количество запросов, соответственно.
Вторая строка содержит n чисел a[i], где a[i] -- число на i-й позиции в массиве a. Числа разделены пробелами.
Далее идут q строк, каждая строка содержит ровно одно число x[i] i -- очередной запрос.

Ограничения: 1<=n, q<=10**5; 1<=a[i]<=10**5 для всех 1<=i<=n; 1<=x[i]<=10**5 для всех 1<=i<=q.

Формат вывода
Выведите q чисел p[i].


Пример

Ввод
5 4
4 2 1 5 2
1
2
4
6

Вывод
3
2
1
-1

*/

let str1 = prompt('Количество чисел в массиве и количество запросов через пробел?', '5 4');
let str2 = prompt('Числа разделены пробелами?', '4 2 1 5 2');
let q1 = +prompt('Запрос1', 1);
let q2 = +prompt('Запрос2', 2);
let q3 = +prompt('Запрос3', 4);
let q4 = +prompt('Запрос3', 6);

let quantityNumbersAndQuantityQueries = [];
let numbersInArr = [];
str1.split(' ').map(el => quantityNumbersAndQuantityQueries.push(Number(el)));
str2.split(' ').map(el => numbersInArr.push(Number(el)));
let [quantityNumbers, quantityQueries] = quantityNumbersAndQuantityQueries;


console.log(numbersInArr.indexOf(q1) === -1 ? -1 : numbersInArr.indexOf(q1) + 1); //3
console.log(numbersInArr.indexOf(q2) === -1 ? -1 : numbersInArr.indexOf(q2) + 1); //2
console.log(numbersInArr.indexOf(q3) === -1 ? -1 : numbersInArr.indexOf(q3) + 1); //1
console.log(numbersInArr.indexOf(q4) === -1 ? -1 : numbersInArr.indexOf(q4) + 1); //-1
