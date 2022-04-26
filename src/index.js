import './scss/index.scss';

const localStorageTodoData = localStorage.getItem('todoList');
const todoData = JSON.parse(localStorageTodoData) || [];
const todoListContainer = document.querySelector('.todo-list');
const newTaskForm = document.querySelector('.todo-add');

const displayTodoList = () => {
  todoListContainer.innerHTML = '';
  todoData.map((task, index) => {
    createTaskElement(task, index);
  });
};

const createTaskElement = (task, index) => {
  const liTemplate = document.querySelector('#task-template');
  const liClone = document.importNode(liTemplate.content, true);
  const toggleFinish = liClone.querySelector('.task__toggle-finish');
  const deleteButton = liClone.querySelector('.task__delete-btn');

  liClone.querySelector('.task__text').textContent = task.text;
  task.isFinished && toggleFinish.classList.add('finished');

  todoListContainer.append(liClone);
};

const createNewTask = () => {
  const newTaskInput = document.querySelector('.todo-add__text-input');
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

const pushInLocalStorage = () => {
  localStorage.setItem('todoList', JSON.stringify(todoData));
};

newTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  createNewTask();
});

displayTodoList();
