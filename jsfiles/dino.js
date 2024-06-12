const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
let isAlive = true; // Флаг для отслеживания "живости" динозавра
let score = 0; // Переменная для хранения счета

document.addEventListener("keydown", function(event) {
  if (isAlive && (event.code === "Space" || event.code === "ArrowUp")) { // Проверка живой ли динозавр
    console.log("Key pressed: ", event.code);
    jump();
  }
});

function jump() {
  if (!dino.classList.contains("jump")) {
    console.log("Jumping!");
    dino.classList.add("jump");
    setTimeout(function() {
      dino.classList.remove("jump");
    }, 300);
  }
}

let obstacleMovement = setInterval(function() {
  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"));

  console.log("dinoBottom: " + dinoBottom + ", cactusLeft: " + cactusLeft);

  if (cactusLeft < 100 && cactusLeft > 50 && dinoBottom <= 10) {
    alert("Game Over! Your score: " + score);
    cactus.style.animation = 'none';
    cactus.style.left = `${cactusLeft}px`;
    clearInterval(obstacleMovement);
    isAlive = false; // Меняем значение на false, если умираем
  } else {
    score++; // Увеличиваем счет, если игрок избежал препятствия
    document.getElementById('score').innerText = 'Score: ' + score; // Обновляем отображение счета
  }
}, 10); 
const restart = document.getElementById("restart");

restart.addEventListener("click", function() {
  location.reload(); // Перезагружаем страницу
});