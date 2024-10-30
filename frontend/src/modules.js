import React, { useState, useEffect } from 'react';
import Sidebar from './components/sidebar';
let currentproject = undefined
let projectindex = 0
let projectchanged = false
let projectlist = []
let pagecounter = 0
let pageind = 1
let currentoption = 0
let alltaskslist  = []
const max = 9
let expanded = undefined
let removeadd = undefined
let ignoreprojectsettings = true

function tasklistarrow(){
    let n = document.querySelector('body')
    n.addEventListener('keydown', function(event) {
        let key = event.key;
        if(key === "ArrowLeft"){
            bapage()
        }
        if(key === "ArrowRight"){
            fwardapage()

        }
    });
}

function getselectedproject(){
    let index = projectlist.findIndex(o => o.name === currentproject.textContent);
    let thisproject = projectlist[index]
    return thisproject
}
function getworkingtask(task){
    let info = task.textContent
    let thisproject = getselectedproject()
    let tasklist = thisproject.tasks
    let index = tasklist.findIndex(o =>  info.includes(o.name));
    tasklist.forEach(element => {
    });
    return index
}

function expcp(){
    return currentproject
}
function exppi(){
    return projectindex
}
function exppc(){
    return projectchanged
}

function taskinfo(a,b,c,d){
    this.name = a
    this.desc = b
    this.date = c
    this.due = d
    this.priority = false
    return this
}

function toggleadd(){
    let b1 =  document.querySelector(".addproj")
    let cname =  document.querySelector(".cname")
    b1.classList.toggle("invisible")
    cname.classList.toggle("visible")
}

function addproject(){
    let a =  document.querySelector(".projectlist")
    let b = document.createElement("div")
    let c = document.querySelector('#projname')
    let d = document.createElement("button")
    d.classList.toggle("deleteproject")
    b.classList.toggle('project')
    b.textContent = c.value
    c.value = ""
    b.appendChild(d)
    a.appendChild(b)
    b.classList.toggle("selectedtab")
    addprojectlistener(b)
    projectlist.push({
        name: b.textContent,
        link: b,
        tasks: [],
        pagecount: 1,
        currentpage: 1,
    })
    d.addEventListener('click', function(e){
        removelistener(d)
        d.stopPropagation(e) //S IS NOT DEFINED?
    })
    projectindex = projectindex + 1
    untoggle()
    currentproject = b
    currentproject.classList.toggle("selectedtab")
    let thisproject = getselectedproject()
    let x = document.querySelector('.addtask')
    if(!x.classList.contains("showtask"))x.classList.add("showtask")
    showtasks(thisproject)
    createstorage()
    return b.textContent
}

function addprojectlistener(b){
    b.addEventListener('click', function(e){
    if(currentproject === b){
        b.classList.toggle("selectedtab")
        ignoreprojectsettings = true
        let q = document.querySelector(".addtask")
        if(q.classList.contains('showtask')) q.classList.remove('showtask')
        switch(currentoption){
            case 0: alltasks()
            break;
            case 1:
            break;
            case 2:
            break;
            case 3: favtasks()
            break;
            default:
                break;
        }
        currentproject = undefined
        return
    }
    if(!projectlist) return
    untoggle()
    ignoreprojectsettings = false
    currentproject = b
    b.classList.toggle("selectedtab")
    let thisproject = getselectedproject()
    let x = document.querySelector('.addtask')
    if(!x.classList.contains("showtask"))x.classList.add("showtask")
    switch(currentoption){
        case 0: showtasks(thisproject)
        break;
        case 1:
        break;
        case 2:
        break;
        case 3: favtasks()
        break;
        default:
        break
    }
    updatepages(thisproject)
})}

function updatepages(t){
    let v = document.querySelector(".pageno")
    pagecounter = 0
    pageind = Math.ceil(t.tasks.length / max)
    if(pageind <= 0){pageind = 1}
    v.textContent =  (pagecounter + 1) + " of " + pageind
}

function updatepages2(t){
    let v = document.querySelector(".pageno")
    pagecounter = 0
    pageind = Math.ceil(t.length / max)
    if(pageind <= 0){pageind = 1}
    v.textContent =  (pagecounter + 1) + " of " + pageind
}

function untoggle(){
    if(!projectlist) return
    let j = document.querySelectorAll('.project')
    for(let project of j){
        if(project.classList.contains("selectedtab")) project.classList.remove("selectedtab")
    }
}
function storageaval(type) {
    return true
}
function dosomething(){
    let c = document.querySelector('#projname')
    let cname = c.value
    for(let i = 0; i < projectlist.length; i++){
        if(projectlist[i].name === cname){
            return false
        }
    }
    addproject()
    return true
}

function createstorage(){
    if(alltasks !== undefined) localStorage.setItem("alltasks", JSON.stringify(alltaskslist))
    if(currentproject !== undefined)localStorage.setItem("currentproject", JSON.stringify(currentproject))
    localStorage.setItem("projectchanged", JSON.stringify(projectchanged))
    localStorage.setItem("projectindex", JSON.stringify(projectindex))
    if(projectlist !== undefined)localStorage.setItem("projectlist", JSON.stringify(projectlist))
}
function loadstorage(){
    alltaskslist = JSON.parse(localStorage.getItem("alltasks"))
    currentproject = JSON.parse(localStorage.getItem("currentproject"))
    projectchanged = JSON.parse(localStorage.getItem("projectchanged"))
    projectindex = JSON.parse(localStorage.getItem("projectindex"))
    projectlist = JSON.parse(localStorage.getItem("projectlist"))

    if(projectlist.length <= 0 || alltaskslist.length <= 0){
        notfound()
    }

    if(projectlist.length <= 0){
        return
    }

    projectlist.forEach(proj => {
        let a = document.querySelector('.projectlist')
        let b = document.createElement("div")
        let c = document.createElement("button")
        c.classList.toggle("deleteproject")
        c.addEventListener('click', function(e){removelistener(c)})
        b.classList.toggle('project')
        b.textContent = proj.name
        b.appendChild(c)
        addprojectlistener(b)
        a.appendChild(b)
    });  
    alltasks()
}

function checkstorage(){
    if(storageaval()){
        if (!localStorage.getItem("projectlist")) {
            createstorage();
            notfound()
            console.log("loading new")
        } 
        else{
        loadstorage()
        console.log("loading old")
        }
    }
}
function clearform(){
    document.querySelector('#tinput2').value = ""
}

function addtask(){
    let info1 = document.querySelector('#tinput1').value
    const info2 = document.querySelector('#tinput2').value
    const info3 = document.querySelector('#tinput3').value
    const info4 = document.querySelector('#tinput4').value
    clearform()
    let thisproject = getselectedproject()
    //info1 = info1 + " " + Math.ceil(10*(Math.random()))  //RANDOM INPUT GENERATOR
    thisproject.tasks.push(new taskinfo(info1,info2,info3,info4))
    alltaskslist.push(new taskinfo(info1,info2,info3,info4))
    createstorage()
    showtasks(thisproject)
    updatepages(thisproject)
}

function createtask(newtask){
    let x = document.createElement('div')
    x.classList.toggle('task')
    x.textContent = newtask.name
    let a = document.createElement('div')
    a.classList.toggle("dates2")
    let b = document.createElement('a')
    b.classList.toggle("added")
    let c = document.createElement('a')
    c.classList.toggle("due")
    b.textContent = "Added: " + newtask.date
    if(newtask.due){
        c.textContent = "Deadline: "+ newtask.due
    }

    a.appendChild(b)
    a.appendChild(c)
    x.appendChild(a)
    let d = document.createElement('button')
    d.classList.toggle("removethis")
    let e = document.createElement('button')
    e.classList.toggle("favor")
    if(newtask.priority === true){e.classList.toggle('favorited')}
    e.addEventListener('click', function(s){
        favorpress(e)
    s.stopPropagation()
})
    d.addEventListener('click', function(s){
        delpress(d)
        s.stopPropagation()
    })
    x.addEventListener('click', function(e){taskpress(x)})
    x.appendChild(d)
    x.appendChild(e)
    return x
}

function optionscreen(){
    let v  = document.querySelector(".optionpane")
    v.classList.toggle('active')
    let c = document.querySelector("#tinput3")
    let now = new Date();
    let month = (now.getMonth() + 1);               
    let day = now.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    let today = now.getFullYear() + '-' + month + '-' + day;
    c.value = today
}

function showtasks(thisproject){
    let x = document.querySelector('.right')
    let z = document.querySelector(".tasklist")
    z.innerHTML = ""
    let j = 0
    if(thisproject.tasks.length <= 0){
        notfound()
        return
    }
    for(let i = 0; i < max;  i++){
        if(j >= (thisproject.tasks.length)) return
        let v = createtask(thisproject.tasks[thisproject.tasks.length - (j+1)])
        j = j + 1
        z.appendChild(v)
        found()
    }
    x.appendChild(z)
}

function showtasks2(a,b, backone){
    let thisproject = getselectedproject()
    let x = document.querySelector('.right')
    let z = document.querySelector(".tasklist")
    z.innerHTML = ""

    if(ignoreprojectsettings){
        for(let i = a; i < b; i++){
            if(i >= alltaskslist.length) break
            let v = createtask(alltaskslist[alltaskslist.length  - (i + 1)])
            z.appendChild(v)
        }
    }
    else{
        for(let i = a; i < b; i++){
            if(i >= thisproject.tasks.length) break
            let v = createtask(thisproject.tasks[thisproject.tasks.length  - (i + 1)])
            z.appendChild(v)
        }
    }
    x.appendChild(z)
    let v = document.querySelector(".pageno")
    if(backone) v.textContent =  (pagecounter) + " of " + pageind
    if(!backone)v.textContent =  (pagecounter + 1) + " of " + pageind
    found()
}

function showtasks3(chosen){
    let x = document.querySelector('.right')
    let z = document.querySelector(".tasklist")
    z.innerHTML = ""
    let j = 0
    if(chosen === undefined){
        notfound()
        return
    }
    for(let i = 0; i < max;  i++){
        if(j >= (chosen.length)) return
        let v = createtask(chosen[chosen.length - (j+1)])
        j = j + 1
        z.appendChild(v)
    }
    x.appendChild(z)
    found()
}

function bapage(){
   if(pagecounter === 0 ) return
   showtasks2((max*(pagecounter - 1)), (max*pagecounter),true)
   pagecounter = pagecounter - 1
}
function fwardapage(){
    if(pagecounter >= pageind -1) return
    pagecounter = pagecounter + 1
    showtasks2((max*pagecounter), (max* (pagecounter + 1)),false)
}

function favorpress(e){
    e.classList.toggle('favorited')
    let thisproject = getselectedproject()
    let thistask = getworkingtask(e.parentNode)
    thisproject.tasks[thistask].priority = true
    let index = alltaskslist.findIndex(o => o.name === thisproject.tasks[thistask].name);
    alltaskslist[index] = thisproject.tasks[thistask]
    createstorage()
}

function delpress(e){
    if(ignoreprojectsettings) return //cant remove projects on all page
    let thisproject = getselectedproject()
    let thistask = getworkingtask(e.parentNode)
    e.parentNode.parentNode.removeChild(e.parentNode)
    thisproject.tasks.splice(thistask,1)
    alltaskslist =[]
    projectlist.forEach(element => {
        element.tasks.forEach(element2 => {
            alltaskslist.push(element2)
        });
    });
    
    createstorage()
    showtasks(thisproject)
    updatepages(thisproject)
}

function alltasks(){
    currentoption = 0
    if(alltaskslist === undefined){
        notfound()
        return
    }
     showtasks3(alltaskslist)
     updatepages2(alltaskslist)
     
}

function favtasks(){
    currentoption = 3
    let favlist = []
    if(!ignoreprojectsettings){
        let thisproject = getselectedproject()
            thisproject.tasks.forEach(element => {
                if(element.priority === true){
                    favlist.push(element)
                }      
            })
    }
    else{alltaskslist.forEach(element => {
        if(element.priority === true){
            favlist.push(element)}
    })}
    showtasks3(favlist)
    updatepages2(favlist) 
}

function removelistener(x){
        if(projectlist === undefined){return}
        console.log(x)
    
        let indexi = projectlist.findIndex(k => k.name === x.parentNode.textContent); 
        console.log("er")  
    
        if(projectlist[indexi] === currentproject){
            ignoreprojectsettings  = true
            currentproject = undefined
            alltasks()
        }
        projectlist.splice(indexi,1)
        console.log(indexi)
        let plist = x.parentNode.parentNode
        plist.removeChild(x.parentNode)
        createstorage()
    return x
}

function notfound(){
    
        let z = document.querySelector('.nothing')
        if(!z.classList.contains("see")) z.classList.add('see')   
}


function found(){  
    let z = document.querySelector('.nothing')
    if(z.classList.contains("see")) z.classList.remove('see')
}
function taskpress(e){
    let text  = ""
    let thistask
   
    if(ignoreprojectsettings){
        for (let i = 0; i < e.childNodes.length; ++i){
            if (e.childNodes[i].nodeType === Node.TEXT_NODE){
                text = text +  e.childNodes[i].textContent;
                break;
            }
            break;
        }
        let index = alltaskslist.findIndex(o => o.name === text);
        thistask = alltaskslist[index]
    }

    else{
    let thisproject = getselectedproject()
    thistask = getworkingtask(e.parentNode)
    thistask = thisproject.tasks[thistask]
    }


    let x = document.createElement('div')
    x.classList.toggle("expand")
    if(expanded === undefined){
        expanded = e
        removeadd = x
    }
    else{
        expanded.removeChild(removeadd)
    }
    let p = document.createElement('p')
    p.classList.toggle('taskp')
    p.textContent = thistask.desc
    x.appendChild(p)
    x.addEventListener('click', function(s){
        removedesc(x)
        s.stopPropagation()
    })
    e.appendChild(x)
    expanded = e
    removeadd = x
}

function removedesc(){
    expanded.removeChild(removeadd)
    removeadd = undefined
    expanded = undefined
}

export{taskinfo, addproject, toggleadd, addtask, storageaval, createstorage, loadstorage, checkstorage,
optionscreen, showtasks, exppc, exppi, expcp, dosomething, bapage, fwardapage, alltasks,
favtasks, tasklistarrow}