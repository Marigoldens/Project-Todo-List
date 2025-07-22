//index.js
"use strict"

import './styles.css';
import {addTasklistUI, addTask} from './ui-logic/aside'; // Corrected path
import makeDefaultTasklist from './ui-logic/defaultTaskList'; // Corrected path and singular name



addTasklistUI()
addTask()
makeDefaultTasklist()