//aside.js
"use strict"

import tasklistContainer from "./../taskListContainer";

const submitBtn = document.querySelector("#submitBtn")
const ASIDETASKS = document.querySelector("#ASIDETASKS")
const mainContainer = document.querySelector("#MAIN")
const SubmitTask = document.querySelector("#SubmitTask")
let currentTasklist = null


const tasklistsContainerOne = new tasklistContainer 
const defaultTasklist = tasklistsContainerOne.newTasklist("My Tasks", 3)


function makeDefaultTasklist(){
    currentTasklist = defaultTasklist // Set it as current
    displayTasks() // Show the default tasklist in aside
    defaultTasklist.newTask("Welcome!", "This is your first task", "214234", 1)
    displayCurrentTasks() // Show the welcome task in main
}



function displayTasks(){
    ASIDETASKS.textContent = ""
    tasklistsContainerOne.taskLists.forEach(tasklist => {
        //CONTAINER FOR TASKLIST
        const tasklistContainer = document.createElement("div")
        const titleCard = document.createElement("button")
            titleCard.setAttribute("class", "titleCardBtn")
        titleCard.textContent = tasklist.title
        tasklistContainer.appendChild(titleCard)
        //ADD TO DOM
        ASIDETASKS.appendChild(tasklistContainer)

        //HANDLING THE INDIVUDAL TASKS
        titleCard.addEventListener("click", () => {
            currentTasklist = tasklist
            console.log(currentTasklist)
            mainContainer.textContent = ""
            tasklist.tasks.forEach(task => {
                const taskContainer = document.createElement("div")
                 taskContainer.setAttribute("class", "taskContainerCard")
                const taskCard = document.createElement("div")
                const titleCard = document.createElement("h2")
                    titleCard.textContent = task.title
                const description = document.createElement("p")
                    description.textContent = task.description
                const dueDate = document.createElement("p")
                    dueDate.textContent = task.dueDate
                const check = document.createElement("button")
                //APPENDING
                    taskCard.appendChild(titleCard)
                    taskCard.appendChild(description)
                    taskCard.appendChild(dueDate)
                    taskCard.appendChild(check)        
                    taskContainer.appendChild(taskCard)        
                mainContainer.appendChild(taskContainer)
            });
        })
    });
}

function addTask(){
    SubmitTask.addEventListener("click", (event) => {
        const taskTitle = document.querySelector("#taskTitle").value
        const taskDescription = document.querySelector("#taskDescription").value
        const taskDuedate = document.querySelector("#taskDuedate").value
        const taskPriority = parseInt(document.querySelector("#taskPriority").value)

        event.preventDefault();
        if(currentTasklist) { 
            currentTasklist.newTask(taskTitle, taskDescription, taskDuedate, taskPriority)
        }
            document.querySelector("#taskTitle").value = '';
            document.querySelector("#taskDescription").value = '';
            document.querySelector("#taskDuedate").value = '';
            document.querySelector("#taskPriority").value = '';
        if(!taskTitle || !taskDuedate || !taskPriority) {
        alert("Please fill in all required fields!");
        return;
    }
        displayCurrentTasks()
        })
    }
function displayCurrentTasks(){
    if(!currentTasklist) return;
    mainContainer.textContent = ""
    currentTasklist.tasks.forEach(task => {
        const taskContainer = document.createElement("div")
        taskContainer.setAttribute("class", "taskContainerCard")
        const titleCard = document.createElement("h2")
        titleCard.textContent = task.title
        const description = document.createElement("p")
        description.textContent = task.description
        const dueDate = document.createElement("p")
        dueDate.textContent = task.dueDate
        const check = document.createElement("button")
        
        taskContainer.appendChild(titleCard)
        taskContainer.appendChild(description)
        taskContainer.appendChild(dueDate)
        taskContainer.appendChild(check)                
        mainContainer.appendChild(taskContainer)
    })
}       




function addTasklistUI(){
    submitBtn.addEventListener("click", (event) => {

        const tasklistTitle = document.querySelector("#tasklistTitle").value
        const tasklistPriority = parseInt(document.querySelector("#tasklistPriority").value)

        event.preventDefault();
        if(!tasklistTitle || !tasklistPriority) { // <--- Your custom validation is missing here
            alert("Please fill in all required fields!");
            return;}
        tasklistsContainerOne.newTasklist(tasklistTitle, tasklistPriority)
        console.log(tasklistsContainerOne.showTasklists())

            document.querySelector("#tasklistTitle").value = '';
            document.querySelector("#tasklistPriority").value = '';

    displayTasks()
    })
}




export {addTasklistUI, displayTasks, addTask, displayCurrentTasks, makeDefaultTasklist}
