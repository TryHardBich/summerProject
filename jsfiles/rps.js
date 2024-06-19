window.addEventListener('load', function () { // приложение начинает работать после того как все ресурсы загруженна

    let countUser = document.querySelector('.count-user'),
        countComp = document.querySelector('.count-comp'),
        userField = document.querySelector('.user-field'),
        compField = document.querySelector('.comp-field'),
        res = document.querySelector('.result'),
        play = document.querySelector('.play'),
        fields = document.querySelectorAll('.field'), //играть заново (он у всех кнопок)
        userStep, compStep, countU = 0, countC = 0, blocked = false;


    function choiceUser(e) { // ф-ция для выбора комбинации пользователя
        if (blocked) return; //после выбора r p s, нельзя сделать сразу второй выбор, пока выбирает компьютер
        let target = e.target; // элемент по которому я кликнул
        // содержит ли элемент target класс field, проверка нажали мы имнно на r p s 
        if (target.classList.contains('field')) { //если мы нажали на какойто из жестов
            // получение дата атрибута, r, p или s
            userStep = target.dataset.field; // записывае выбранный жест в userStep
            fields.forEach(item => item.classList.remove('active', 'error')); // удаляем зеленый цвет кнопки и красный, после переигровки
            target.classList.add('active'); // добавляем класс
            choiceComp(); // начинает работать комп
        }
    }

    function choiceComp() { //ф-ция для выбора комбинации comp
        blocked = true; //пока комп думает, мы не смогли поменять выбор
        let rand = Math.floor(Math.random() * 3); // случ число 1,2,3
        compField.classList.add('blink'); // мигает выбор компа
        let compFields = compField.querySelectorAll('.field'); //взять кнопки из compField
    
        setTimeout(() => {
            compField.classList.remove('blink'); // удаляем мирцание выбора компа
            compStep = compFields[rand].dataset.field; // получить случайно выбор компа
            compFields[rand].classList.add('active');
            winner(); //вывод результатов
        }, 3000); // задержка 3 секунды
    }

    function winner() {
        blocked = false; //пользователь мог выбирать

        let comb = userStep + compStep; // формирование комбинации 'ss' 'pp' ...

        // определяем результат игры в зависимости от комбинации
        switch (comb) {
            case 'rr':
            case 'ss':
            case 'pp':
                res.innerText = 'Ничья!';
                break;

            case 'rs':
            case 'sp':
            case 'pr':
                res.innerText = 'Вы выиграли!';
                countU++; // увеличиваем счет
                countUser.innerText = countU; // обновляем счет
                compField.querySelector('[data-field='+compStep+']').classList.add('error'); // выделяем красным цветом кнопку компа
                break;

            case 'sr':
            case 'ps':
            case 'rp':
                res.innerText = 'Компьютер выиграл!';
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field='+userStep+']').classList.add('error'); // выделяем красным цветом кнопку компа
                break;
        }
    }

    function playGame() { //начало игры заново
        countU = countC = 0;
        res.innerText = 'Сделайте выбор';
        countUser.innerText = '0';
        countComp.innerText = '0';
        fields.forEach(item => item.classList.remove('active', 'error'));
    }

    play.addEventListener('click', playGame); // при нажатии на play, вызывается ф-ция playGame
    userField.addEventListener('click', choiceUser);

});