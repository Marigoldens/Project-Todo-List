//tasklist.js
"use strict"

import taskCreate from "./task"
import createID from "./utility"

class tasklist{
    constructor(title, priority){
        this.title = title
        this.priority = priority 
        this.tasks = []
        this.ID =  createID()
    }

    newTask(title, description, dueDate, priority){

        if (typeof title !== "string") {
            throw new Error("Title must be a string");
        }
        if (typeof description !== "string") {
            throw new Error("Description must be a string");
        }
        if (typeof dueDate !== "string") {
            throw new Error("dueDate must be a valid date");
        }
        if (typeof priority !== "number" || priority < 1 || priority > 5) {
            throw new Error("Priority must be a number between 1 and 5");
        }

        const newTask = new taskCreate(title, description, dueDate, priority)
        this.tasks.push(newTask)
        return newTask
    }
    removeTask(ID){
        for(let i = 0; i < this.tasks.length; i++){
            if(this.tasks[i].taskID === ID){
                this.tasks.splice(i, 1)
            }
        }
    }

    changeTasklistParameter(toChange, newValue){
        if (toChange === "title" && typeof newValue !== "string") {
            throw new Error("Title must be a string");
        }
        if (toChange === "description" && typeof newValue !== "string") {
            throw new Error("Description must be a string");
        }
        if (toChange === "dueDate" && (typeof newValue !== "number")) {
            throw new Error("Priority must be a valid date");
        }
        if (toChange === "priority" && (typeof newValue !== "number" || newValue < 1 || newValue > 5)) {
            throw new Error("Priority must be a number between 1 and 5");
        } 
        this[toChange] = newValue
    }

    showTasks(){
        return this.tasks
    }
    countTasks(){
        return this.tasks.length
    }
    getPrio(){
        return this.priority
    }

}

export default tasklist