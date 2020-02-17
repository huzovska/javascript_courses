window.addEventListener('DOMContentLoaded', function(){
    
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    let hideTabContent = (a) => {
        for (let i = a; i < tabContent.length;i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);

    let showTabContent = (b) => {
        if (tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains('info-header-tab')) {
            for(let i = 0; i<tab.length; i++) {
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });
    
    //Timer

    let deadLine = '2020-02-28';

    let getTimeRemaining = (endtime) => {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60)));

            if(t>=0) {
                return {
                    'total' : t,
                    'hours' : hours,
                    'minutes' : minutes,
                    'seconds' : seconds
                };
            } else {
                return {
                    'total' : 0,
                    'hours' : '0',
                    'minutes' : '0',
                    'seconds' : '0'
                };
            }
    } ;

    let setClock = (id, endtime) => {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock () {
            let t = getTimeRemaining(endtime);

            // function addZero(num){
            //     if(num <= 9) {
            //         return '0' + num;
            //     } else {return num;}
            // };

            // hours.textContent = addZero(t.hours);
            // minutes.textContent = addZero(t.minutes);
            // seconds.textContent = addZero(t.seconds);
            
            if(t.hours<10){
                hours.textContent = '0' + t.hours;
            } else {hours.textContent = t.hours;}
            if(t.minutes<10){
                minutes.textContent = '0' + t.minutes;
            }else{minutes.textContent = t.minutes;}
            if(t.seconds<10){
                seconds.textContent = '0' + t.seconds;
            } else{seconds.textContent = t.seconds;}
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                // hours.textContent = '00';
                // minutes.textContent = '00';
                // seconds.textContent = '00';
            }
        }
    };

    setClock('timer', deadLine);

    // function updateClock(){
    //     let t = getTimeRemaining(endtime);
    //     if(t.hours<10){
    //         hours.textContent = '0'+t.hours
    //     }
    // }

    //Modal
    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.add('more-splash');
        document.body.style.overflow = '';
    });

    let description = document.querySelectorAll('.description-btn');
    description.forEach(desc => desc.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }));

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так..'
    };
    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader ('Context-Type', 'application/json; charrset = utf-8');
        // request.setRequestHeader ('Context-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key){
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function(){
            if (request.readyState < 4){
                statusMessage.innerHTML = message.loading;
            } else if (request.readyState === 4 && request.status == 200){
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

            for (let i = 0; i< input.length; i++) {
                input[i].value = '';
            }
        
    });

});