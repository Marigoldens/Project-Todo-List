//defaultTaskList.js
"use strict"

import { displayTasks, displayCurrentTasks, tasklistsContainerOne, setCurrentTasklist, saveToStorage, loadFromStorage } from './aside';

function makeDefaultTasklist(){
    // Try to load saved data first
    const hasLoadedData = loadFromStorage();
    
    if (!hasLoadedData) {
        // Only create default if no saved data exists
        const defaultTasklist = tasklistsContainerOne.newTasklist("My Tasks", 3);
        setCurrentTasklist(defaultTasklist);
        defaultTasklist.newTask("Welcome!", "This is your first task", "Some Date", 4);
        saveToStorage(); // Save the default data
    }
    
    displayTasks();
    displayCurrentTasks();
}

export default makeDefaultTasklist; // Make sure this line is there!