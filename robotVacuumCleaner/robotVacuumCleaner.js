'use strict';

/*
Робот-пылесос
Ограничение времени
	1 с
Ограничение памяти
	256.0 Мб
Ввод
	стандартный ввод или input.txt
Вывод
	стандартный вывод или output.txt

Недавно Вы купили робот-пылесос.
Через некоторое время Вы заметили баг в поведении пылесоса: иногда пылесос упирается в стенку или мебель.
Правда ли пылесос убирает всю комнату? Для ответа на вопрос Вы получили доступ к плану комнаты и последовательности
действий пылесоса.

Комната имеет форму прямоугольника n × m n×m клеток. Каждая клетка либо пустая, либо занятая.

Робот пылесос умеет делать поворот вправо/влево и ехать вперед.
Если в ходе выполнения действий робот-пылесос пытается выехать за границу комнаты (упирается в стенку)
 или пытается заехать на мебель, то он остается на месте.

Изначально, робот пылесос находится в пустой клетке (r,c) и повернут вверх.
Посчитайте количество клеток, которые посетит робот пылесос, включая стартовую.

Формат ввода

В первой строке заданы два числа n, m -- размер комнаты.

В следующих n n строках задан план комнаты. Если j-я клетка в i-й строке занята,
 то s i, j = si,j​= #. Если же j-я клетка в i-й строке свободна, то s i , j = si,j​= ..

Далее даны два числа r и c -- стартовое положение робота-пылесоса.

В следующей строке задано количество действий q робота-пылесоса.
Далее следует строка длины q, задающая действия пылесоса в порядке выполнения.

Символ L задает поворот налево. Символ R задает поворот направо. Символ M задает движение вперёд.
Формат вывода

Количество клеток, которые посетит робот пылесос, включая стартовую.
Пример
Ввод

3 3
###
...
..#
2 2
6
RMLLMM

Вывод

3

Примечание

Ограничения:

    1 ≤ n , m ≤ 1000
    1 ≤ r ≤ n
    1 ≤ c ≤ m
    1 ≤ q ≤ 105

*/

const robotVacuumCleaner = {
  settings: {
    lengthMin: 1,
    lengthMax: 1000,
    widthMin: 1,
    widthMax: 1000,
    positionStartRMin: 1,
    positionStartRMax: 1000,
    positionStartCMin: 1,
    positionStartCMax: 1000,
    numberActionsMin: 1,
    numberActionsMax: 105,
  },
  length: null,
  width: null,
  roomPlan: null,
  roomCells: null,
  divergenceIndices: 1, //расхождения индексов массивы начинаются с 0 а не с 1
  positionStartRC: null,
  positionStartR: null,
  positionStartC: null,
  numberActions: null,
  actions: null,
  numberCellsVisitedRobot: 0,
  positionRobotAfterExecuteCommands: null,
  direction: 'up',

  run() {
    this.init();
    this.executeCommands();
    this.output();
  },

  init() {
    this.lengthAndWidth = prompt('Длина и ширина?', '3 3');
    [this.length, this.width] = this.lengthAndWidth.split(' ');
    this.length = Number(this.length);
    this.width = Number(this.width);

    this.roomPlanInit();

    this.robotInit();

    this.numberActions = Number(prompt('Количество действий робота?', 6));

    this.actions = prompt('Команды для робота?', 'RMLLMM');

  },

  roomPlanInit() {
    this.roomPlan = [];
    this.roomCells = {};

    for (let row = 0; row < this.length; row++) {
      this.roomPlan[row] = [];
      for (let col = 0; col < this.width; col++) {
        this.roomPlan[row][col] = prompt(`${row}${col}. Если занята, напечатайте #`, '#');
        this.roomPlan[row][col] === '#' ? '' : this.roomPlan[row][col] = '.';
        this.roomCells[`${row}${col}`] = this.roomPlan[row][col];
      }
    }
  },

  robotInit() {
    this.positionStartRC = prompt('Стартовая позиция робота?', '2 2');
    [this.positionStartR, this.positionStartC] = this.positionStartRC.split(' ');
    this.positionStartR = Number(this.positionStartR) - this.divergenceIndices;
    this.positionStartC = Number(this.positionStartC) - this.divergenceIndices;
  },

  executeCommands() {
    this.positionRobotAfterExecuteCommands = {
      row: this.positionStartR,
      col: this.positionStartC,
    };

    for (let i = 0; i < this.actions.length; i++) {
      let command = this.actions[i];
      this.setDirection(command);
      let nextPosition = this.getNextPosition();
      if (this.canStep(nextPosition)) {
        this.numberCellsVisitedRobot++;
        this.positionRobotAfterExecuteCommands = {
          row: nextPosition.row,
          col: nextPosition.col,
        };
      }
    }

  },

  setDirection(command) {
    switch (command) {
      case 'R':
        if (this.direction === 'up') {
          this.direction = 'right';
        } else if (this.direction === 'right') {
          this.direction = 'down';
        } else if (this.direction === 'down') {
          this.direction = 'left';
        } else if (this.direction === 'left') {
          this.direction = 'up';
        }
        break;
      case 'L':
        if (this.direction === 'up') {
          this.direction = 'left';
        } else if (this.direction === 'left') {
          this.direction = 'down';
        } else if (this.direction === 'down') {
          this.direction = 'right';
        } else if (this.direction === 'right') {
          this.direction = 'up';
        }
        break;
      case 'M':
        break;
    }
  },

  getNextPosition() {
    switch (this.direction) {
      case 'up':
        return { row: this.positionRobotAfterExecuteCommands.row - 1, col: this.positionRobotAfterExecuteCommands.col }
      case 'down':
        return { row: this.positionRobotAfterExecuteCommands.row + 1, col: this.positionRobotAfterExecuteCommands.col }
      case 'right':
        return { row: this.positionRobotAfterExecuteCommands.row, col: this.positionRobotAfterExecuteCommands.col + 1 }
      case 'left':
        return { row: this.positionRobotAfterExecuteCommands.row, col: this.positionRobotAfterExecuteCommands.col - 1 }
    }
  },

  canStep(nextPosition) {
    return this.roomCells[`${nextPosition.row}${nextPosition.col}`] === '.'
      && nextPosition.row > -1
      && nextPosition.col > -1
      && nextPosition.row < this.length
      && nextPosition.row < this.width
  },

  output() {
    console.log(this.numberCellsVisitedRobot);
    alert(this.numberCellsVisitedRobot);
  }

}

robotVacuumCleaner.run();