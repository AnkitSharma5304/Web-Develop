const container = document.querySelector('.calculator')
const height = document.querySelector('#height')
const weight = document.querySelector('#weight')
const result = document.querySelector('#result')

container.addEventListener('click' , function(e){
      if(e.target.id==='calculateBMI'){
        calculateBMI();

      }
});
function calculateBMI(){
    const heightI = parseFloat(height.value)
    const weightI= parseInt(weight.value)
    if(isNaN(heightI) || isNaN(weightI)){
        alert('Please enter valid numbers for height and weight');
    return;
    }
     if(heightI<=1 || weightI<=1){
        alert('Please enter valid numbers for height and weight');
    return;
    }
    const bmi = (weightI / (heightI * heightI)).toFixed(1);
    let category;
    if(bmi<=18.5){
        category='Underweight';
    }
    else if(bmi>=18.5 && bmi<=24.9){
        category='Normal weight';
    }
    else if(bmi>=25 && bmi<=29.9){
        category='Overweight';
    }
    else{
        category='Obesity';
    }
   result.textContent=`Your BMI: ${bmi} (${category})`;
   result.style.display = 'block';
   height.value = '';
weight.value = '';

}
