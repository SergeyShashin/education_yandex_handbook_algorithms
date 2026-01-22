'use strict';

/*
Выполнение операций с множеством
Ограничение времени
1 с
Ограничение памяти
256.0 Мб
Ввод
стандартный ввод или input.txt
Вывод
стандартный вывод или output.txt

Изначально у вас есть пустое множество. Далее вам поступает q запросов. Каждый запрос одного из следующих типов:
Запрос 1-ого типа: добавить число x во множество
Запрос 2-ого типа: проверить, содержится ли число x во множестве

Формат ввода
Первая строка содержит единственное число q -- количество запросов.

Далее следует q строк. Каждая из этих строк может иметь один из следующих видов:
 Для запроса первого типа -- "1 x" (без кавычек).
 Для запроса второго типа -- "2 x" (без кавычек).

Формат вывода
Вывод должен состоять из count строк, где count -- количество запросов второго типа. Каждая строка должна содержать одно число:

Число 0, если такого числа не было во множестве
Число 1, если такое число было во множестве

Примечание
Ограничения:
1<=q<=10**5;
1<=x<=10**9;

Пример
Ввод
9
2 5
1 5
2 5
1 6
1 10
2 7
1 7
2 10
2 7

Вывод
0
1
0
1
1

*/

const settings = {
  minQ: 1,
  maxQ: 10 ** 5,
  minValue: 1,
  maxValue: 10 ** 9,
};

let data = [
  '2 5',
  '1 5',
  '2 5',
  '1 6',
  '1 10',
  '2 7',
  '1 7',
  '2 10',
  '2 7',
];

let expectedOutput = '01011';
let result = '';
let errors = [];
let q = Number(prompt('Количество запросов?', 9));
let arrayWithUnicueElements = [];

validationQ(q);

if (isValid()) {

  for (let i = 1; i < q + 1; i++) {
    let query = prompt('Код запроса и значение через пробел?', data[i - 1]);
    let [codeQuery, value] = query.split(' ');

    validationValue(Number(value));

    if (!isValid()) {
      break;
    }

    implementation(codeQuery, value);

  }

  output(result);
}

errors.map(err => console.error(err));

function validationQ(q) {
  if (q < settings.minQ) {
    errors.push(`Количество запросов ожидается больше ${settings.minQ}.`);
  }

  if (q > settings.maxQ) {
    errors.push(`Количество запросов ожидается меньше ${settings.maxQ}.`);
  }
}

function validationValue(value) {
  if (value < settings.minValue) {
    errors.push(`Значение = ${value}, а ожидается больше ${settings.minValue}.`);
  }

  if (value > settings.maxValue) {
    errors.push(`Значение = ${value}, а ожидается меньше ${settings.maxValue}.`);
  }
}

function isValid() {
  return errors.length === 0
}

function implementation(codeQuery, value) {

  switch (codeQuery) {
    case '1':
      arrayWithUnicueElements.push(value);
      break;
    case '2':
      if (arrayWithUnicueElements.includes(value)) {
        // console.log('1');
        result += '1';
      } else {
        // console.log('0');
        result += '0';
      }
      // console.log(arrayWithUnicueElements.includes(value) ? '1' : '0');
      break;
    default: console.log(`Запроса ${codeQuery} пока нет.`);
  }

}

function output(result) {
  console.log(expectedOutput === result ? 'Ожидаемый и реальный результаты совпадают)' : 'Что-то случилось.');
  console.log(result);
}

