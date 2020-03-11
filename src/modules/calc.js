
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
        inputsCalc = calcBlock.querySelectorAll('input'),
        calcType = document.querySelector('.calc-type'),
        calcSquare = document.querySelector('.calc-square'),
        calcCount = document.querySelector('.calc-count'),
        calcDay = document.querySelector('.calc-day'),        
        totalValue = document.getElementById('total');


        for (let i = 0; i < inputsCalc.length; i++) {

            inputsCalc[i].addEventListener('input', () => {
                inputsCalc[i].value = inputsCalc[i].value.replace(/\D/gi, '');
            });       
        }

        const countSum = () => {

            let total = 0,
            countValue = 1,
            dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,            
             squareValue = +calcSquare.value;

             if (calcCount.value > 1){
                countValue += (calcCount.value - 1) / 10;
             }

             if (calcDay.value && calcDay.value < 5) {
                 dayValue *= 2;
             } else if (calcDay.value && calcDay.value < 10) {
                 dayValue *= 1.5;
             }

             if (typeValue && squareValue){
                 total = price * typeValue * squareValue * countValue * dayValue;
             } 

            totalValue.textContent = total;
        };

        calcBlock.addEventListener('change', (event) => {
            const target = event.target;
            // if(target.matches('.calc-type') || 
            // target.matches('.calc-square') || 
            // target.matches('.calc-day') || 
            // target.matches('.calc-count')){
            //     console.log('1')
            // }

            // if(target === calcType || target === calcSquare || 
            //    target === calcCount || target === calcDay){
            //     console.log('1')
            // }

            if (target.matches('select') || target.matches('input')){
                countSum();
            }
        });
    };

    export default calc;