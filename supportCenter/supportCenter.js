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

let n = ('Количество тикетов', 5);

getTotalTime(['3 5', '2 7', '3 4', '1 7', '2 1']);


function getTotalTime(timeProcessingAndPriority) {
  const priorityQueue = {};
  let totalTime = 0;

  timeProcessingAndPriority.map(ticket => {
    let [timeProcessing, priority] = ticket.split(' ');
    timeProcessing = Number(timeProcessing);
    priority = Number(priority);

    priorityQueue[priority] ? priorityQueue[priority].push(timeProcessing) : priorityQueue[priority] = [timeProcessing];
  });

  const priorities = Object.keys(priorityQueue);

  while (priorities.length) {
    let priority = priorities.pop();
    console.log(priority);
  }

}
