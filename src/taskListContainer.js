//taskListContainer.js
"use strict"
import tasklist from "./tasklist"

class taskListContainer{
    constructor(){
        this.taskLists = []
    }

    newTasklist(title, priority){
        if (typeof title !== "string") {
            throw new Error("Title must be a string");
        }
        if (typeof priority !== "number" || priority < 1 || priority > 5) {
            throw new Error("Priority must be a number between 1 and 5");
        }        
        const newTasklist = new tasklist(title, priority)
        this.taskLists.push(newTasklist)
        return newTasklist
    }
    removeTasklist(ID){
        for(let i = 0; i < this.taskLists.length; i++){
            if(this.taskLists[i].ID === ID){
                this.taskLists.splice(i, 1)
            }
        }
    }
    showTasklists(){
        return this.taskLists
    }
}


export default taskListContainer