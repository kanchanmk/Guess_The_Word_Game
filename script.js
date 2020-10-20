"use strict";

 const wordArray = ["Frisbee", "Script", "Project"];

 let random = Math.floor(Math.random()*(wordArray.length-1));
 const guessWord = wordArray[random].toUpperCase();

 let gWordContainer = document.querySelector(".guessWord");
 let letterList = document.createElement("ul");
 letterList.classList.add("letterListUL");

 for(let i=0; i < guessWord.length; i++){
    let letter = document.createElement("li");
    letter.classList.add("letter");
    let letterSpan = document.createElement("span");
    letterSpan.classList.add("invisible");
    letterSpan.setAttribute("id", i);
    letterSpan.innerHTML = guessWord[i];
    letter.appendChild(letterSpan);
    letterList.appendChild(letter);
 }
 

 gWordContainer.appendChild(letterList)
 
 console.log(gWordContainer.innerHTML);

// event listener
// gWordContainer.addEventListener()

let guessLetters = guessWord.split("");
console.log(guessLetters);

document.addEventListener('keydown', checkLetter);

 function checkLetter(e) {
    const keyClicked = e.code;
    const letterClicked = keyClicked[keyClicked.length-1].toUpperCase();

   console.log(e.code + "= " + letterClicked);
   let lIndex = guessWord.indexOf(letterClicked);
   if( lIndex != -1)
   {
       while (lIndex != -1){
            let foundLetter = document.getElementById(lIndex);
            console.log(foundLetter);
            foundLetter.classList.remove("invisible");
            lIndex = guessWord.indexOf(letterClicked, lIndex +1);
       }
   }
   else{
       console.log("incorrect letter");
   }
 }