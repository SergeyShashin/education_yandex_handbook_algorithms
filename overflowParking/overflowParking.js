'use strict';

/*
В торговом центре есть парковка на k мест.
Приезжают n автомобилей, для каждого известны моменты прибытия ai и отбытия bi
​(ai<bi).
Если в момент прибытия парковка полностью занята, автомобиль не сможет припарковаться и уезжает.

Нужно посчитать, сколько автомобилей реально воспользуются парковкой.

Формат выходных данных
Выведите одно число — количество автомобилей, которые успешно припаркуются.

Пример 1
Ввод
5 2
1 4
2 5
3 6
4 7
5 8

Вывод
4

Пример 2
Ввод
6 3
0 5
1 4
2 8
3 7
6 9
8 10
Вывод
5
*/

defineQuantityCarsCanParking('5 2', ['1 4', '2 5', '3 6', '4 7', '5 8'], 4);
defineQuantityCarsCanParking('6 3', ['0 5', '1 4', '2 8', '3 7', '6 9', '8 10'], 5);

function defineQuantityCarsCanParking(quantityCarsAndQuantityPlaces, timeArrivalTimeDepartureCars, correctAnswer) {
  let quantityCarsCanParking = 0;
  let [quantityCars, quantityPlaces] = quantityCarsAndQuantityPlaces.split(' ');
  quantityPlaces = Number(quantityPlaces);
  let stateParking = [];

  //Заполняет stateParking временем отбытия первых автомобилей.
  //Увеличивет quantityCarsCanParking на количество припарковавшихся автомобилей.
  for (let i = 0; i < quantityPlaces; i++) {
    let [timeArrival, timeDepartureCars] = timeArrivalTimeDepartureCars[i].split(' ');
    stateParking.push(Number(timeDepartureCars));
    quantityCarsCanParking++;
  }

  //Проверяет возможность парковки других автомобилей.
  for (let i = quantityPlaces + 1; i < timeArrivalTimeDepartureCars.length; i++) {
    let [timeArrival, timeDepartureCars] = timeArrivalTimeDepartureCars[i].split(' ');
    timeArrival = Number(timeArrival);
    timeDepartureCars = Number(timeDepartureCars);
    //Если есть возможность парковки, обновляется состояние stateParking и увеличивается quantityCarsCanParking.
    for (let j = 0; j < quantityPlaces; j++) {
      if (timeArrival >= stateParking[j]) {
        quantityCarsCanParking++;
        stateParking[j] = timeDepartureCars;
        break
      }
    }
  }

  let resultMsg = `Количество автомобилей, которые успешно припаркуются = ${quantityCarsCanParking}.`;

  console.log(resultMsg);
  alert(resultMsg);

  return quantityCarsCanParking
}

