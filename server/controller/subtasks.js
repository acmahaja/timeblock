const SubTask = require("../model/SubTask")

function createSubTasksInstances(subTasks, taskID){
    if(!subTasks)
        return

    let subTasksInstances = []

    subTasks.forEach((task)=>{

        const newSubTask = new SubTask({
            task: taskID,
            title: task,
          });
      
          subTasksInstances.push(newSubTask);
    })

    return subTasksInstances;
}


module.exports = {
    createSubTasksInstances
}