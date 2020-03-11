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

export default togglePopUp;