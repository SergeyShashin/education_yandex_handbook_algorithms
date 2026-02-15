'use stict';

/*

Рейтинг в шахматном турнире
источник https://new.contest.yandex.ru/contests/80791/problems?id=149944%2F2025_08_30%2FB2IGLwkZkV

Ограничение времени
	1 с
Ограничение памяти
	256.0 Мб
Ввод
	стандартный ввод или input.txt
Вывод
	стандартный вывод или output.txt

Даны m m партий в шахматном турнире. В каждой известен победитель.
Требуется определить, возможно ли однозначно определить уровень игрока?

Будем считать, что у каждого игрока есть свой уникальный скрытый уровень.
Игрок с большим уровнем всегда побеждает игрока с меньшим уровнем.

Формат ввода

В первой строке задано два числа n, m -- количество участников турнира и количество партий.

В следующих m m строках заданы партии в формате u i , v i , t i ui​,vi​,ti​ -- номера игроков и победитель в партии.
Формат вывода

В единственной строке вывести YES, если однозначно можно определить уровень игроков и NO, иначе.
Пример 1
Ввод

5 6
1 4 1
1 2 1
3 1 2
4 2 1
2 3 1
5 3 2

Вывод

YES

Пример 2
Ввод

5 1
1 3 1

Вывод

NO

Пример 3
Ввод

5 2
2 4 2
3 2 1

Вывод

NO

Примечание

Ограничения:

    1 ≤ n , m ≤ 1 0 5
    1 ≤ ui​,vi ​≤ 105 для всех i от 1 до m
    1 ≤ t i ≤ 2 1≤ti​≤2 для всех i i от 1 до m m

*/
let str1 = '5 6';
// let str1 = '5 1';
// let str1 = '5 2';

const forEnterGames = [
  '1 4 1', '1 2 1', '3 1 2', '4 2 1', '2 3 1', '5 3 2'
  // '1 3 1'
  // '2 4 2', '3 2 1'
];

const abilityDetermineLevel = {
  settings: {
    numbersPlayersMin: 1,
    numbersPlayersMax: 105,
    numbersGamesMin: 1,
    numbersGamesMax: 105,
    idPlayerMin: 1,
    idPlayerMax: 105,
  },
  numbersPlayersAndGames: null,
  numbersPlayers: null,
  numbersGames: null,
  idPlayersAndIdxWinner: null,
  players: null,
  result: null,
  run() {
    this.init();
    this.result = this.canDetermineWinner();
    this.output();
  },
  init() {
    this.numbersPlayersAndGames = prompt('Количество игроков и партий?', str1);
    [this.numbersPlayers, this.numbersGames] = this.numbersPlayersAndGames.split(' ');
    this.numbersPlayers = Number(this.numbersPlayers);
    this.numbersGames = Number(this.numbersGames);

    this.idPlayersAndIdxWinner = [];
    this.enterResultsGame();

    this.players = {};

    this.idPlayersAndIdxWinner.map(el => {
      let [idPlayer1, idPlayer2, IdxWinner] = el.split(' ');
      idPlayer1 = Number(idPlayer1);
      idPlayer2 = Number(idPlayer2);
      IdxWinner = Number(IdxWinner);
      if (this.players[idPlayer1]) {
        this.players[idPlayer1]['numberGames']++;
        IdxWinner === 1 ? this.players[idPlayer1]['numberGamesWon']++ : '';
        this.players[idPlayer1]['persent'] = this.players[idPlayer1]['numberGamesWon'] / this.players[idPlayer1]['numberGames'];
      } else {
        this.players[idPlayer1] = {
          numberGames: 1,
          numberGamesWon: IdxWinner === 1 ? 1 : 0,
          persent: IdxWinner === 1 ? 1 : 0
        };
      }

      if (this.players[idPlayer2]) {
        this.players[idPlayer2]['numberGames']++;
        IdxWinner === 2 ? this.players[idPlayer2]['numberGamesWon']++ : '';
        this.players[idPlayer2]['persent'] = this.players[idPlayer2]['numberGamesWon'] / this.players[idPlayer2]['numberGames'];

      } else {
        this.players[idPlayer2] = {
          numberGames: 1,
          numberGamesWon: IdxWinner === 2 ? 1 : 0,
          persent: IdxWinner === 2 ? 1 : 0
        };
      }

    });

  },
  enterResultsGame() {
    for (let i = 0; i < this.numbersGames; i++) {
      this.idPlayersAndIdxWinner.push(prompt('Id игроков и индекс победителя?', forEnterGames[i]));
    }
  },
  canDetermineWinner() {
    let maxNumberGamesWon = 0;

    if (Math.ceil(this.numbersPlayers / 2) > this.numbersGames) {
      return false;
    }

    for (let key in this.players) {
      if (this.players[key]['numberGames'] < 1) {
        return false;
      }

      this.players[key]['numberGamesWon'] > maxNumberGamesWon ? maxNumberGamesWon = this.players[key]['numberGamesWon'] : '';
    }

    return maxNumberGamesWon > 2 ? true : false;
  },
  output() {
    console.log(this.result ? 'YES' : 'NO');
    alert(this.result ? 'YES' : 'NO');
  }
};

abilityDetermineLevel.run();