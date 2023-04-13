// ;
'use strict';

// creating selecting elements

const formEl = document.getElementById('form');
const titleEl = document.getElementById('title-todo');
const quantityEl = document.getElementById('quantity');

const btnForm = document.getElementById('btn-form');

const outputEl = document.getElementById('todo-list');
// console.log(outputEl);

// global variables
let tasks = [];
let isEditing = false;
let editId = null;
btnForm.innerText = `submit`;
// functions
function init() {
  isEditing = false;
  editId = null;
  btnForm.innerText = `submit`;
}

// displayUi
function displayUi() {
  outputEl.innerHTML = null;

  // display the output
  tasks.forEach((task) => {
    // creating list elements
    const listEl = document.createElement('li');
    // console.log(listEl);

    // adding classlist
    listEl.classList.add('select-items');

    // innerHtml
    listEl.innerHTML = `${task.taskName}- ${task.taskItem} <div> <button onclick=updateItem(${task.id})><i class="fa-solid fa-pen-to-square"></i></button></div><button onclick=deleteItem(${task.id})><i class="fa-solid fa-trash"></i></button>`;

    // append child
    outputEl.appendChild(listEl);
  });
}

// deleteItem
function deleteItem(id) {
  // console.log(id);
  tasks = tasks.filter((task) => task.id !== id);
  displayUi();
}
// update item
function updateItem(id) {
  isEditing = true;
  btnForm.innerText = `update`;
  const itemToEdit = tasks.find((task) => task.id === id);
  console.log(itemToEdit);

  titleEl.value = itemToEdit.taskName;
  quantityEl.value = itemToEdit.taskItem;
  editId = itemToEdit.id;
}

// Eventlistener

formEl.addEventListener('submit', function (e) {
  e.preventDefault();
  // console.log(`hiii`);

  const title = titleEl.value;
  const quantity = quantityEl.value;

  // update the form
  if (isEditing) {
    tasks = tasks.map((task) => {
      if (task.id === editId) {
        return {
          id: editId,
          taskName: title,
          taskItem: quantity,
        };
      } else {
        return task;
      }
    });

    init();
  }
  // submit the form
  else {
    // console.log(title, quantity);

    // create a object
    const task = {
      id: Date.now(),
      taskName: title,
      taskItem: quantity,
    };
    // console.log(task);

    // add the object to array

    tasks.push(task);
    // console.log(tasks);
  }

  // displayUi
  displayUi();

  // cleaning the value
  titleEl.value = null;
  quantityEl.value = null;
});
