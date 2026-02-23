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
  movePosition: {
    row: null,
    col: null,
  },
  differenceSF: {
    numbersRow: null,
    numbersCol: null,
  },
  canMoveCels: {},
  canAchieveF: true,
  commands: [],
  run() {
    this.init();
    for (let row = 0; this.finishFound === null || this.startFound === null; row++) {
      for (let col = 0; col < this.inputDataMap[row].length; col++) {
        if (this.inputDataMap[row][col] === '.') {
          this.canMoveCels[`row${row}_col${col}`] = '.';
        }
        if (this.inputDataMap[row][col] === 'F') {
          this.finishFound = true;
          this.positionFinish.row = row;
          this.positionFinish.col = col;
          this.canMoveCels[`row${row}_col${col}`] = 'F';
        }
        if (this.inputDataMap[row][col] === 'S') {
          this.startFound = true;
          this.positionStart.row = row;
          this.positionStart.col = col;
          this.canMoveCels[`row${row}_col${col}`] = 'S';
        }
      }
    }
    console.log('Цель =', this.positionFinish, 'Старт=', this.positionStart);
    console.log('Координаты, где можно передвигаться', this.canMoveCels);
    this.movePosition.row = this.positionStart.row;
    this.movePosition.col = this.positionStart.col;
    console.log('Перемещаемая позиция', this.movePosition);
    let counter = 0;
    while ((this.movePosition.row !== this.positionFinish.row || this.movePosition.col !== this.positionFinish.col) && counter < 2) {
      ++counter;
      this.setDifferenceSF();
      console.log('Кол-во строк и колонок до цели =', this.differenceSF);

      let direction = this.getDirectionForNextStep();
      let nextStep = this.getNextStep(direction);

      if (this.canStep(nextStep)) {
        this.makeStep(nextStep);
        this.commands.push(direction);
      } else {
        console.log(direction);
        console.log('Нужно принимать решение');
      }

      console.log('Команды', this.commands);
      console.log('Позиция после шага', this.movePosition);
    }

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
  setDifferenceSF() {
    this.differenceSF.numbersRow = Math.abs(this.movePosition.row - this.positionFinish.row);
    this.differenceSF.numbersCol = Math.abs(this.movePosition.col - this.positionFinish.col);
  },

  getDirectionForNextStep() {
    let directionForNextStep;
    if (this.differenceSF.numbersRow < this.differenceSF.numbersCol && this.differenceSF.numbersRow !== 0) {
      directionForNextStep = this.getUpOrDown();
    } else {
      directionForNextStep = this.getRightOrLeft();
    }
    return directionForNextStep
  },

  getUpOrDown() {
    if (this.movePosition.row < this.positionFinish.row) {
      return 'down';
    } else if (this.movePosition.row > this.positionFinish.row) {
      return 'up';
    }
  },

  getNextStep(direction) {
    let nextStep = {
      row: this.movePosition.row,
      col: this.movePosition.col,
    }
    switch (direction) {
      case 'up':
        nextStep.row--;
        break;
      case 'down':
        nextStep.row++;
        break;
      case 'left':
        nextStep.col--;
        break;
      case 'right':
        nextStep.col++;
        break;
    }

    return nextStep

  },

  getRightOrLeft() {
    if (this.movePosition.col < this.positionFinish.col) {
      return 'right'
    } else if (this.movePosition.col > this.positionFinish.col) {
      return 'left'
    }
  },

  canStep(nextStep) {
    let content = this.inputDataMap[nextStep.row][nextStep.col];
    return content === '.' || content === 'F';
  },

  makeStep(nextStep) {
    this.movePosition.row = nextStep.row;
    this.movePosition.col = nextStep.col;
  }

};

exitMaze.run();