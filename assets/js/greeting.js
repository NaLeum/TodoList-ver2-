const form = document.querySelector(".greetingForm");
const input = form.querySelector("input");
const greeting = document.querySelector(".greeting");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";






function askForName(){
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit",handleSubmit);
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function saveName(text){
    localStorage.setItem(USER_LS, text);
}

function paintGreeting(text){
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}!`;
}



function loadName(){
    const currentuser = localStorage.getItem(USER_LS);
    if(currentuser === null){
        askForName();
    }else{
        paintGreeting(currentuser);
    }
}



function init(){
    loadName();
}

init();