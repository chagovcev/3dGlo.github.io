'use strict';

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import elementClosest from 'element-closest';
elementClosest(window);
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import calc from './modules/calc';
import sendForm from './modules/sendForm';
   
   //Timer
   
    countTimer('27 march 2020');

    //Menu

    toggleMenu();

    //popup
 
    togglePopUp();

    //Tabs

    tabs();

    //Slider

    slider();

    // Our team

    const commandPhoto = document.querySelectorAll('.command__photo');

    for (let i = 0; i < commandPhoto.length; i++){
        commandPhoto[i].addEventListener('mouseenter', (e)=> {
            const target = event.target.src;
            event.target.src = event.target.dataset.img;
            if(event.target.src = event.target.dataset.img){                
                commandPhoto[i].addEventListener('mouseleave', (e)=> {
                    event.target.src = target;
                });
            } else {
                return;
            }
        });
        
    }

    //Calc block

    calc(100);

    //send-ajax-form

    sendForm();