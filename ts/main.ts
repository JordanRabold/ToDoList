// @ts-ignore: Ignoring issue with js-datepicker intellisense
const picker = datepicker("#due-date");
picker.setMin(new Date()); // set to todays date

class ToDoItem{ // creating todo list class
    title:string;
    dueDate:Date;
    isComplete:Boolean;
}

window.onload = function(){
    let addBtn = $("add");
    addBtn.onclick = addToDoItem;
    loadSavedItem();
}

function loadSavedItem(){
    let item = getToDo(); // read from web storage
    displayToDoItem(item);
}

/**
 * check form validation
 */
function isValid():boolean{
    let isDataValid = true;

    let titleBox:HTMLInputElement = <HTMLInputElement>$("title");
    let enteredTitle:string = titleBox.value;
    if(enteredTitle == ""){
        isDataValid = false;
        let errMsg = $("title-err");
        errMsg.innerText = "Must enter a title";
    }
    return isDataValid;
}

function addToDoItem(){
    if(isValid()){
        let toDoItem = getToDoItem();
        displayToDoItem(toDoItem);
        saveToDo(toDoItem);
    }
}

/**
 * Get information off of form 
 * and put in a ToDo item object
 */
function getToDoItem():ToDoItem{
    let newItem = new ToDoItem();

    // get title
    let titleInput = <HTMLInputElement>$("title");
    newItem.title = titleInput.value;

    // get due date
    let dueDateInput = <HTMLInputElement>$("due-date");
    newItem.dueDate = new Date(dueDateInput.value);

    // get isCompleted
    let isComplete = <HTMLInputElement>$("is-complete");
    newItem.isComplete = isComplete.checked;

    return newItem;
}

/**
 * 
 * @param item display given ToDo item on webpage
 */
function displayToDoItem(item:ToDoItem):void{
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    let itemDate = document.createElement("p");
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    let itemDiv = document.createElement("div");

    itemDiv.onclick = markAsComplete;

    itemDiv.classList.add("todo");
    if(item.isComplete){
        itemDiv.classList.add("completed");
    }

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);

    if(item.isComplete){
        let completeToDo = $("display-complete");
        completeToDo.appendChild(itemDiv);
    }
    else{
        let incompleteToDo = $("display-incomplete");
        incompleteToDo.appendChild(itemDiv);
    }
}

function markAsComplete(){
    
    let itemDiv = <HTMLElement>this;
    itemDiv.classList.add("completed");

    let completeItems = $("display-complete");
    completeItems.appendChild(itemDiv);
}

function $(id:string){
    return document.getElementById(id);
}


function saveToDo(item:ToDoItem):void{
    // Convert ToDoItem into JSON string
    let itemString = JSON.stringify(item);

    // Save string
    localStorage.setItem("todokey", itemString);
}

const todokey = "todo";

/**
 * Get stored ToDoItem or return null
 * if non is found
 */
function getToDo():ToDoItem{
    let itemString = localStorage.getItem("todokey");
    let item:ToDoItem = JSON.parse(itemString);
    return item;
}
