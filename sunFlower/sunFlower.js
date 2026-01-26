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

/**
 * Устанавливает обработчик загрузки файла 
 */
document.getElementById('loadInput').addEventListener('change', e => handleLoadFile(e));

/**
 * Определяет подсолнечник.
 * @type {Object}
 * @property {String} inputData Входные данные из файла input.txt
 * @property {Number} quantityArraysUnicue Количество множеств.
 * @property {Array} sizesArraysUnicue Размеры множеств.
 * @property {Object} objWithArraysUnicue Множества.
 * @property {Array} validationMsgs Сообщения об ошибках во входных данных.
 * @property {Number} sumAllNumbersArraysUnicue Сумма всех чисел множеств.
 * @property {Array} core Ядро.
 * @property {Object} petals Листья.
 * @property {Array} petalsLength Длина листьев.
 * @property {Boolean} flagSunflower true - если подсолнечник.
 * @property {String} output Итоговое сообщение.
 * @property {Object} settings Настройки.
*/
const sunFlower = {
  inputData: null,
  quantityArraysUnicue: null,
  sizesArraysUnicue: null,
  objWithArraysUnicue: null,
  validationMsgs: null,
  sumAllNumbersArraysUnicue: null,
  core: null,
  petals: null,
  petalsLength: null,
  flagSunflower: null,
  output: null,
  /**
   * @property {Number} minQuantityArraysUnicue Минимальное количество множеств.
   * @property {Number} minQuantityArraysUnicue Максимальное количество множеств.
   * @property {Number} minSizeArraysUnicue Минимальный размер множества.
   * @property {Number} maxSizeArraysUnicue Максимальный размер множества.
   * @property {Number} minX Минимальное число в множестве.
   * @property {Number} maxX Максимальное число в множестве.
   * @property {Number} maxSumAllNumbersArraysUnicue Максимальная сумма чисел во всех множествах.
   * @property {String} outputFileName Имя файла с результатом.
   */
  settings: {
    minQuantityArraysUnicue: 2,
    maxQuantityArraysUnicue: 200000,
    minSizeArraysUnicue: 0,
    maxSizeArraysUnicue: 200000,
    minX: 1,
    maxX: 10 ** 9,
    maxSumAllNumbersArraysUnicue: 200001,
    outputFileName: 'ouput.txt'
  },
  /**
   * Запуск
   * @param {String} data Входные данные  
   */
  run(data) {
    this.init(data);
    this.inputData.split('_').map((raw, strNum) => {
      strNum === 0
        ? this.quantityArraysUnicue = Number(raw)
        : raw.split(' ').map((char, idxInRaw) => {
          idxInRaw === 0
            ? this.sizesArraysUnicue.push(Number(char))
            : this.objWithArraysUnicue[strNum] ? this.objWithArraysUnicue[strNum].push(Number(char)) : this.objWithArraysUnicue[strNum] = [Number(char)];
        });
    });

    this.validation();
    console.log('Сообщения об ошибках при валидации', this.validationMsgs);
    this.setCore();
    this.setPetals();
    this.setPetalsLength();
    this.flagSunflower = this.isSunflower();

    if (this.flagSunflower) {
      this.output = `YES\n${this.core.length}\n${this.petalsLength.join(' ')}`;
    } else {
      this.output = 'NO';
    }

    console.log(this.output);
    this.saveOutput();
  },
  /**
   * Сохраняет результат в файл
   */
  saveOutput() {
    //Сохранение файла в браузере (клиентская часть)
    //Современный способ (showSaveFilePicker)
    saveFile(this.output, this.settings.outputFileName);
    async function saveFile(content, filename) {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
      });
      const writable = await handle.createWritable();
      await writable.write(content);
      await writable.close();
    }

    //Классический способ (через ссылку <a>)
    // const blob = new Blob([this.output], { type: 'text/plain' });
    // const url = URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.download = 'output.txt';
    // link.click();
    // URL.revokeObjectURL(url);

  },
  /**
   * Определяет подсолнечник или нет.
   * @returns {Boolean} Возвращает true если подсолнечник
   */
  isSunflower() {
    return this.core.length > 0 && (Object.values(this.petals)).length > 0;
  },
  /**
   * Устанавливает длину лепестков.
   */
  setPetalsLength() {
    Object.values(this.petals).map(el => this.petalsLength.push(el.length));
  },
  /**
   * Устанавливает лепестки.
   */
  setPetals() {
    Object.values(this.objWithArraysUnicue).map((arr, idx) => arr.map(numInarr => {
      if (!this.core.includes(numInarr)) {
        this.petals[idx] ? this.petals[idx].push(numInarr) : this.petals[idx] = [numInarr];
      } else {
        this.petals[idx] ? '' : this.petals[idx] = [];
      }
    }));
  },
  /**
   * Устанавливает ядро.
   */
  setCore() {
    const defineCore = {};
    for (let el of this.objWithArraysUnicue[1]) {
      for (let i = 2; i < this.quantityArraysUnicue + 1; i++) {
        if (this.objWithArraysUnicue[i] && this.objWithArraysUnicue[i].includes(el)) {
          defineCore[el] ? defineCore[el]++ : defineCore[el] = 1;
        }
      }
    }

    for (let key in defineCore) {
      if (defineCore[key] === this.quantityArraysUnicue - 1) {
        this.core.push(Number(key));
      }
    }
  },
  /**
   * Проверяет входные данные.
   */
  validation() {
    this.quantityArraysUnicue < this.settings.minQuantityArraysUnicue
      ? this.validationMsgs.push(`Минимальное количество множеств ожидается больше ${this.settings.minQuantityArraysUnicue}, а сейчас ${this.quantityArraysUnicue}.`)
      : '';
    this.quantityArraysUnicue > this.settings.maxQuantityArraysUnicue
      ? this.validationMsgs.push(`Максимальное количество множеств ожидается меньше ${this.settings.maxQuantityArraysUnicue + 1}, а сейчас ${this.quantityArraysUnicue}.`)
      : '';
    this.sizesArraysUnicue.map(k => {
      k < this.settings.minSizeArraysUnicue
        ? this.validationMsgs.push(`Минимальный размер множества ожидается больше ${this.settings.minSizeArraysUnicue}, а сейчас ${k}.`)
        : '';
      k > this.settings.maxSizeArraysUnicue
        ? this.validationMsgs.push(`Максимальный размер множества ожидается меньше ${this.settings.maxSizeArraysUnicue + 1}, а сейчас ${k}.`)
        : '';
    });
    Object.values(this.objWithArraysUnicue).map(arr => arr.map(x => {
      this.sumAllNumbersArraysUnicue += x;
      x < this.settings.minX
        ? this.validationMsgs.push(`Минимальное число в множестве ожидается больше ${this.settings.minX}, а сейчас ${x}.`)
        : '';
      x > this.settings.maxX
        ? this.validationMsgs.push(`Максимальное число в множестве ожидается больше ${this.settings.maxX}, а сейчас ${x}.`)
        : '';
    }
    ));
    this.sumAllNumbersArraysUnicue > this.settings.maxSumAllNumbersArraysUnicue
      ? this.validationMsgs.push(`Максимальная сумма чисел во всех множествах ожидается меньше ${this.settings.maxSumAllNumbersArraysUnicue}, а сейчас ${this.sumAllNumbersArraysUnicue}.`)
      : '';
  },
  /**
   * Инициализирует свойства sunFlower
   * @param {String} data Входные данные 
   */
  init(data) {
    this.inputData = data;
    this.objWithArraysUnicue = {};
    this.sizesArraysUnicue = [];
    this.validationMsgs = [];
    this.sumAllNumbersArraysUnicue = 0;
    this.core = [];
    this.petalsLength = [];
    this.petals = {};
  }
};
/**
 * Обрабатывает событие после загрузки файла
 * @param {Event} e Событие  
 */
function handleLoadFile(e) {
  let reader = new FileReader();
  reader.readAsText(e.target.files[0]);

  reader.onload = () => sunFlower.run(reader.result);
}

