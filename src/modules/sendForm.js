const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        loadMessage = 'Загрузка...',
        successMessage = 'Спасибо мы скоро с Вами свяжемся!';
    
    const form = document.getElementById('form1'),
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

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        let body = {};        

        form.appendChild(statusMessage);               
        statusMessage.textContent = loadMessage;

        formData.forEach((val, key) => {
            body[key] = val;
        });     
            
        console.log('body: ', body);            
    });

    // for(let i = 0; i < form.length; i++){
    //     form[i].addEventListener('submit', (event) => {

    //         event.preventDefault();

    //         form[i].appendChild(statusMessage);               
    //         statusMessage.textContent = loadMessage;
    //         const formData = new FormData(form[i]); // все что содержится в форме и имеет аттрибут name!!
    //         console.log('formData: ', formData);
    //         let body = {};

    //         // // for(let val of formData.entries()){
    //         // //     body[val[0]] = val[1];
    //         // // }

    //         formData.forEach((val, key) => {
    //             body[key] = val;
    //             console.log('body: ', body);
    //         });  

                      
    //     });
    // }        

    const postData = formData => fetch(`./server.php`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    postData(body)
        .then(response => {
            if (response.status !== 200) {
                throw new Error('status network not 200');
            }
            statusMessage.textContent = successMessage;
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 5000);

            for(let i = 0; i < allInputs.length; i++){
                allInputs[i].value = '';
            }
                    
            form.reset();
        })
        .catch(error => {
            statusMessage.textContent = errorMessage;
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 5000);        
            console.error(error);
        });
};            
export default sendForm;
