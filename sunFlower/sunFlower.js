'use strict';

/*

Подсолнечник

Ограничение времени
1 с

Ограничение памяти
64.0 Мб

Ввод
стандартный ввод или input.txt

Вывод
стандартный вывод или output.txt

Дано семейство множеств S1, S2, …, Sn

Требуется определить, образуют ли они подсолнечник: то есть существует такое множество C (ядро), что для любых двух различных
i !== j выполняется Si ^ Sj = C, а 'лепестки' Pi = Si \ C попарно не пересекаются: Pi ^ Pj = пустое множество для всех  i !== j.

Если семейство — подсолнечник, выведите YES, размер ядра ∣C∣ и размеры всех лепестков ∣P1∣, ∣P2∣, ..., ∣Pn∣.
Иначе выведите NO.

Формат входных данных
Первая строка содержит целое число n (2<=n<=2*10**5) - количество множеств.
Далее следуют n строк: в i-ой строке сначала дано k[i] (0<=k[i]<=2*10**5) - размеры множества, затем
k[i], различных чисел x (1<=x<=10**9) - элементы Si.

Гарантируется, что суммарное число всех элементов k[i] <= 2*10**5.

Формат выходных данных
Если семейство — подсолнечник, выведите:
YES
затем строку с одним числом ∣C∣, затем строку из n чисел - ∣P1∣, ∣P2∣, ..., ∣Pn∣.
Иначе выведите
NO

Пример1
Ввод
3
3 1 2 3
2 2 3
4 0 2 3 5
Вывод
YES
2
1 0 2

Пример2
Ввод
3
2 1 2
2 2 3
2 1 3
Вывод
NO

*/


document.getElementById('loadInput').addEventListener('change', e => handleLoadFile(e));

const sunFlower = {
  inputData: null,
  quantityArraysUnicue: null,
  sizesArraysUnicue: null,
  objWithArraysUnicue: null,
  validationMsgs: null,
  setings: {
    minQuantityArraysUnicue: 2,
    maxQuantityArraysUnicue: 200000,
  },
  run(data) {
    this.inputData = data;
    this.objWithArraysUnicue = {};
    this.sizesArraysUnicue = [];
    this.validationMsgs = [];
    this.inputData.split('_').map((raw, strNum) => {
      strNum === 0
        ? this.quantityArraysUnicue = Number(raw)
        : raw.split(' ').map((char, idxInRaw) => {
          idxInRaw === 0
            ? this.sizesArraysUnicue.push(Number(char))
            : this.objWithArraysUnicue[strNum] ? this.objWithArraysUnicue[strNum].push(Number(char)) : this.objWithArraysUnicue[strNum] = [Number(char)];
        });

    });

    console.log('Входные данные\n', this.inputData);
    console.log('Количество множеств', this.quantityArraysUnicue);
    console.log('Размры множеств', this.sizesArraysUnicue);
    console.log(this.objWithArraysUnicue);

    this.validation();
    console.log(this.validationMsgs);
  },
  validation() {
    // Первая строка содержит целое число n (2<=n<=2*10**5) - количество множеств.
    // Далее следуют n строк: в i-ой строке сначала дано k[i] (0<=k[i]<=2*10**5) - размеры множества, затем
    // k[i], различных чисел x (1<=x<=10**9) - элементы Si.
    // Гарантируется, что суммарное число всех элементов k[i] <= 2*10**5.
    this.quantityArraysUnicue < this.setings.minQuantityArraysUnicue
      ? this.validationMsgs.push(`Минимальное количество множеств ожидается больше ${this.setings.minQuantityArraysUnicue}, а сейчас ${this.quantityArraysUnicue}.`)
      : '';
    this.quantityArraysUnicue > this.setings.maxQuantityArraysUnicue
      ? this.validationMsgs.push(`Максимальное количество множеств ожидается меньше ${this.setings.maxQuantityArraysUnicue}, а сейчас ${this.quantityArraysUnicue}.`)
      : '';
  }
};


function handleLoadFile(e) {

  let reader = new FileReader();
  reader.readAsText(e.target.files[0]);

  reader.onload = () => sunFlower.run(reader.result);
}

