// получаем элемент динозаврика по его ID
const dino = document.getElementById("dino");

// получаем элементы для отображения счета и рекорда
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");

// инициализация счета и рекорда
let score = 0;
// localStorage.getItem возвращает ключ, если его нет null
let highScore = localStorage.getItem("highScore") || 0;
highScoreElement.innerText = `Рекорд: ${highScore}`;

// функция прыжка
function jump() {
  // проверяем, не находится ли динозаврик в прыжке
  if (dino.classList != "jump") {
    // добавляем класс jump для начала анимации прыжка
    dino.classList.add("jump");

    // удаляем класс jump через 300 миллисекунд, чтобы завершить прыжок
    setTimeout(function () {
      dino.classList.remove("jump");
    }, 300);
  }
}

// добавляем обработчик событий
document.addEventListener("keydown", function (event) {
  // проверяем, была ли нажата клавиша пробела
  if (event.key === " ") {
    // если пробел нажат, вызываем функцию jump()
    jump();
  }
});

// Получаем элемент кактуса по его ID
const cactus = document.getElementById("cactus");
// Получаем элемент Game Over
const gameOver = document.getElementById("gameOver");

// Устанавливаем интервал для проверки состояния игры каждые 10 мс
let isAlive = setInterval(function () {
  // Получаем текущую y-позицию динозаврика
  let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

  // Получаем текущую x-позицию кактуса
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  // Проверяем условия столкновения:
  // кактус находится в пределах 50 пикселей от динозаврика по оси x,
  // кактус ещё не прошёл динозаврика, и динозаврик не прыгнул высоко
  if (cactusLeft < 50 && cactusLeft > 0 && dinoTop >= 140) {
    // Если произошло столкновение, останавливаем игру и показываем Game Over
    cactus.style.animationPlayState = "paused"; // Останавливаем анимацию кактуса
    gameOver.style.display = "block"; // Показываем надпись Game Over

    // Сохраняем рекорд, если текущий счет больше
    if (score > highScore) {
      localStorage.setItem("highScore", score);
      highScoreElement.innerText = `Рекорд: ${score}`;
    }

    // Добавляем обработчик событий для возобновления игры при нажатии клавиши
    document.addEventListener("keydown", function (event) {
      // проверяем, была ли нажата клавиша пробела
      if (event.key === " ") {
        // если пробел нажат, перезагружаем страницу
        location.reload();
      }
    });

    clearInterval(isAlive); // Останавливаем проверку состояния игры
    clearInterval(scoreInterval); // Останавливаем обновление счета
  }
}, 10);

// Устанавливаем интервал для обновления счета каждую секунду
let scoreInterval = setInterval(function () {
  score++;
  scoreElement.innerText = `Счет: ${score}`;
}, 1000);