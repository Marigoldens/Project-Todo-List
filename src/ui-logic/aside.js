//aside.js
"use strict"

import tasklistContainer from "./../taskListContainer";

const submitBtn = document.querySelector("#submitBtn")
const ASIDETASKS = document.querySelector("#ASIDETASKS")
const mainContainer = document.querySelector("#MAIN")
const SubmitTask = document.querySelector("#SubmitTask")
let currentTasklist = null

export const tasklistsContainerOne = new tasklistContainer();
export function setCurrentTasklist(tasklist) {
    currentTasklist = tasklist;
}
function renderAllTasks() {
    if (!currentTasklist) return; 
    mainContainer.textContent = "";

    currentTasklist.tasks.forEach(task => {
        const taskContainer = document.createElement("div");
        taskContainer.setAttribute("class", "taskContainerCard");
        
        const taskCard = document.createElement("div");
        taskCard.style.backgroundColor = `hsl(208, 100%, ${task.getPrio()*20}%)`
        const deletTaskBtn = document.createElement("button")
        deletTaskBtn.textContent = "X"
        deletTaskBtn.addEventListener("click", () => {
            mainContainer.removeChild(taskContainer)
            currentTasklist.removeTask(task.taskID)
            saveToStorage(); 
            renderAllTasks()
        })
        const titleCard = document.createElement("h2");
        titleCard.textContent = task.title;
        const description = document.createElement("p");
        description.textContent = task.description;
        const dueDate = document.createElement("p");
        dueDate.textContent = task.dueDate;
        const check = document.createElement("button");
        check.setAttribute("class", "done")
        task.readDone() ? check.style.backgroundColor = "hsl(161, 100%, 50%)" : check.style.backgroundColor = "hsl(334, 63%, 74%)"
        check.addEventListener("click", () => {
            task.changeStatus()
            task.readDone() ? check.style.backgroundColor = "hsl(161, 100%, 50%)" : check.style.backgroundColor = "hsl(334, 63%, 74%)"
        })

        taskCard.appendChild(titleCard);
        taskCard.appendChild(description);
        taskCard.appendChild(dueDate);
        taskCard.appendChild(check);
        taskCard.appendChild(deletTaskBtn)
        taskContainer.appendChild(taskCard);
        mainContainer.appendChild(taskContainer);
    });
}


function displayTasks() {
    ASIDETASKS.textContent = "";
    tasklistsContainerOne.taskLists.forEach(tasklist => {
        const tasklistContainer = document.createElement("div");
        const titleCard = document.createElement("button");
        titleCard.style.backgroundColor = `hsl(195, 53%, ${tasklist.getPrio()*20}%)`
        titleCard.setAttribute("class", "titleCardBtn");
        titleCard.textContent = tasklist.title;
        tasklistContainer.appendChild(titleCard);
        ASIDETASKS.appendChild(tasklistContainer);
        titleCard.addEventListener("click", () => {
            setCurrentTasklist(tasklist)
            renderAllTasks();
        });
    });
}

function displayCurrentTasks() {
    renderAllTasks(); // Just call the central rendering function
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
        saveToStorage();
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
function addTasklistUI(){
    submitBtn.addEventListener("click", (event) => {

        const tasklistTitle = document.querySelector("#tasklistTitle").value
        const tasklistPriority = parseInt(document.querySelector("#tasklistPriority").value)

        event.preventDefault();
        if(!tasklistTitle || !tasklistPriority) { // <--- Your custom validation is missing here
            alert("Please fill in all required fields!");
            return;}
        tasklistsContainerOne.newTasklist(tasklistTitle, tasklistPriority)
        saveToStorage();

            document.querySelector("#tasklistTitle").value = '';
            document.querySelector("#tasklistPriority").value = '';

    displayTasks()
    })
}




// LOCAL STROAGE NONSENSE FROM AI 
function saveToStorage() {
    const data = {
        taskLists: tasklistsContainerOne.taskLists,
        currentTasklistIndex: currentTasklist ? 
            tasklistsContainerOne.taskLists.indexOf(currentTasklist) : -1
    };
    localStorage.setItem('todoAppData', JSON.stringify(data));
}
// Load and reconstruct data from localStorage
function loadFromStorage() {
    const savedData = localStorage.getItem('todoAppData');
    if (!savedData) return false; // No saved data
    
    const data = JSON.parse(savedData);
    
    // Clear existing data
    tasklistsContainerOne.taskLists = [];
    
    // Reconstruct each tasklist with proper methods
    data.taskLists.forEach(savedTasklist => {
        const newTasklist = tasklistsContainerOne.newTasklist(
            savedTasklist.title, 
            savedTasklist.priority
        );
        
        // Reconstruct each task with proper methods
        savedTasklist.tasks.forEach(savedTask => {
            const newTask = newTasklist.newTask(
                savedTask.title,
                savedTask.description,
                savedTask.dueDate,
                savedTask.priority
            );
            newTask.done = savedTask.done; // Restore completion status
        });
    });
    
    // Restore current tasklist
    if (data.currentTasklistIndex >= 0) {
        setCurrentTasklist(tasklistsContainerOne.taskLists[data.currentTasklistIndex]);
    }
    
    return true; // Successfully loaded
}



export {addTasklistUI, displayTasks, addTask, displayCurrentTasks, saveToStorage, loadFromStorage};