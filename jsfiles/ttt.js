var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell'); // ячейка клетки
var currentPlayer = document.getElementById('curPlayer');

var player = "x";

var stat = {
    'x': 0,
    'o': 0,
    'd': 0
}

var winIndex = [ // все победные индексы 
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

for (var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>" // innerHrml создает нашу строку (создали ячейки)
}

for (var i = 0; i < cell.length; i ++) { // нажатие на какую либо ячейку
    cell[i].addEventListener('click', cellClick, false);
}

function cellClick() {

    var data = [];
    
    if (!this.innerHTML) { // при нажатии проверяем, занята ли ячейка, если нет то записываем игрока
        this.innerHTML = player;
    } else {
        alert("Ячейка занята"); // ИЗМЕНИТЬ ВСПЛЫВАЮЩИЕ ОКНА <---------------
        return;
    }

    for (var i in cell) { // проверяем каждую ячейку, если стоит позиция текущего игрока, в массив дата добавляем данные
        if (cell[i].innerHTML == player) {
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }
    
    if(checkWin(data)) { // проверка совпадает ли положение игрока с выигрышным
        stat[player] += 1;
        restart("Выграл: " + player)
    } else {
        var draw = true;
        for (var i in cell) { // ничья
            if(cell[i].innerHTML == '') draw = false
        }
        if (draw) {
            stat.d += 1;
            restart("Ничья");
        }
    }

    player = player == "x" ? "o" : "x"; // после каждого хода меняем игрока
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
    for (i in winIndex) {
        var win = true;
        for (var j in winIndex[i]) {
            var id = winIndex[i][j];
            var ind = data.indexOf(id);

            if (ind == -1) {
                win = false;
            }
        }
        if (win) return true;
    }
    return false;
}

function restart(text) {

    alert(text);
    for(var i = 0; i < cell.length; i ++) {
        cell[i].innerHTML = '';
    }
    updateStat();
}

function updateStat() { // обновляем статистику счета

    document.getElementById('sX').innerHTML = stat.x;
    document.getElementById('sO').innerHTML = stat.o;
    document.getElementById('sD').innerHTML = stat.d;
}