const cell = Array.from(document.querySelectorAll('.container div'));

const statusgame = document.getElementById('statusText')
let btnhide=document.querySelector('button')
let currentPlayer='X'
let vsComputer = false;

let board = ['' , '' , '' , '' , '' , '' , '' , '' , '' , '']
// let gameActive = true
const winConditions = [[0,1,2] ,[3,4,5],[6,7,8],[0,3,6],[1,4,7],
[2,5,8] , [0,4,8] , [2,4,6]
];
btnhide.style.display="none"
cell.forEach((c)=>{
    c.addEventListener('click' , ()=>{
        btnhide.style.display="block"
        if (c.textContent !== '') return;
        if(currentPlayer==='X'){
            statusgame.innerText="PLAYER O'S TURN"
           c.innerHTML='X';
           currentPlayer='O';
        }
        else{
            statusgame.innerText="PLAYER X'S TURN"
            c.innerHTML='O'
            currentPlayer='X'
        }
       checkWinner()

    })
})
const disableGame = function(){
    for(let c of cell){
        
        c.classList.add('disabled');
    }
}
const enableGame=function(){
    for(let c of cell){
        c.classList.remove('disabled');
        c.innerText="";
    }
    
}
const resetGame = function(){
 currentPlayer='X'
 enableGame()
 btnhide.style.display="none"
 statusgame.innerText="PLAYER X'S TURN";
}
const checkWinner = function(){
    for(let conds of winConditions){
        let pattern1=cell[conds[0]].textContent
        let pattern2=cell[conds[1]].textContent
        let pattern3=cell[conds[2]].textContent

         if(pattern1!='' && pattern2!='' && pattern3!=''){
        if(pattern1===pattern2 && pattern2===pattern3){
            disableGame();
            statusgame.innerText=`${pattern1} WIN THE GAME`
            console.log(`${pattern1} WIN THE GAME`)
        }

    }
   
    }
     let allFilled = cell.every(c => c.textContent !== '');
    if (allFilled) {
        statusgame.innerText = "IT'S A DRAW!";
        disableGame();
        console.log("Draw Game");
    }
}


btnhide.addEventListener("click" , resetGame);
