var picker = datepicker("#due-date");
picker.setMin(new Date());
var ToDoItem = (function () {
    function ToDoItem() {
    }
    return ToDoItem;
}());
window.onload = function () {
    var addBtn = $("add");
    addBtn.onclick = addToDoItem;
};
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
function addToDoItem() {
    if (isValid()) {
        var toDoItem = getToDoItem();
        displayToDoItem(toDoItem);
    }
}
function getToDoItem() {
    var newItem = new ToDoItem();
    var titleInput = $("title");
    newItem.title = titleInput.value;
    var dueDateInput = $("due-date");
    newItem.dueDate = new Date(dueDateInput.value);
    var isComplete = $("is-complete");
    newItem.isComplete = isComplete.checked;
    return newItem;
}
function displayToDoItem(item) {
    var itemText = document.createElement("h3");
    itemText.innerText = item.title;
    var itemDate = document.createElement("p");
    itemDate.innerText = item.dueDate.toDateString();
    var itemDiv = document.createElement("div");
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
function $(id) {
    return document.getElementById(id);
}
