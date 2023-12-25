let signUpForm = document.getElementById("signUpForm");
let signUpName = document.querySelector("#signfloatingName");
let signUpEmail = document.querySelector("#signfloatingEmail");
let signUpPassword = document.querySelector("#signfloatingPassword");
let signUpConPassword = document.querySelector("#signConfloatingPassword");
let signUpCheck = document.querySelector("#signUpCheck");

function signUp(e) {
  if (!signUpValidation()) {
    event.preventDefault();
  } else {
   
    //============= localStorage =============//

    let user = {
      username: signUpName.value,
      email: signUpEmail.value,
      password: signUpConPassword.value,
    };
    let jsonformat = JSON.stringify(user);
    localStorage.setItem(signUpName.value, jsonformat);

      alert("Successfully Registered");

    window.location = "https://htmlpreview.github.io/?https://github.com/Iamvijay17/ToDo-List/blob/NewTodo/login.html";
  }
}

function signUpValidation() {
  const signUpNameVal = signUpName.value.trim();
  const signUpEmailVal = signUpEmail.value.trim();
  const signUpPasswordVal = signUpPassword.value.trim();
  const signUpConPasswordVal = signUpConPassword.value.trim();
  const signUpCheckVal = signUpCheck.checked;
  let errorFree = true;
  // Name Validation
  if (signUpNameVal === "") {
    errorFree = false;
    setErr(signUpName, "Enter the Name");
  } else {
    setSuccess(signUpName);
  }

  // Email Validation
  if (signUpEmailVal === "") {
    errorFree = false;
    setErr(signUpEmail, "Enter the Email");
  } else if (!validatEmail(signUpEmailVal)) {
    errorFree = false;
    setErr(signUpEmail, "Please Enter the valid Email");
  } else {
    setSuccess(signUpEmail);
  }

  // Password Validation
  if (signUpPasswordVal === "") {
    errorFree = false;
    setErr(signUpPassword, "Enter the Password");
  } else {
    setSuccess(signUpPassword);
  }

  // ConPassword Validation
  if (signUpConPasswordVal === "") {
    errorFree = false;
    setErr(signUpConPassword, "Please Enter the Confirm Password");
  } else if (signUpConPasswordVal !== signUpPasswordVal) {
    errorFree = false;
    setErr(signUpConPassword, "Password does not match");
  } else {
    setSuccess(signUpConPassword);
  }

  // CheckBox Validation
  if (!signUpCheckVal) {
    errorFree = false;
    let check = document.querySelector(".form-check>.error");
    check.innerHTML = "Check the terms & conditions";
  } else {
    let check = document.querySelector(".form-check>.error");
    check.innerHTML = "";
  }
  return errorFree;
}

function setErr(element, msg) {
  const inputGroup = element.parentElement;
  const errorEl = inputGroup.querySelector(".error");
  const inputEl = inputGroup.querySelector(".form-control");
  inputEl.classList.add("border-danger");
  errorEl.innerText = msg;
}

function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorEl = inputGroup.querySelector(".error");
  const inputEl = inputGroup.querySelector(".form-control");
  inputEl.classList.remove("border-danger");
  inputEl.classList.add("border-success");
  errorEl.innerText = "";
}

// Mail Validation
const validatEmail = (signUpEmail) => {
  return String(signUpEmail)
    .toLowerCase()
    .match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
};
//!===============================================================================================//
//!===============================================================================================//
//!===============================================================================================//

// Login Page Script
function login(e) {
  event.preventDefault();
  dataCheck();
}
function dataCheck() {
  let username = document.getElementById("loginfloatingName");
  let password = document.getElementById("loginConfloatingPassword");
  const terms = document.getElementById("loginCheck").checked;

  let userNameVl = username.value;
  let passwordVl = password.value;

  console.log(userNameVl, passwordVl);

  let user = localStorage.getItem(userNameVl);
  let data = JSON.parse(user);

  // Validations

  if (data == null) {
    setErr(username, "Please Enter the UserName");
    setErr(password, "Please Enter the Password");
  } else if (
    username.value == data.username &&
    password.value == data.password &&
    terms
  ) {
     

    window.location = "https://htmlpreview.github.io/?https://github.com/Iamvijay17/ToDo-List/blob/NewTodo/main.html";
  } else {
    // setErr([username,password], "Enter the correct details")
    alert("Enter the correct details");
  }
}

// Todo script
let btnEl = document.getElementById("todoBtn");
let inputEl = document.getElementById("todoInput");
let todosEl = document.getElementById("todos");
let todos = [];

btnEl.addEventListener("click", () => {
  todos.push(inputEl.value);
  console.log(todos);
  addTodo(inputEl.value);
  inputEl.value = "";
});

function addTodo(todo) {
  let para = document.createElement("p");
  para.innerText = todo;
  todosEl.appendChild(para);

  para.addEventListener("click", () => {
    para.style.textDecoration = "line-through";
    para.style.textDecorationColor = "Red";
    remove(todo);
  });
  para.addEventListener("dblclick", () => {
    todosEl.removeChild(para);
    remove(todo);
  });
}

function remove(todo) {
  let index = todos.indexOf(todo);
  if (index > -1) {
    todos.splice(index, 1);
  }
}
