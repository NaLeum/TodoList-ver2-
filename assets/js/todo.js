const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".toDoList");
const doneList = document.querySelector(".doneList")

const TODOS_LS = 'toDos';
const DONE_LS = 'dones'

let toDos = [];
let dones = [];


function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function doneDeleteToDo(event){
    console.log(event);
    const btn = event.target;
    const li = btn.parentNode;
    doneList.removeChild(li);
    const cleanDones = dones.filter(function(done){
        return done.id !== parseInt(li.id);
    });
    dones = cleanDones;
    saveDones();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function saveDones(){
    localStorage.setItem(DONE_LS, JSON.stringify(dones));
}

function paintToDo(text){
    const toDoLi = document.createElement("li");
    const delBtn = document.createElement("button");
    const doneBtn = document.createElement("button");
    const span = document.createElement("span");    
    const newId = toDos.length+1 ;
    span.innerText = text;
    doneBtn.innerText = "✅"
    doneBtn.addEventListener("click", paintDone);
    delBtn.innerText="❌";
    delBtn.addEventListener("click", deleteToDo);
    toDoLi.appendChild(doneBtn)
    toDoLi.appendChild(delBtn);
    toDoLi.appendChild(span);
    toDoLi.id = newId;
    toDoList.appendChild(toDoLi);
    const toDoObj={
        text: text,
        id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}
function paintDone(event){
    const doneBtn = event.target;
    // console.log(doneBtn.nextSibling.nextSibling);
    const span = doneBtn.nextSibling.nextSibling;
    const doneLi = document.createElement("li");
    const doneDelBtn = document.createElement("button");
    const doneSpan = document.createElement("span");
    const doneId = dones.length+1001;
    doneSpan.innerText = span.innerText;
    doneDelBtn.innerText = "❌";
    doneDelBtn.addEventListener("click", doneDeleteToDo);
    doneLi.appendChild(doneDelBtn);    
    doneLi.appendChild(doneSpan);
    doneLi.id = doneId;
    doneList.appendChild(doneLi);
    const doneObj={
        text : span.innerText,
        id : doneId
    };
    dones.push(doneObj);
    saveDones();
    deleteToDo(event);
}
function paintSaveDone(text){
    const doneLi = document.createElement("li");
    const doneDelBtn = document.createElement("button");
    const doneSpan = document.createElement("span");
    const doneId = dones.length+1001;
    doneSpan.innerText = text;
    doneDelBtn.innerText = "❌";
    doneDelBtn.addEventListener("click", doneDeleteToDo);
    doneLi.appendChild(doneDelBtn);    
    doneLi.appendChild(doneSpan);
    doneLi.id = doneId;
    doneList.appendChild(doneLi);
    const doneObj={
        text : text,
        id : doneId
    };
    dones.push(doneObj);
    saveDones();
}


function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function loadToDos(){
    const loadedToDos= localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        console.log(parsedToDos);
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
            console.log(toDo);
            
        });
    }
}

function loadDones(){
    const loadedDones = localStorage.getItem(DONE_LS);
    if(loadedDones != null){
        const parsedDones = JSON.parse(loadedDones);
        console.log(parsedDones);
        parsedDones.forEach(function(done){
            paintSaveDone(done.text);
            console.log(done);
            
        });
    }
}

function init(){
    loadToDos(); 
    loadDones();  
    
    toDoForm.addEventListener("submit" ,handleSubmit);
};
init();