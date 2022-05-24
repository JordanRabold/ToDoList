var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addBtn = $("add");
    addBtn.onclick = main;
    loadSavedItems();
};
function loadSavedItems() {
    var itemArray = getToDoItems();
    for (var i = 0; i < itemArray.length; i++) {
        var currItem = itemArray[i];
        displayToDoItem(currItem);
    }
}
function isValid() {
    var isDataValid = true;
    var titleBox = $("title");
    var enteredTitle = titleBox.value;
    if (enteredTitle == "") {
        isDataValid = false;
        var errMsg = $("title-err");
        errMsg.innerText = "Must enter a title";
    }
    return isDataValid;
}
function main() {
    if (isValid()) {
        var item = getToDoItem();
        displayToDoItem(item);
        saveToDo(item);
    }
}
function getToDoItem() {
    var newItem = new ToDoItem();
    var titleInput = $("title");
    newItem.title = titleInput.value;
    var dueDateInput = $("due-date");
    newItem.dueDate = new Date(dueDateInput.value);
    var isComplete = $("completed");
    newItem.isComplete = isComplete.checked;
    return newItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    var dueDate = new Date(item.dueDate.toString());
    itemDate.innerText = dueDate.toDateString();
    var itemDiv = document.createElement("div");
    itemDiv.onclick = markAsComplete;
    itemDiv.classList.add("todo");
    if (item.isComplete) {
        itemDiv.classList.add("completed");
    }
    itemDiv.appendChild(itemText);
    itemDiv.appendChild(itemDate);
    if (item.isComplete) {
        var completeToDo = $("display-complete");
        completeToDo.appendChild(itemDiv);
    }
    else {
        var incompleteToDo = $("display-incomplete");
        incompleteToDo.appendChild(itemDiv);
    }
}
function markAsComplete() {
    var itemDiv = this;
    itemDiv.classList.add("completed");
    var completeItems = $("display-complete");
    completeItems.appendChild(itemDiv);
}
function $(id) {
    return document.getElementById(id);
}
function saveToDo(item) {
    var currItems = getToDoItems();
    if (currItems == null) {
        currItems = new Array();
    }
    currItems.push(item);
    var currItemsString = JSON.stringify(currItems);
    localStorage.setItem(todokey, currItemsString);
}
var todokey = "todo";
function getToDoItems() {
    var itemString = localStorage.getItem(todokey);
    var item = JSON.parse(itemString);
    return item;
}
