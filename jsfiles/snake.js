const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d"); //формат игры

const ground = new Image(); // image позволяет работать с картинками
ground.src = "../imgGame/ground.png";
const foodImg = new Image;
foodImg.src = "../imgGame/food.png"
let box = 32; // width or height одного квадратика

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box, // диапазон от 1 до 17
    y:Math.floor((Math.random() * 15 + 3)) * box // пропускаем 3 квадратика сверху
};

let snake = [];
snake[0] = { //head snake
    x: 9 * box,
    y: 10 * box 
}; // spawn по центру

document.addEventListener("keydown", direction);//на весь документ обработчик события

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")  // код стрелочки влево == 37
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
}

function eatTail(head, arr) { // перебираем все элементы внутри змейки и если координаты любого элемента совпадают с коорд. головы змейки конец игры
    for(let i = 0; i < arr.length; i++) {
        if(head.x == arr[i].x && head.y == arr[i].y)
           endGame();
    }
}

function endGame() { // при окончании игры появляется кнопка "начать снова"
    clearInterval(game);
    reloadButton.style.display = "block"; 
    reloadButton.addEventListener('click', function() {
        location.reload();
    });
}

function drawGame() {
    ctx.drawImage(ground, 0, 0); // координаты x and y
    
    ctx.drawImage(foodImg, food.x, food.y);

    for (let i = 0; i < snake.length; i ++) {
        ctx.fillStyle = i == 0 ? "green" : "teal"; // цвет головы змеи и ее хвоста
        ctx.fillRect(snake[i].x, snake[i].y, box, box); // fillRect нарисовать прямоугольник
    }

    ctx.fillStyle = "white"; // fillStyle - настройка цвета
    ctx.font = "50px Arial"; // настройка счета
    ctx.fillText(score, box * 2.5, box * 1.7); //текст, координат по x, y

    let snakeX = snake[0].x; //первый объект, координат
    let snakeY = snake[0].y;

    if(snakeX == food.x && snakeY == food.y) {
        score++;// если я съел еду, увел. счет и создаю новую еду
        food = {
            x: Math.floor((Math.random() * 17 + 1)) * box, // диапазон от 1 до 17
            y:Math.floor((Math.random() * 15 + 3)) * box // пропускаем 3 квадратика сверху
        };
    } else { //если не съел // удаляем последний эл, внутри змейки
        snake.pop();
    }

    if(snakeX < box || snakeX > box * 17 // если змея врезается в стенку - endGame
        || snakeY < 3 * box || snakeY > box * 17)//конец игры
        endGame(); // очищаем переменную game

    if(dir == "left") snakeX -= box; //передвигаем на один box влево
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    eatTail(newHead, snake);

    snake.unshift(newHead) //новый элемент помещаем в новые координаты, в самое начало 
}

let game = setInterval(drawGame, 100); // вызываем функцию drawGmae каждые 100 миллисекунд

