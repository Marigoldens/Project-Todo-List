//index.js
"use strict"

import './styles.css';
import tasklistContainer from "./taskListContainer";


const tasklistContainer1 = new tasklistContainer
const tasklist1 = tasklistContainer1.newTasklist("homework", 5)
const task1 = tasklist1.newTask("smoke", "need nicotine", 1, 3)
const task2 = tasklist1.newTask("smoke", "need nicotine", 3, 6)

tasklist1.removeTask(2)


console.log(tasklist1.showTasks())
console.log(tasklist1.countTasks())
console.log(tasklistContainer1.showTasklists())

console.log(tasklistContainer1.removeTasklist(1))

console.log(tasklistContainer1.showTasklists())
