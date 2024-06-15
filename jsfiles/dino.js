const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const highScoreElement = document.getElementById("highScore");
const scoreElement = document.getElementById("score");
let isAlive = true; // Флаг для отслеживания "живости" динозавра
let score = 0; // Переменная для хранения счета
let highScore = localStorage.getItem("highScore") || 0; // взять "highScore" из браузера, если его нет = 0
highScoreElement.innerText = `Record: ${highScore}`;

document.addEventListener("keydown", function(event) {
  if (isAlive && (event.code === "Space" || event.code === "ArrowUp")) { // Проверка живой ли динозавр
    console.log("Key pressed: ", event.code);
    jump();
  }
});

function jump() {
  if (!dino.classList.contains("jump")) { // Проверяем, не находится ли динозавр уже в прыжке (не имеет ли класс "jump").
    console.log("Jumping!"); // Отладка
    dino.classList.add("jump"); // Добавляем класс "jump" к элементу dino, что должно запускать анимацию прыжка.
    setTimeout(function() { // Запускаем таймер, чтобы удалить класс "jump" через 300 миллисекунд.
      dino.classList.remove("jump"); // Удаляем класс "jump" по завершении таймера, прекращая анимацию прыжка.
    }, 300); // Время таймера
  }
}

let obstacleMovement = setInterval(function() { // Создаем интервал, который будет вызывать функцию каждые 10 миллисекунд.
  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom")); // Получаем текущее положение динозавра по оси Y (снизу) и преобразуем его в целое число.
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left")); // Получаем текущее положение кактуса по оси X (слева) и преобразуем его в целое число.

  console.log("dinoBottom: " + dinoBottom + ", cactusLeft: " + cactusLeft); // Отладка

  const gameOver = document.getElementById("gameOver");

  if (cactusLeft < 100 && cactusLeft > 50 && dinoBottom <= 10) { // Проверяем, находится ли кактус в опасной зоне и низко ли расположен динозавр (не прыгнул ли он).
    gameOver.style.display = "block";
    cactus.style.animation = 'none'; // Останавливаем анимацию кактуса.
    cactus.style.left = `${cactusLeft}px`; // Фиксируем текущее положение кактуса.
    clearInterval(obstacleMovement); // Останавливаем интервал, прекращая движение кактуса.
    isAlive = false; // Меняем значение на false, если умираем

      // Проверка и обновление рекорда
      if (score > highScore) {
        localStorage.setItem("highScore", score); // сохраняем значение - score, под ключем - hightScore
        highScoreElement.innerText = `Record: ${score}`; // вывод
      }
  } else {
    score++; // Увеличиваем счет, если игрок избежал препятствия
    document.getElementById('score').innerText = 'Score: ' + score; // Обновляем отображение счета
  }
}, 10); 
const restart = document.getElementById("restart");

restart.addEventListener("click", function() {
  location.reload(); // Перезагружаем страницу
});