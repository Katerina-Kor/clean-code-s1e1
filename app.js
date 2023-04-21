//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementsByTagName("button")[0];//first button
var incompleteTaskHolder=document.getElementById("incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    //input (checkbox)
    var checkBox=document.createElement("input");//checkbx
    //label
    var label=document.createElement("label");//label
    var text=document.createElement("p");
    //input (text)
    var editInput=document.createElement("input");//text
    //button.edit
    var editButton=document.createElement("button");//edit button

    //button.delete
    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

    text.innerText=taskString;

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.

    deleteButtonImg.src='./remove.svg';
    deleteButton.appendChild(deleteButtonImg);

    listItem.classList.add("list__item");
    listItem.classList.add("list__item_border-bottom");
    checkBox.classList.add("input");
    checkBox.classList.add("label__input-checkbox");
    text.classList.add("label__text")
    label.classList.add("label");
    editInput.classList.add("input");
    editInput.classList.add("input-text");
    editInput.classList.add("input-text_hidden");
    editButton.classList.add("button");
    editButton.classList.add("edit-button");
    deleteButton.classList.add("button");
    deleteButton.classList.add("delete-button");
    deleteButtonImg.classList.add("delete-button__image");
    deleteButtonImg.alt="Remove";



    //and appending.
    label.appendChild(checkBox);
    label.appendChild(text);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('.input-text');
    var label=listItem.querySelector(".label");
    var text=listItem.querySelector(".label__text");
    var editBtn=listItem.querySelector(".edit-button");
    var containsClass=label.classList.contains("label_text-hidden");
    //If class of the parent is .edit-mode
    if(containsClass){

        //switch to .edit-mode
        //label becomes the inputs value.
        text.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=text.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    label.classList.toggle("label_text-hidden");
    editInput.classList.toggle("input-text_hidden");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var label=this.parentNode;
    var listItem=label.parentNode;
    var text=label.querySelector(".label__text");
    text.classList.add("label__text_decor_crossed-out");
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var label=this.parentNode;
    var listItem=label.parentNode;
    var text=label.querySelector(".label__text");
    text.classList.remove("label__text_decor_crossed-out");
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".label__input-checkbox");
    var editButton=taskListItem.querySelector(".edit-button");
    var deleteButton=taskListItem.querySelector(".delete-button");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.