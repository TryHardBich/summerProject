const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const highScoreElement = document.getElementById("highScore");
const scoreElement = document.getElementById("score");
let isAlive = true; // флаг для отслеживания "живости" динозавра
let score = 0; // переменная для хранения счета
let highScore = localStorage.getItem("highScore") || 0; // взять "highScore" из хранилища браузера, если его нет = 0
highScoreElement.innerText = `Record: ${highScore}`;

document.addEventListener("keydown", function(event) {
  if (isAlive && (event.code === "Space" || event.code === "ArrowUp")) { // если дино живой, и нажата кнопка, выполняется ф-ция
    jump();
  }
});

function jump() {
  if (!dino.classList.contains("jump")) { // проверяем, не находится ли динозавр уже в прыжке (не имеет ли класс "jump")
    dino.classList.add("jump"); // добавляем класс jump к элементу dino, и запускается анимацию прыжка
    setTimeout(function() { // таймер на удаление класса jump через 300 миллисекунд
      dino.classList.remove("jump"); // удаляем класс jump по завершении таймера, прекращая анимацию прыжка
    }, 300); // время таймера
  }
}

let obstacleMovement = setInterval(function() { // интервал, который будет вызывать функцию каждые 10 миллисекунд

  // для проверки - столкнулся ли дино с кактусом
  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom")); // получаем текущее положение динозавра по оси y (снизу) и преобразуем его в целое число
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left")); // получаем текущее положение кактуса по оси x (слева) и преобразуем его в целое число

  const gameOver = document.getElementById("gameOver");

  if (cactusLeft < 100 && cactusLeft > 50 && dinoBottom <= 10) { // проверяем, находится ли кактус в опасной зоне и низко ли расположен динозавр (не прыгнул ли он)
    gameOver.style.display = "block"; // надпись game over 
    cactus.style.animation = 'none'; // останавливаем анимацию кактуса
    cactus.style.left = `${cactusLeft}px`; // фиксируем текущее положение кактуса
    clearInterval(obstacleMovement); // останавливаем интервал, прекращая движение кактуса 
    isAlive = false; // меняем значение на false, если умираем

      // проверка и обновление рекорда
      if (score > highScore) {
        localStorage.setItem("highScore", score); // сохраняем значение - score, под ключем - hightScore
        highScoreElement.innerText = `Record: ${score}`; // вывод
      }
  } else {
    score++; // увеличиваем счет, если игрок избежал препятствия
    document.getElementById('score').innerText = 'Score: ' + score; // обновляем отображение счета
  }
}, 10); 
const restart = document.getElementById("restart");

restart.addEventListener("click", function() {
  location.reload(); // перезагружаем страницу
});