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

    // Convert to JSON String
    let toDoString = JSON.stringify(ToDoItem);
    console.log(toDoString);

    // Put the JSON string version of ToDoItem in localStorage
    localStorage.setItem("toDoObject", toDoString);

    // Read out of localStorage then parse into a studentObject
    let toDoResult = localStorage.getItem("toDoObject");
    let myToDo:ToDoItem = JSON.parse(toDoResult);
    console.log("Reading: " + myToDo.title + myToDo.dueDate + myToDo.isComplete);

    // Reading from localStorage
    let data = localStorage.getItem("ToDoItem");
    console.log(data);
}
/*
let item = new ToDoItem();
item.title = "Testing";
item.dueDate = new Date(2022, 5, 15);
item.isComplete = false;
*/

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
    itemDate.innerText = item.dueDate.toDateString();

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

// Task: Store ToDoItems in web storage

function $(id:string){
    return document.getElementById(id);
}