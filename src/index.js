import './scss/index.scss';

const localStorageTodoData = localStorage.getItem('todoList');
let todoData = JSON.parse(localStorageTodoData) || [];
const todoListContainer = document.querySelector('.todo-list');
const newTaskForm = document.querySelector('.todo-add');
const newTaskInput = document.querySelector('.todo-add__text-input');
const deleteFinishedTaskButton = document.querySelector('.delete-finished-task-btn');

const displayTodoList = () => {
  todoListContainer.innerHTML = '';
  todoData.map((task, index) => {
    task.editMode ? createTaskElementEditMode(task, index) : createTaskElement(task, index);
  });
};

const createTaskElement = (task, index) => {
  const liTemplate = document.querySelector('#task-template');
  const liClone = document.importNode(liTemplate.content, true);
  const toggleFinishButton = liClone.querySelector('.task__toggle-finish');
  const taskText = liClone.querySelector('.task__text');
  const editButton = liClone.querySelector('.task__edit-btn');
  const deleteButton = liClone.querySelector('.task__delete-btn');
  taskText.textContent = task.text;
  task.isFinished && toggleFinishButton.classList.add('finished');
  toggleFinishButton.addEventListener('click', () => {
    disableAllEditMode();
    toggleFinishTask(index);
  });
  editButton.addEventListener('click', () => {
    disableAllEditMode();
    toggleEditMode(index);
  });
  deleteButton.addEventListener('click', () => {
    deleteTask(index);
  });
  todoListContainer.append(liClone);
};

const createTaskElementEditMode = (task, index) => {
  const liTemplate = document.querySelector('#task-template-edit-mode');
  const liClone = document.importNode(liTemplate.content, true);
  const toggleFinishButton = liClone.querySelector('.task__toggle-finish');
  const taskInput = liClone.querySelector('.task__input');
  const saveForm = liClone.querySelector('.save-form');
  const cancelButton = liClone.querySelector('.task__cancel-btn');
  taskInput.value = task.text;
  task.isFinished && toggleFinishButton.classList.add('finished');
  toggleFinishButton.addEventListener('click', () => {
    toggleFinishTask(index);
  });
  saveForm.addEventListener('submit', (event) => {
    event.preventDefault();
    editTask(taskInput.value, index);
  });
  cancelButton.addEventListener('click', () => {
    toggleEditMode(index);
  });
  todoListContainer.append(liClone);
  taskInput.focus();
};

const createNewTask = () => {
  const newTask = {
    text: newTaskInput.value,
    isFinished: false,
    editMode: false
  };
  newTaskInput.value && todoData.unshift(newTask);
  newTaskInput.value = '';
  pushInLocalStorage();
  displayTodoList();
};

const pushInLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoData));
};

const toggleEditMode = (index) => {
  todoData[index].editMode = !todoData[index].editMode;
  pushInLocalStorage();
  displayTodoList();
};

const disableAllEditMode = () => todoData.forEach((task) => (task.editMode = false));

const editTask = (newText, index) => {
  todoData[index].text = newText;
  toggleEditMode(index);
  pushInLocalStorage();
  displayTodoList();
};

const deleteTask = (index) => {
  todoData.splice(index, 1);
  pushInLocalStorage();
  displayTodoList();
};

const toggleFinishTask = (index) => {
  todoData[index].isFinished = !todoData[index].isFinished;
  todoData[index].isFinished && todoData.push(todoData.splice(index, 1)[0]);
  pushInLocalStorage();
  displayTodoList();
};

const deleteFinishedTask = () => {
  todoData = todoData.filter((task) => !task.isFinished);
};

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createNewTask();
  newTaskInput.focus();
});

deleteFinishedTaskButton.addEventListener('click', () => {
  deleteFinishedTask();
  pushInLocalStorage();
  displayTodoList();
});

displayTodoList();
