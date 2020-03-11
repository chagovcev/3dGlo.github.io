const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка',
        successMessage = 'Спасибо мы скоро с вами свяжемся!';
    
    const form = document.querySelectorAll('form'),
        allInputs = document.querySelectorAll('input');
        

    for(let i = 0; i < allInputs.length; i++){
        if(allInputs[i].classList.contains('form-phone')){
            allInputs[i].addEventListener('input', () => {

                allInputs[i].value = allInputs[i].value.replace(/[^\d+]/g, '');
            });
        }

        if(allInputs[i].classList.contains('form-name') || 
           allInputs[i].classList.contains('mess')){
            allInputs[i].addEventListener('input', () => {

                allInputs[i].value = allInputs[i].value.replace(/[^А-Яа-яЁё\s]/g, '');

            });                 
           }
    }
    
    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = 'font-size: 2rem';

    for(let i = 0; i < form.length; i++){
        form[i].addEventListener('submit', (event) => {
            event.preventDefault();
            form[i].appendChild(statusMessage);               
            statusMessage.textContent = loadMessage;
            const formData = new FormData(form[i]); // все что содержится в форме и имеет аттрибут name!!
            let body = {};

            // // for(let val of formData.entries()){
            // //     body[val[0]] = val[1];
            // // }

            formData.forEach((val, key) => {
                body[key] = val;
            });  

            postData(formData)
                .then((response) => {
                    if (response.status !== 200){
                        throw new Error('status network not 200');
                    }
                    statusMessage.textContent = successMessage;
                    for(let i = 0; i < allInputs.length; i++){
                        allInputs[i].value = '';
                    }
                })
                .catch((error) => {
                    statusMessage.textContent = errorMessage;
                    console.error(error); 
                });           
        });
    }        

    const postData = (formData) => {

        return fetch('./server.php', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        // return new Promise ((resolve, reject) => {
        //     const request = new XMLHttpRequest();
        //     request.addEventListener('readystatechange', () => {               

        //         if(request.readyState !==4){
        //             return;
        //         }
    
        //         if(request.status === 200){
        //             const response = JSON.parse(request.responseText);
        //             resolve(response);                   
        //         } else {
        //             reject(request.statusText);                    
        //         }
    
        //     });

        //     request.open('POST', './server.php');
        //     request.setRequestHeader('Content-type', 'application/json');
                        
        //     request.send(JSON.stringify(body));
        // });            
    };

};

export default sendForm;