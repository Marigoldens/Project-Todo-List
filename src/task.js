//task.js
"use strict"

import createID from "./utility"


class taskCreate {
    constructor(title, description, dueDate, priority){
        this.title = title
        this.description = description
        this.dueDate = dueDate
        this.priority = priority
        this.taskID = createID()
        this.done = false
    }  
    
    changeTaskParameter(toChange, newValue){
        if (toChange === "title" && typeof newValue !== "string") {
            throw new Error("Title must be a string");
        }
        if (toChange === "description" && typeof newValue !== "string") {
            throw new Error("Description must be a string");
        }
        if (toChange === "dueDate" && (typeof newValue !== "string")) {
            throw new Error("Priority must be a valid date");
        }
        if (toChange === "priority" && (typeof newValue !== "number" || newValue < 1 || newValue > 5)) {
            throw new Error("Priority must be a number between 1 and 5");
        } 
        this[toChange] = newValue
    }

    changeStatus(){
        this.done = !this.done
        return this.done
    }
    readDone(){
        return this.done
    }
    getPrio(){
        return this.priority
    }
}



export default taskCreate


