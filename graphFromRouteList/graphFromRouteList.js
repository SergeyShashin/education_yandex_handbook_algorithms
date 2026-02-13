'use strict';

/*
Граф из списка маршрутов

источник задачи https://new.contest.yandex.ru/contests/80790/problems?id=149944%2F2025_08_30%2FesfoDkMjLn

Ограничение времени
3 с
Ограничение памяти
256.0 Мб
Ввод
стандартный ввод или input.txt
Вывод
стандартный вывод или output.txt

Транспортная система города состоит из n остановок. В городе ходит 
m маршрутов. Каждый маршрут представляет собой последовательность остановок 
c1, c2, …, ck. Транспорт ходит в обоих направлениях: от 
c1 к ck, и от ck к c1.

Требуется построить два графа.

Первый граф: остановки -- вершины, ребра -- соседние остановки на любом из маршрутов.
Этот граф можно использовать для определения времени в пути между остановками в городе.

Второй граф: остановки -- вершины, ребра -- любые две остановки, достижимые без пересадок.
Этот граф можно использовать для определения минимального количества пересадок в пути между остановками в городе.

Гарантируется, что все остановки на маршрутах различны.

Формат ввода
В первой строке заданы два числа n и m -- количество остановок и количество маршрутов в городе соответственно.

В следующих m строках заданы маршруты.

Каждый маршрут задан числом ki  -- количество остановок в i-м маршруте и последовательностью 
c1, c2, ..., ck (1 ≤ cj ≤ n) -- остановки на маршруте.

Формат вывода
В первых n строках выведите матрицу смежности первого графа.

В следующих n строках выедите матрицу смежности второго графа.

Пример 1
Ввод

5 3
3 1 2 3
2 1 2
5 5 2 4 3 1
Вывод

0 1 1 0 0
1 0 1 1 1
1 1 0 1 0
0 1 1 0 0
0 1 0 0 0
0 1 1 1 1
1 0 1 1 1
1 1 0 1 1
1 1 1 0 1
1 1 1 1 0
Пример 2
Ввод

5 3
3 1 3 5
2 2 4
5 1 2 3 4 5
Вывод

0 1 1 0 0
1 0 1 1 0
1 1 0 1 1
0 1 1 0 1
0 0 1 1 0
0 1 1 1 1
1 0 1 1 1
1 1 0 1 1
1 1 1 0 1
1 1 1 1 0

Примечание
Ограничения:
2 ≤ n ≤ 1000
1 ≤ m ≤ 100
2 ≤ ki ≤ 10 для всех i от 1 до m 
*/

const graphFromRouteList = {
  settings: {
    numberStopsMin: 2,
    numberStopsMax: 1000,
    numberRoutesMin: 1,
    numberRoutesMax: 100,
    numberStopsOnRouteMin: 2,
    numberStopsOnRouteMax: 10,
    sumNumberStopsOnRouteMax: 1000,
  },
  numberStopsAndNumberRoutes: null,
  numberStops: null,
  numberRoutes: null,
  numberStopsOnRouteAndRoutes: [],
  sumNumberStopsOnRoute: 0,
  routes: [],
  validationMsgs: [],
  adjacensyMatrixForDeterminingTimeBetweenStops: [],
  adjacensyMatrixForDeterminingMinimumNumberTransfers: [],
  result: null,


  run() {
    this.init();

    this.setValueForAdjacensyMatrixForDeterminingTimeBetweenStops();

    this.setValueForAdjacensyMatrixForDeterminingMinimumNumberTransfers();

    this.result = [...this.adjacensyMatrixForDeterminingTimeBetweenStops, ...this.adjacensyMatrixForDeterminingMinimumNumberTransfers];
    this.result.map((el, idx) => this.result[idx] = el.join(' '));
    this.result = this.result.join('\n');

    this.output();

  },

  init() {
    this.inputData();
    this.fillMatrixZero();
    this.validation();

    if (this.validationMsgs.length > 0) {
      this.validationMsgs.map(msg => console.error(msg));
    }
  },

  inputData() {
    this.numberStopsAndNumberRoutes = prompt('Количество остановок и маршрутов в городе?', '5 3');
    [this.numberStops, this.numberRoutes] = this.numberStopsAndNumberRoutes.split(' ');
    this.numberStops = Number(this.numberStops);
    this.numberRoutes = Number(this.numberRoutes);

    for (let i = 0; i < this.numberRoutes; i++) {
      this.numberStopsOnRouteAndRoutes[i] = prompt('Количество остановок и маршрут?', '3 1 2 3');
      this.routes[i] = [...this.numberStopsOnRouteAndRoutes[i].split(' ')].slice(1);
    }
  },

  fillMatrixZero() {
    for (let i = 0; i < this.numberStops; i++) {
      this.adjacensyMatrixForDeterminingTimeBetweenStops.push(new Array(this.numberStops).fill(0));
    }
  },

  setValueForAdjacensyMatrixForDeterminingTimeBetweenStops() {
    for (let routeIdx = 0; routeIdx < this.routes.length; routeIdx++) {
      let route = this.routes[routeIdx];
      for (let currentIdx = 0, nextIdx = 1; nextIdx < route.length; currentIdx++ , nextIdx++) {
        let contentCurrentIdx = Number(route[currentIdx]) - 1;
        let contentNextIdx = Number(route[nextIdx]) - 1;
        this.adjacensyMatrixForDeterminingTimeBetweenStops[contentCurrentIdx][contentNextIdx] = 1;
        this.adjacensyMatrixForDeterminingTimeBetweenStops[contentNextIdx][contentCurrentIdx] = 1;
      }
    }
  },

  setValueForAdjacensyMatrixForDeterminingMinimumNumberTransfers() {
    this.adjacensyMatrixForDeterminingTimeBetweenStops.map(el =>
      this.adjacensyMatrixForDeterminingMinimumNumberTransfers.push([...el]));

    this.routes.map(el => {
      if (el.length > 2) {
        for (let i = 0; i + 2 < el.length; i++) {
          let currentContentIdx = Number(el[i]) - 1;
          for (let j = i + 2; j < el.length; j++) {
            let nextContentIdx = Number(el[j]) - 1;
            this.adjacensyMatrixForDeterminingMinimumNumberTransfers[currentContentIdx][nextContentIdx] = 1;
            this.adjacensyMatrixForDeterminingMinimumNumberTransfers[nextContentIdx][currentContentIdx] = 1;
          }
        }
      }
    });

  },

  validation() {
    if (this.numberStops < this.settings.numberStopsMin || this.numberStops > this.settings.numberStopsMax) {
      this.validationMsgs.push(`Количество остановок сейчас ${this.numberStops}, а может быть от ${this.settings.numberStopsMin} до ${this.settings.numberStopsMax}.`);
    }

    if (this.numberRoutes < this.settings.numberRoutesMin || this.numberRoutes > this.settings.numberRoutesMax) {
      this.validationMsgs.push(`Количество маршрутов сейчас ${this.numberRoutes}, а может быть от ${this.settings.numberRoutesMin} до ${this.settings.numberRoutesMax}.`);
    }

    this.routes.map(el => {
      this.sumNumberStopsOnRoute += el.length;

      if (el.length < this.settings.numberStopsOnRouteMin || el.length > this.settings.numberStopsOnRouteMax) {
        this.validationMsgs.push(`Количество остановок на маршруте сейчас ${el.length}, а может быть от ${this.settings.numberStopsOnRouteMin} до ${this.settings.numberStopsOnRouteMax}.`);
        return
      }
    });

    if (this.sumNumberStopsOnRoute > this.settings.sumNumberStopsOnRouteMax) {
      this.validationMsgs.push(`Сумма остановок на всех маршрутах сейчас ${this.sumNumberStopsOnRoute}, а может быть до ${this.settings.sumNumberStopsOnRouteMax}.`);
    }

  },

  output() {
    console.log(this.result);
    alert(this.result);
  }

}

graphFromRouteList.run();