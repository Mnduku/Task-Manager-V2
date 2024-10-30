import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.js'; 
import App from './App';
import reportWebVitals from './reportWebVitals';
import { toggleadd, addtask,checkstorage, optionscreen, 
    alltasks, dosomething, bapage, fwardapage,
    tasklistarrow, favtasks, 
} from './modules'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

checkstorage()
window.addEventListener("load", (event) => {
tasklistarrow()
alltasks()

let b1 =  document.querySelector(".addproj")
b1.addEventListener('click', function(e){
    toggleadd()
})

let b2 =  document.querySelector(".submit")
b2.addEventListener('click', function(e){
    if(document.querySelector("#projname").value === "" || document.querySelector("#projname").value === " ") return
    if(!dosomething()) return
    else toggleadd()
})

let b3 = document.querySelectorAll(".option")
let currenttab = document.querySelector('.start')
b3.forEach(element => { element.addEventListener('click', function(e){
    if(element === currenttab) return
    if(element !== currenttab){
        element.classList.toggle("selectedtab")
        currenttab.classList.toggle("selectedtab")
        currenttab = element
    }
})})

let b5 = document.querySelector(".addtask")
b5.addEventListener('click', function(e){
    optionscreen()
})

let b6 = document.querySelector(".back")
b6.addEventListener('click', function(e){
    optionscreen()
})

var form = document.querySelector(".taskform");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);
let at = document.querySelector('.addtasker')
at.addEventListener('click', function(e){
    console.log('hola')
    if(form.checkValidity() === false) return
    optionscreen()
    addtask()
})
})

let b7 = document.querySelector(".pageback")
b7.addEventListener('click', function(e){
    bapage()
})
let b8 = document.querySelector(".pageforward")
b8.addEventListener('click', function(e){
    fwardapage()
})

let b9 = document.querySelector("#alltasks")
b9.addEventListener('click', function(e){
    alltasks()
})
let b12 = document.querySelector("#star")
b12.addEventListener('click', function(e){
    favtasks()
})
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
