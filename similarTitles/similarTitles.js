'use strict'

/*

Похожие названия
источник задчи https://new.contest.yandex.ru/contests/80786/problems?id=149944%2F2025_08_30%2F0GulzPQ0bo
Ограничение времени
2 с
Ограничение памяти
256.0 Мб
Ввод
стандартный ввод или input.txt
Вывод
стандартный вывод или output.txt

Пара слов интересная, если слова отличаются ровно в одной букве.

Дан набор слов одинаковой длины. Вычислите количество интересных пар.

Формат ввода
Первая строка содержит одно число n -- количество слов.

Далее следуют n строк, каждая содержит ровно одну непустую строку,
состоящую из не более чем 10 символов английского алфавита. Символы могут быть верхнего и нижнего регистра.

Формат вывода
Вывод должен содержать одно число -- количество интересных пар слов.

Пример 1
Ввод
5
rom
bom
dom
bot
rot
Вывод
6

Пример 2
Ввод
3
aa
aa
aa
Вывод
0

Пример 3
Ввод
6
aaa
aaB
aBa
Baa
BBB
abb
Вывод
3

Примечание
Ограничения: 1≤n≤10**5

*/

let str1 = prompt('Количество слов?', 5);
let str2 = prompt('Слова?', 'rom bom dom bot rot');
// let str1 = prompt('Количество слов?', 3);
// let str2 = prompt('Слова?', 'aa aa aa');
// let str1 = prompt('Количество слов?', 6);
// let str2 = prompt('Слова?', 'aaa aaB aBa Baa BBB abb');

let n = Number(str1);
let words = [];
let counterTrue = 0;

str2.split(' ').map(el => words.push(el));

console.log(words, n);

for (let i = 0; i < words.length - 1; i++) {
  if (words[i] === words[i + 1]) {
    continue;
  }
  let currentWord = words[i].split('');
  for (let idxChar = 0; idxChar < currentWord.length; idxChar++) {
    let saveChar = currentWord[idxChar];
    currentWord[idxChar] = '.';
    let strForRgxp = [...currentWord].join('');
    let rgxp = new RegExp(strForRgxp);
    for (let j = i + 1; j < words.length; j++) {
      if (rgxp.test(words[j])) {
        counterTrue++;
      }

      console.log(rgxp, rgxp.test(words[j]), currentWord, words[i], words[j]);
    }
    currentWord[idxChar] = saveChar;
  }
}

console.log(counterTrue);