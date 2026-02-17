'use strict';

/*
Выход из лабиринта
Ограничение времени
	1 с
Ограничение памяти
	256.0 Мб
Ввод
	стандартный ввод или input.txt
Вывод
	стандартный вывод или output.txt

Задан лабиринт. Лабиринт представляет собой прямоугольник n на m клеток.
Каждая клетка может находится в одном из четырех состояний:

    Пустая клетка . ..
    Стена # #.
    Вход в лабиринт S S.
    Выход из лабиринта F F.

Гарантируется, что в лабиринте один вход и один выход. Также гарантируется, что контур лабиринта состоит из стены.

Изначально Вы находитесь в стартовой клетке. Вы можете двигаться вверх U, вниз D, вправо R, влево L.
Вам требуется вывести кратчайший выход из лабиринта с помощью символов UDRL.

Если выйти из лабиринта невозможно, то выведите −1.
Формат ввода

В первой строке заданы два числа n, m.

В следующих n строках задан лабиринт.
Формат вывода

Если выйти из лабиринта невозможно, то выведите единственное число −1.

Если же выход из лабиринта существует, то в первой строке выведите кратчайшее расстояние до выхода, а во второй сам путь.
Пример 1
Ввод

7 7
#######
#...#.#
#...#.#
#.#.#.#
#.#F#.#
#....S#
#######

Вывод

3
LLU

Пример 2
Ввод

9 9
#########
#...#...#
#..F#.###
#...#.#.#
#.###.#.#
#.S...#.#
##..###.#
#.......#
#########

Вывод

6
LUUURR

Пример 3
Ввод

11 11
###########
#.#.......#
#.#.##..###
#...#.#.#.#
#####.#.#.#
#.#.#.....#
#.#.#.#####
#.#...F.#.#
#.#S#####.#
#.........#
###########

Вывод

4
URRR

Примечание

Ограничения:
    1 ≤ n⋅m ≤ 105

*/

let str1 = '7 7';
let forInputDataMap = [
  '#######',
  '#...#.#',
  '#...#.#',
  '#.#.#.#',
  '#.#F#.#',
  '#....S#',
  '#######'
];

const exitMaze = {
  settings: {
    rowsMin: 1,
    rowsMax: 105,
    columnsMin: 1,
    columnsMax: 105,
  },
  rowsAndColumns: null,
  rows: null,
  columns: null,
  inputDataMap: null,
  startFound: null,
  finishFound: null,
  positionStart: {
    row: null,
    col: null,
  },
  positionFinish: {
    row: null,
    col: null,
  },
  differenceSF: {
    row: null,
    col: null,
  },
  commands: null,
  run() {
    this.init();
    for (let row = 0; this.finishFound === null || this.startFound === null; row++) {
      let colFinish = this.inputDataMap[row].indexOf('F');
      let colStart = this.inputDataMap[row].indexOf('S');
      if (colFinish !== -1) {
        this.finishFound = true;
        this.positionFinish.row = row;
        this.positionFinish.col = colFinish;
      }
      if (colStart !== -1) {
        this.startFound = true;
        this.positionStart.row = row;
        this.positionStart.col = colStart;
      }
    }
    console.log(this.positionFinish, this.positionStart);
    this.setDifference();
    this.defineNextStep();
  },
  init() {
    this.rowsAndColumns = prompt('Количество строк и колонок?', str1);
    [this.rows, this.columns] = this.rowsAndColumns.split(' ');
    this.rows = Number(this.rows);
    this.columns = Number(this.columns);
    console.log('Количество строк и колонок.', this.rows, this.columns);

    this.inputDataMap = [];
    this.initMap();
    console.log(this.inputDataMap);
  },
  initMap() {
    for (let i = 0; i < this.rows; i++) {
      this.inputDataMap.push(prompt('Строка карты?', forInputDataMap[i]).split(''));
    }
  },
  setDifference() {
    this.differenceSF.row = this.positionStart.row - this.positionFinish.row;
    this.differenceSF.col = this.positionStart.col - this.positionFinish.col
  },
  defineNextStep() {

    if (this.differenceSF.row === 0 && this.differenceSF.col === 0) {
      alert('Лабиринт пройден.');
    } else if (this.differenceSF.row === 0) {
      alert('Определиться влево или вправо.');
    } else if (this.differenceSF.col === 0) {
      alert('Определиться вверх или вниз.');
    }
    else if (this.differenceSF.row < this.differenceSF.col) {
      alert('Определиться вверх или вниз.');
      console.log(this.upOrDown());
    } else {
      alert('Определиться влево или вправо.')
    }
  },
  upOrDown() {
    return this.differenceSF.row > 0 ? 'up' : 'down'
  }
};

exitMaze.run();