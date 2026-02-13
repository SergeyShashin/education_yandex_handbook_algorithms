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
2 ≤ n ≤ 1000 2≤n≤1000
1 ≤ m ≤ 100
2 ≤ ki ≤ 10 для всех i от 1 до m 
*/

const graphFromRouteList = {
  numberStopsAndNumberRoutes: null,
  numberStops: null,
  numberRoutes: null,
  numberStopsOnRouteAndRoutes: [],
  routes: [],
  adjacensyMatrixForDeterminingTimeBetweenStops: [],
  adjacensyMatrixForDeterminingMinimumNumberTransfers: [],

  run() {
    this.init();
    console.log(this.routes);
    console.log(this.numberStops, this.numberRoutes);
    console.log(this.adjacensyMatrixForDeterminingTimeBetweenStops);
    console.log(this.adjacensyMatrixForDeterminingMinimumNumberTransfers);

    for (let routeIdx = 0; routeIdx < this.routes.length; routeIdx++) {
      let route = this.routes[routeIdx];
      for (let currentIdx = 0, nextIdx = 1; nextIdx < route.length; currentIdx++ , nextIdx++) {
        console.log(route[currentIdx], route[nextIdx]);
        let contentCurrentIdx = Number(route[currentIdx]) - 1;
        let contentNextIdx = Number(route[nextIdx]) - 1;
        this.adjacensyMatrixForDeterminingTimeBetweenStops[contentCurrentIdx][contentNextIdx] = 1;
        this.adjacensyMatrixForDeterminingTimeBetweenStops[contentNextIdx][contentCurrentIdx] = 1;
      }
    }
    console.log('Заполненная матрица смежности для определния времени между остановками', this.adjacensyMatrixForDeterminingTimeBetweenStops);

  },

  init() {
    this.inputData();
    this.fillMatrixZero();
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
      this.adjacensyMatrixForDeterminingMinimumNumberTransfers.push(new Array(this.numberStops).fill(0));
    }
  }

}

graphFromRouteList.run();