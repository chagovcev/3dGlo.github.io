window.addEventListener('DOMContentLoaded', function(){
   'use strict';
   
   //Timer
   function countTimer(deadLine) {
       let timerHours = document.querySelector('#timer-hours'),
       timerMinutes = document.querySelector('#timer-minutes'),
       timerSeconds = document.querySelector('#timer-seconds'),
       timerAll = document.querySelector('#timer');

    function getTimeRemaining(){
        let dateStop = new Date(deadLine).getTime(),
            dateNow = new Date().getTime(),
            timeRemaining = (dateStop - dateNow) / 1000,
            seconds = Math.floor(timeRemaining % 60),
            minutes = Math.floor((timeRemaining / 60) % 60),
            hours = Math.floor(timeRemaining / 60 / 60);
            return {timeRemaining, hours, minutes, seconds};
    }
        function updateClock() {
            let timer = getTimeRemaining();

            if(timer.hours < 10) {
                timerHours.textContent = '0' + timer.hours;
            } else{
                timerHours.textContent = timer.hours;
            }
            if(timer.minutes < 10) {
                timerMinutes.textContent = '0' + timer.minutes;
            } else{
                timerMinutes.textContent = timer.minutes;
            }
            if(timer.seconds < 10) {
                timerSeconds.textContent = '0' + timer.seconds;
            } else{
                timerSeconds.textContent = timer.seconds;
            }
            
            if(timer.timeRemaining > 0){
                setTimeout(updateClock, 1000);
            } else if (timer.timeRemaining < 0){
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00'; 
                timerAll.style.color = '#D70000';
            }
        }

        updateClock();
    }

    countTimer('27 march 2020');

    //Menu
    const toggleMenu = () => {

        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu');

            const handlerMenu = () => {
                menu.classList.toggle('active-menu');  
            };

            btnMenu.addEventListener('click', handlerMenu);
            
            menu.addEventListener('click', (event) => {
                let target = event.target;

                if(target.classList.contains('close-btn') || 
                    target.closest('ul>li') || 
                    target.classList.contains('menu')){ 
                        handlerMenu();
                } 
            });      
    };

    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupContent = document.querySelector('.popup-content'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            width = document.documentElement.clientWidth;


            popupBtn.forEach((elem) => {
                elem.addEventListener('click', () => {
                    popup.style.display = 'block';
                    
                    if(width > 768){
                        let flyInterval;
                        let count = 0;
                        let flyAnimate = function() {
                            flyInterval = requestAnimationFrame(flyAnimate);
                            count++;
                            
                            if(count < 10){
                                popupContent.style.top = count  + '%';
                            } else {
                                cancelAnimationFrame(flyInterval);
                            }
                        };
                        flyAnimate();
                    } else {
                        return;
                    } 
                    
                });
            });
            popup.addEventListener('click', (event) => {
                let target = event.target;

                if(target.classList.contains('popup-close')){
                    popup.style.display = 'none';
                } else{
                    target = target.closest('.popup-content');
                    if(!target){
                        popup.style.display = 'none';
                    }
                }                
            });
    };

    togglePopUp();

    //Tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toogleTabContent = (index) => {
            for (let i =0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

            tabHeader.addEventListener('click', (event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab');

                if (target){
                    tab.forEach((item, i) => {
                        if (item === target){
                            toogleTabContent(i);
                        }                        
                    });
                }                
            });
    };

    tabs();

    //Slider

    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelectorAll('.portfolio-dots');

            let dot = [];
            let newDot = () => {
               
                for (let i = 0; i < slide.length; i++){
                     dot[i] = document.createElement('li');
                    dot[i].classList.add('dot');
                    portfolioDots[0].appendChild(dot[i]);
                }
            }; 
     
             newDot();

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active'); 
            prevSlide(dot, currentSlide, 'dot-active');        
            currentSlide++;
            if(currentSlide === slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active'); 
            nextSlide(dot, currentSlide, 'dot-active'); 
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', (event) => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches('.portfolio-btn, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active'); 
            prevSlide(dot, currentSlide, 'dot-active');  
       
            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if(currentSlide >= slide.length){
                currentSlide = 0;
            } 

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active'); 
            nextSlide(dot, currentSlide, 'dot-active'); 
        });

        slider.addEventListener('mouseover', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (event) => {
            if (event.target.matches('.portfolio-btn') || 
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
       
    };

    slider();
});
