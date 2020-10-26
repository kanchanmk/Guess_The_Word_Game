
"use strict";

let alphabets = document.querySelector(".alphabets")

for (let i = 65; i < 91; i++ ) {
    var li = document.createElement("li");
    li.innerHTML = String.fromCharCode( i );
    li.classList.add(String.fromCharCode( i ));
    li.classList.add("alphabet");
    alphabets.appendChild(li);
}

 const wordArray = ["Frisbee", "Script", "Project"];

 function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

 let random = getRandomInt(wordArray.length)
 console.log(`random: ${random}`);
 const guessWord = wordArray[random].toUpperCase();
 let tries = Math.ceil(guessWord.length/2);
 console.log(`tries: ${tries}`);
 let guessWordCodesArray =   [];
 let gWordContainer = document.querySelector(".guessWord");
 let letterList = document.createElement("ul");
 letterList.classList.add("letterListUL");

 for(let i=0; i < guessWord.length; i++){
    
    let letter = document.createElement("li");
    letter.classList.add("letter");
    let letterSpan = document.createElement("span");
    //letterSpan.classList.add("invisible");
    letterSpan.setAttribute("data-code", guessWord[i].charCodeAt(0));
    
    if(guessWordCodesArray.indexOf(guessWord[i].charCodeAt(0)) == -1){
        guessWordCodesArray.push(guessWord[i].charCodeAt(0));
    }
   
    letter.appendChild(letterSpan);
    letterList.appendChild(letter);
 }
 

 gWordContainer.appendChild(letterList);
 
// Mouse click handler
function checkMouseClick(e){
    const letterIn = e.target.innerHTML.charCodeAt(0);
    if(letterIn >= 65 && letterIn <= 90)
    {
        checkLetter(letterIn);
    }

}

 // Keyboard Key down Handler 
 function checkKeyboardInput(e) {
     console.log(e);
    const keyIn = e.keyCode;
    if(keyIn >= 65 && keyIn <= 90)
    {
        checkLetter(keyIn);
    }

 }


 function checkLetter(keyClicked) {
    let matchElements = document.querySelectorAll(`[data-code="${keyClicked}"]`);

    matchElements.forEach((item) => item.innerHTML = String.fromCharCode(keyClicked));
    
    if(guessWordCodesArray.indexOf(keyClicked) != -1){
        guessWordCodesArray.splice(guessWordCodesArray.indexOf(keyClicked),1);
    }else{
        tries--;
    }

    let letter = document.querySelector(`.${String.fromCharCode(keyClicked).toUpperCase()}`);
    // console.log(letter);
    letter.classList.add("strike");

    if(tries == 0){
        document.removeEventListener('keydown', checkLetter);
        let errorDiv = document.querySelectorAll(".error");
        errorDiv.forEach(e => e.classList.remove("invisible"));
    }
    
    if(guessWordCodesArray.length == 0){
        document.removeEventListener('keydown', checkLetter);
        let resultDiv = document.querySelectorAll(".result");
        resultDiv.forEach(e => e.classList.remove("invisible"));
    }

 }

 // mouse listener
alphabets.addEventListener('click', checkMouseClick);


// keyboard listener
document.addEventListener('keydown', checkKeyboardInput);