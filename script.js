const inputBox = document.querySelector(".input-group input");
const addBtn = document.querySelector(".input-group button");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtonsAll=document.getElementById("filter-btn-all");
const filterButtonsActive=document.getElementById("filter-btn-active");
const filterButtonsCompleted=document.getElementById("filter-btn-completed");



let tasks = [];
let tasId = 1;
let totalTasks = 0;
let updatecount=0;

const add = () => {
  const taskText = inputBox.value;
  const task = {
    id: tasId,
    text: taskText,
    isCompleted: false,
  };
  tasks.push(task);
  tasId++;
  totalTasks++;
  clearText();
  clearInput();
  renderTasks(tasks);
};




const renderTasks = (taskArr) => {
  let taskItems = "";

  taskArr.forEach((task) => {
    const taskItem = createTaskItem(task);
    taskItems += taskItem;
  });

  taskList.innerHTML = taskItems;
  resultSection.innerHTML = createResultMessage();

};




const createTaskItem = (task) => {
  return `
        <div class="task-list-item">
           <div class="task-item-left">
             <input type="checkbox" id="${task.id}" ${
    task.isCompleted && "checked"
  } onchange="updateTask(${task.id})"/> 
            <p class="task-text ${task.isCompleted && "completed"}">${
    task.text
  }</p>
            </div>
            <button id="task-delete" class='delete_btn ${
              task.isCompleted && "show_delete"
            }' onclick="deleteBtn(${task.id})">Delete</button>
        </div>`;
};


const createResultMessage = () => {
  return `<p id="resultMessage"> ${updatecount} of ${totalTasks} tasks completed</p>
          <button id="clear" onclick="clearBtn()">Clear completed</button>`;
}





const updateTask = (id) => {
  const updatedTasks = tasks.map((task) => {
     
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted };
    } else {
      return task;
    }
  });
  updatecount= updatedTasks.filter((task) => task.isCompleted).length;
  tasks = updatedTasks;
  renderTasks(updatedTasks);
};




const deleteBtn = (taskId) => {
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
   tasks = updatedTasks;
   renderTasks(updatedTasks);
};

function allBtn() {
  renderTasks(tasks);
}
function activeBtn() {
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  renderTasks(activeTasks);
}
function completedBtn() {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  
 renderTasks(completedTasks);
}

function clearBtn() {

  tasks = tasks.filter((task) => !task.isCompleted);

  renderTasks(tasks);
}

    




const clearInput = () => {
  inputBox.value = "";
};
const clearText = () => {
  emptyMessage.innerHTML = "";
};


addBtn.addEventListener("click", add);
filterButtonsAll.addEventListener("click", allBtn);
filterButtonsActive.addEventListener("click", activeBtn);
filterButtonsCompleted.addEventListener("click", completedBtn);
