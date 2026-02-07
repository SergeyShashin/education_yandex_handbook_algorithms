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
  timeWork = 0;

  requestProcessing(timeForProcessing) {
    this.timeWork += timeForProcessing;
    this.setStatusBusy();

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

  getTimeWork() {
    return this.timeWork
  }

}

// let n = ('Количество тикетов', 5);
let n = ('Количество тикетов', 4);

// getTotalTime(['3 5', '2 7', '3 4', '1 7', '2 1']);
getTotalTime(['5 10', '2 5', '3 5', '4 1']);


function getTotalTime(timeProcessingAndPriority) {
  const priorityQueue = {};
  const arrWithTimeTicketsInOrderPriority = [];
  let T = 0;
  let timeWorkFirstEmployee = 0;
  let timeWorkSecondEmployee = 0;
  // let interval;

  timeProcessingAndPriority.map(ticket => {
    let [timeProcessing, priority] = ticket.split(' ');
    timeProcessing = Number(timeProcessing);
    priority = Number(priority);

    priorityQueue[priority] ? priorityQueue[priority].push(timeProcessing) : priorityQueue[priority] = [timeProcessing];
  });

  const priorities = Object.keys(priorityQueue);

  priorities.map(priority => {
    priorityQueue[priority].length > 1
      ? arrWithTimeTicketsInOrderPriority.push(...priorityQueue[priority].sort((a, b) => b - a))
      : arrWithTimeTicketsInOrderPriority.push(priorityQueue[priority][0])
  });

  // console.log(priorityQueue);
  // console.log(arrWithTimeTicketsInOrderPriority);

  while (arrWithTimeTicketsInOrderPriority.length) {
    let firstTime = arrWithTimeTicketsInOrderPriority.pop();
    timeWorkFirstEmployee += firstTime;
    while (arrWithTimeTicketsInOrderPriority.length) {
      let secondTime = arrWithTimeTicketsInOrderPriority.pop();
      timeWorkSecondEmployee += secondTime;
      if (firstTime - secondTime < 1) {
        break;
      }
    }
  }

  T = Math.max(timeWorkFirstEmployee, timeWorkSecondEmployee);

  console.log(T);
  alert(T);

  // let employee1 = new Employe();
  // let employee2 = new Employe();

  // interval = setInterval(() => {
  //   if (arrWithTimeTicketsInOrderPriority.length === 0) {
  //     clearInterval(interval);
  //     // console.log(employee1.getTimeWork());
  //     // console.log(employee2.getTimeWork());
  //     T = Math.max(employee1.getTimeWork(), employee2.getTimeWork())
  //     console.log('Общее время работы', T);
  //     return T
  //   } else {
  //     console.log('У сотрудников есть tickets для обработки.');
  //   }
  //   // console.log('Первый сотрудник', employee1.getStatus());
  //   // console.log('Второй сотрудник', employee2.getStatus());

  //   if (employee1.getStatus() === 'free') {
  //     employee1.requestProcessing(arrWithTimeTicketsInOrderPriority.pop());
  //   }

  //   if (employee2.getStatus() === 'free') {
  //     employee2.requestProcessing(arrWithTimeTicketsInOrderPriority.pop());
  //   }

  // }, 1000);



}

