'use strict';
/*
Центр поддержки

В центр поддержки клиентов одновременно поступило n тикетов.
Для каждого тикета известны оценка длительности обработки 
di созданная на стадии формирования заявки и приоритет wi ​(чем больше число, тем важнее тикет).
Два сотрудника центра обрабатывают тикеты параллельно, по одному тикету каждый, без прерываний.
В каждый момент, когда какой-либо сотрудник завершает текущий тикет, он выбирает среди всех оставшихся
необработанных тикетов тикет с максимальным приоритетом; при равном приоритете берётся тикет с меньшей
оцененной длительностью di
Требуется определить общее время разбора — момент, когда оба сотрудника завершат обработку всех тикетов.
*/

class Employe {
  constructor() {
  }

  status = 'free';

  requestProcessing(timeForProcessing) {
    let timer = setTimeout(() => {
      this.setStatusFree();
    }, timeForProcessing * 1000);
  }

  setStatusFree() {
    this.status = 'free'
  }

  setStatusBusy() {
    this.status = 'busy'
  }

  getStatus() {
    return this.status;
  }

}

let n = ('Количество тикетов', 5);

getTotalTime(['3 5', '2 7', '3 4', '1 7', '2 1']);




function getTotalTime(timeProcessingAndPriority) {
  const priorityQueue = {};
  let totalTime = 0;
  let interval;

  timeProcessingAndPriority.map(ticket => {
    let [timeProcessing, priority] = ticket.split(' ');
    timeProcessing = Number(timeProcessing);
    priority = Number(priority);

    priorityQueue[priority] ? priorityQueue[priority].push(timeProcessing) : priorityQueue[priority] = [timeProcessing];
  });

  const priorities = Object.keys(priorityQueue);

  let employee1 = new Employe();
  let employee2 = new Employe();


  interval = setInterval(() => {
    console.log(employee1.getStatus());
    console.log(employee2.getStatus());
  }, 1000);



}

