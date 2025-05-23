const buttons = document.querySelectorAll('.button')
const body = document.querySelector('body')
const reset=document.querySelector('.reset')
buttons.forEach(function(button) {
    button.addEventListener('click' , function(e){
        if(e.target.id === 'grey'){
            body.style.backgroundColor = e.target.id;
        }
         if(e.target.id === 'red'){
            body.style.backgroundColor = e.target.id;
        }
         if(e.target.id === 'yellow'){
            body.style.backgroundColor = e.target.id;
        }
         if(e.target.id === 'pink'){
            body.style.backgroundColor = e.target.id;
        }
    })

});

reset.addEventListener('click' , function(){
    document.body.style.backgroundColor="white";
})
