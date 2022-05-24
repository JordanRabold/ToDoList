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
    addBtn.onclick = main;
    loadSavedItems();
}

function loadSavedItems(){
    let itemArray = getToDoItems(); // read from web storage

    for(let i = 0; i < itemArray.length; i++){
        let currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}

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

function main(){
    if(isValid()){
        let item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
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
    let isComplete = <HTMLInputElement>$("completed");
    newItem.isComplete = isComplete.checked;

    return newItem;
}

/**
 * 
 * @param item display given ToDo item on webpage
 */
function displayToDoItem(item:ToDoItem):void{
    // ex. <h3>Record JS Lecture</h3>
    let itemText = document.createElement("h3");
    itemText.innerText = item.title;

    // ex. <p>June 1st 2020</p>
    let itemDate = document.createElement("p");
    let dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();

    // ex. <div class="todo completed"></div> or <div class="todo"></div>
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
    let currItems = getToDoItems();
    if(currItems == null){ // No items found
        currItems = new Array();
    }
    currItems.push(item); // Add new item to the current ones

    let currItemsString = JSON.stringify(currItems); // Re-save back into list
    localStorage.setItem(todokey, currItemsString);
}

const todokey = "todo";

/**
 * Get stored ToDo Items or return null
 * if non are found
 */
function getToDoItems():ToDoItem[]{
    let itemString = localStorage.getItem(todokey);
    let item:ToDoItem[] = JSON.parse(itemString);
    return item;
}

