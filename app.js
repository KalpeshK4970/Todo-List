// Selectors
const todoInput = document.querySelector(".todo-input") ;
const todoButtton = document.querySelector(".todo-button") ;
const todoList = document.querySelector(".todo-list") ;
const filterOption = document.querySelector(".filter-todo") ;

// EventListeners
todoButtton.addEventListener("click" , addTodo) ;
todoList.addEventListener("click" , deleteCheck) ;
filterOption.addEventListener("click",filterTodo) ;
document.addEventListener("DOMContentLoaded",getTodos) ;


// Functions

function addTodo(event) {
    // prevent form from submitting
    event.preventDefault() ;

    // Todo Div
const todoDiv = document.createElement("div") ;
todoDiv.classList.add("todo") ;
    
   // Create LI
   const newTodo = document.createElement("li") ;
   newTodo.innerText = todoInput.value ;
    //Add todo to local storage
    saveLocalTodos(todoInput.value);
   newTodo.classList.add("todo-item") ;
   todoDiv.appendChild(newTodo) ;

  
    // clear Todo Input value 
      todoInput.value = "" ;

    //Check Mark Button
    const completeButton = document.createElement("button") ;
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn") ;
    todoDiv.appendChild(completeButton) ;

    // Check Trash Button
    const TrashButton = document.createElement("button") ;
    TrashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    TrashButton.classList.add("trash-btn") ;
    todoDiv.appendChild(TrashButton) ;

    // Append to List
    todoList.appendChild(todoDiv);

 
}



function deleteCheck(e){
const item = e.target ;

// DELETE TODO
if (item.classList[0] === "trash-btn") {
const todo = item.parentElement ;
// Animation 
todo.classList.add("fall") ;
removeLocalTodos(todo) ;
todo.addEventListener("transitionend", e => {
    todo.remove();
  });

}


// Check Mark 
if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement ;
    todo.classList.toggle('completed') ;
}
}


function filterTodo(e) {
    const todos = document.querySelectorAll(".todo")
    todos.forEach(function(todo) {
      switch (e.target.value) {
        case "all":
          todo.style.display = 'flex';
          break;
        case "completed":
          if (todo.classList.contains('completed')) {
            todo.style.display = 'flex';
          } else {
            todo.style.display = 'none';
          }
          break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          } else {
            todo.style.display = "none";
          }
      }
    })
  }



  function saveLocalTodos(todo) {
    // check - if i already have thing in there
    let todos ;
    if(localStorage.getItem('todos') === null) {
        todos = [] ;

    }else{
        todos = JSON.parse(localStorage.getItem('todos')) ;
    }
    todos.push(todo) ;
    localStorage.setItem("todos" , JSON.stringify(todos)) ;
  }

  function getTodos() {
    let todos ;
    if(localStorage.getItem('todos') === null) {
        todos = [] ;

    }else{
        todos = JSON.parse(localStorage.getItem('todos')) ;
    }

    todos.forEach(function(todo){
          // Todo Div
const todoDiv = document.createElement("div") ;
todoDiv.classList.add("todo") ;
    
   // Create LI
   const newTodo = document.createElement("li") ;
   newTodo.innerText = todo ;
   newTodo.classList.add("todo-item") ;
   todoDiv.appendChild(newTodo) ;

    //Check Mark Button
    const completeButton = document.createElement("button") ;
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add("complete-btn") ;
    todoDiv.appendChild(completeButton) ;

    // Check Trash Button
    const TrashButton = document.createElement("button") ;
    TrashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    TrashButton.classList.add("trash-btn") ;
    todoDiv.appendChild(TrashButton) ;

    // Append to List
    todoList.appendChild(todoDiv);
    })


  }

  function removeLocalTodos(todo) {
    let todos ;
    if(localStorage.getItem('todos') === null) {
        todos = [] ;

    }else{
        todos = JSON.parse(localStorage.getItem('todos')) ;
    }

   
   
    const todoIndex = todo.children[0].innerText ;
    todos.splice(todos.indexOf(todoIndex) , 1) ;
    localStorage.setItem("todos",JSON.stringify(todos)) ;

  }

  