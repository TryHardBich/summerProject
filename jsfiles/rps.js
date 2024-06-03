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
        if (target.classList.contains('field')) {
            userStep = target.dataset.field; // dataset.название атрибута(получение дата атрибута)
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

        let comb = userStep + compStep; // комбинации 'ss' 'pp' ...

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
                countU++;
                countUser.innerText = countU;
                compField.querySelector('[data-field='+compStep+']').classList.add('error'); // достаем кнопку которую выбрал комп
                break;

            case 'sr':
            case 'ps':
            case 'rp':
                res.innerText = 'Компьютер выиграл!';
                countC++;
                countComp.innerText = countC;
                userField.querySelector('[data-field='+userStep+']').classList.add('error'); // достаем кнопку которую выбрал комп
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

    play.addEventListener('click', playGame);
    userField.addEventListener('click', choiceUser);

});