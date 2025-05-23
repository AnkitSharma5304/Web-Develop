let randomNumber = parseInt(Math.random() * 100 + 1);
let attempts = 0;

const guessInput = document.querySelector(".guess-input");
const guessBtn = document.querySelector(".guess-check");
const remarks = document.querySelector("#remarks");
const attemptDisplay = document.querySelector("#attempts");
const resetBtn = document.querySelector(".reset");

resetBtn.style.display = "none";

guessInput.addEventListener("keypress" , function(e){
   if(e.key=="Enter"){
      guessBtn.click();
   }
})
guessBtn.addEventListener("click", function () {
  const guess = Number(guessInput.value);
  if (!guess || guess < 1 || guess > 100) {
    showRemark("Please enter a number between 1 and 100", "remark-hint");
    return;
  }

  attempts++;
  attemptDisplay.textContent = `Attempts : ${attempts}`;

  if (guess === randomNumber) {
    showRemark("🎉 You guessed it right!", "remark-win");
  
    guessBtn.disabled = true;
    resetBtn.style.display = "inline";
  } else if (attempts >= 11) {
    showRemark("❌ Sorry, you lost!", "remark-lose");
   
    guessBtn.disabled = true;
    resetBtn.style.display = "inline";
  } else if (guess > randomNumber) {
    showRemark("📉 Number is too high", "remark-hint");
    applyShake();

  } else {
    showRemark("📈 Number is too low", "remark-hint");
    applyShake();
   
  }

  guessInput.value = "";
  guessInput.focus();
});

resetBtn.addEventListener("click", function () {
  randomNumber = parseInt(Math.random() * 100 + 1);
  attempts = 0;
  attemptDisplay.textContent = "Attempts : 0";
  guessBtn.disabled = false;
  guessInput.value = "";
  remarks.textContent = "";
  remarks.className = "";
  resetBtn.style.display = "none";
  guessInput.focus();
});

function showRemark(message, className) {
  remarks.textContent = message;
  remarks.className = ""; // remove old styles
  remarks.classList.add(className, "fade-in");
}

function applyShake() {
  remarks.classList.remove("shake"); 
  void remarks.offsetWidth; 
  remarks.classList.add("shake");
}
