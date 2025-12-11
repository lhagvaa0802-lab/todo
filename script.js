const inputBox = document.querySelector(".input-group input");
const addBtn = document.querySelector(".input-group button");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtonsAll = document.getElementById("filter-btn-all");
const filterButtonsActive = document.getElementById("filter-btn-active");
const filterButtonsCompleted = document.getElementById("filter-btn-completed");

let tasks = [];
let tasId = 1;
let totalTasks = 0;
let updatecount = 0;

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
};

const updateTask = (id) => {
  const updatedTasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, isCompleted: !task.isCompleted };
    } else {
      return task;
    }
  });
  updatecount = updatedTasks.filter((task) => task.isCompleted).length;
  tasks = updatedTasks;
  renderTasks(updatedTasks);
};

const deleteBtn = (taskId) => {
  confirm("Are you sure?");
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  tasks = updatedTasks;
  totalTasks--;
  updatecount--;
  createResultMessage();
  renderTasks(updatedTasks);
};

function allBtn() {
  filterButtonsAll.style.backgroundColor = "#3b82f6";
  filterButtonsActive.style.backgroundColor = "#f3f4f6";
  filterButtonsCompleted.style.backgroundColor = "#f3f4f6";
  filterButtonsAll.style.color = "white";
  filterButtonsActive.style.color = "black";
  filterButtonsCompleted.style.color = "black";
  renderTasks(tasks);
}
function activeBtn() {
  const activeTasks = tasks.filter((task) => !task.isCompleted);
  filterButtonsActive.style.backgroundColor = "#3b82f6";
  filterButtonsAll.style.backgroundColor = "#f3f4f6";
  filterButtonsCompleted.style.backgroundColor = "#f3f4f6";
  filterButtonsActive.style.color = "white";
  filterButtonsAll.style.color = "black";
  filterButtonsCompleted.style.color = "black";
  renderTasks(activeTasks);
}
function completedBtn() {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  filterButtonsCompleted.style.backgroundColor = "#3b82f6";
  filterButtonsAll.style.backgroundColor = "#f3f4f6";
  filterButtonsActive.style.backgroundColor = "#f3f4f6";
  filterButtonsCompleted.style.color = "white";
  filterButtonsActive.style.color = "black";
  filterButtonsAll.style.color = "black";
  totalTasks = completedTasks.filter((task) => task.isCompleted).length;

  createResultMessage();

  renderTasks(completedTasks);
}

function clearBtn() {
  confirm("Are you sure?");
  tasks = tasks.filter((task) => !task.isCompleted);
  updatecount = tasks.filter((task) => task.isCompleted).length;
  totalTasks = tasks.length;
  createResultMessage();
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
