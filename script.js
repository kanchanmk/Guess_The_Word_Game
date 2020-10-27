"use strict";
// alphabet container
let alphabets = document.querySelector(".alphabets");
let showWordButton = document.querySelector(".showWord");

// layout the alphabets
for (let i = 65; i < 91; i++ ) {
    var li = document.createElement("li");
    li.innerHTML = String.fromCharCode( i );
    li.classList.add(String.fromCharCode( i ));
    li.classList.add("alphabet");
    alphabets.appendChild(li);
}
// list of random words
 const wordArray = ["Acoustic", "Frisbee", "Script", "Project", "Tripped", 
 "Tryout" ,"Zealous" , "Fragile" ,"Agnostic", "Guitar", "Bought", "Cradle", 
 "Dungeon", "Elephant", "Hideout", "Igneous", "Kindness", "Empathy", 
 "Jeopardy", "Liquid", "Magician", "Nation", "Orangutans","Quality", "Roaster", 
 "Sidewalk", "Umbrella", "Vigilant", "Watchful", "Xylograph","Youngest"];

 function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

 let random = getRandomInt(wordArray.length);

 //console.log(`random: ${random}`);
 const guessWord = wordArray[random].toUpperCase();
 // setting the number of tries = half of the length of the word
 let tries = Math.ceil(guessWord.length/2) + 1;
 //onsole.log(`tries: ${tries}`);
 document.querySelector(".tries").innerHTML = tries;
//  let guessWordCodesArray =   [];
 let gWordContainer = document.querySelector(".guessWord");
 let letterList = document.createElement("ul");
 letterList.classList.add("letterListUL");

let guessWordCodesMap = new Map();

 for(let i=0; i < guessWord.length; i++){
    
    let letter = document.createElement("li");
    letter.classList.add("letter");
    let letterSpan = document.createElement("span");
    letterSpan.setAttribute("data-code", i);
    letter.appendChild(letterSpan);
    letterList.appendChild(letter);

    guessWordCodesMap.set(i, guessWord[i]);
 }
 
 //console.log(guessWordCodesMap);

 gWordContainer.appendChild(letterList);

// Mouse click handler
function checkMouseClick(e){
    checkLetterInMap(e.target.innerHTML);
}

 // Keyboard Key down Handler 
 function checkKeyboardInput(e) {
    //console.log(e);
    checkLetterInMap(e.key.toUpperCase());
 }

 function checkLetterInMap(charInput){
    let isFound = false;
    console.log("checkLetterInMap ");
    for(let[index, char] of guessWordCodesMap.entries()){
        if(char === charInput){
            isFound = true;
            document.querySelector(`[data-code="${index}"]`).innerHTML = char;
            guessWordCodesMap.delete(index);
        }
    }
    let letter = document.querySelector(`.${charInput}`);
    
    letter.classList.add("strike");

    if(!isFound){ 
        tries--;
        document.querySelector(".tries").innerHTML = tries;
    }

    if(tries == 0){ // error : No tries left.
        alphabets.removeEventListener('click', checkMouseClick);
        document.removeEventListener('keydown', checkKeyboardInput);

        let errorDiv = document.querySelectorAll(".error");
        errorDiv.forEach(e => e.classList.remove("invisible"));

        let resultDiv = document.querySelectorAll(".result");
        resultDiv.forEach(d => d.remove());
        document.querySelector(".play").classList.remove("invisible");
        document.querySelector(".playAgain").addEventListener("click", playAgain);
    }
    
    if(guessWordCodesMap.size == 0){ // success
        alphabets.removeEventListener('click', checkMouseClick);
        document.removeEventListener('keydown', checkKeyboardInput);

        let resultDiv = document.querySelectorAll(".result");
        resultDiv.forEach(e => e.classList.remove("invisible"));
        document.querySelector(".triesContainer").remove();
        document.querySelector(".play").classList.remove("invisible");
        document.querySelector(".playAgain").addEventListener("click", playAgain);

    }
 }

 function showWord () {
    for(let[index, char] of guessWordCodesMap.entries()){
            document.querySelector(`[data-code="${index}"]`).innerHTML = char;
    }

 }

 function playAgain(){
     location.reload();
 }

 // mouse listener
alphabets.addEventListener('click', checkMouseClick);

// keyboard listener
document.addEventListener('keydown', checkKeyboardInput);

showWordButton.addEventListener('click', showWord);