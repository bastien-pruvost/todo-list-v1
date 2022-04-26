import './scss/index.scss';

const localStorageTodoData = localStorage.getItem('todoList');
const todoData = JSON.parse(localStorageTodoData) || [];
const todoListContainer = document.querySelector('.todo-list');
const newTaskForm = document.querySelector('.todo-add');
const newTaskInput = document.querySelector('.todo-add__text-input');

const displayTodoList = () => {
  todoListContainer.innerHTML = '';
  todoData.map((task, index) => {
    task.editMode ? createTaskElementEditMode(task, index) : createTaskElement(task, index);
  });
};

const createTaskElement = (task, index) => {
  const liTemplate = document.querySelector('#task-template');
  const liClone = document.importNode(liTemplate.content, true);
  const toggleFinish = liClone.querySelector('.task__toggle-finish');
  const taskText = liClone.querySelector('.task__text');
  const editButton = liClone.querySelector('.task__edit-btn');
  const deleteButton = liClone.querySelector('.task__delete-btn');
  taskText.textContent = task.text;
  task.isFinished && toggleFinish.classList.add('finished');
  editButton.addEventListener('click', () => {
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
  const toggleFinish = liClone.querySelector('.task__toggle-finish');
  const taskInput = liClone.querySelector('.task__input');
  const saveButton = liClone.querySelector('.task__save-btn');
  const cancelButton = liClone.querySelector('.task__cancel-btn');
  taskInput.value = task.text;
  task.isFinished && toggleFinish.classList.add('finished');
  saveButton.addEventListener('click', () => {
    editTask(newText, index);
  });
  cancelButton.addEventListener('click', () => {
    toggleEditMode(index);
  });
  todoListContainer.append(liClone);
};

const createNewTask = () => {
  const newTask = {
    text: newTaskInput.value,
    isFinished: false,
    editMode: false
  };
  newTaskInput.value && todoData.push(newTask);
  newTaskInput.value = '';
  displayTodoList();
  pushInLocalStorage();
};

const toggleEditMode = (index) => {
  todoData[index].editMode = !todoData[index].editMode;
  displayTodoList();
  pushInLocalStorage();
};

const deleteTask = (index) => {
  todoData.splice(index, 1);
  displayTodoList();
  pushInLocalStorage();
};

const pushInLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoData));
};

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createNewTask();
  newTaskInput.focus();
});

displayTodoList();
