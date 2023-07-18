// import {noteOperations} from"../services/note-services.js";
import { noteOperations } from "../services/note-service.js";
window.addEventListener('load',init);
function init(){
    showCounts();
    bindEvents();
    disabledButton();
}
const enableButton=()=>document.querySelector(`#delete`).disabled=false;


const disabledButton=()=>document.querySelector(`#delete`).setAttribute("disabled",true);


function bindEvents(){
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector('#delete').addEventListener('click',deleteMarked);
}
function deleteMarked(){
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
}
function showCounts()
{
   noteOperations.markTotal()>0?enableButton():disabledButton;
   document.querySelector('#total').innerText=noteOperations.markTotal();
    document.querySelector('#markTotal').innerText=noteOperations.markTotal();
    document.querySelector('#unmarkTotal').innerText  =noteOperations.unMarkTotal();
    
    
    

}

function addNote(){
   //read id,title desc,date of completion,importance
   //DOM
   const fields=['id','title','desc','cdate','importance'];
   const noteObject={}; //object literal
   for(let field of fields){
    noteObject[field]=document.querySelector(`#${field}`).value;

   }
   noteOperations.add(noteObject);
   printNote(noteObject);
   showCounts();
   //const Id= document.querySelector(`#id`).value;
   //const title=document.querySelector(`#title`).value;
}
function printIcon(myClassName='trash',fn,id){
    const iTag=document.createElement('i');
    iTag.setAttribute('note-id',id);
    iTag.className=`fa-solid fa-${myClassName} me-5 hand`;
    iTag.addEventListener(`click`,fn)
    return iTag;

}
function toggleMark(){
    //console.log('Toggle Mark....', this);
    const icon =this;
    const id=this.getAttribute('note-id');
    noteOperations.toggleMark(id);
    const tr= icon.parentNode.parentNode;
    //tr.className='table-danger';
    tr.classList.toggle('table-danger');
    showCounts();
}
function edit(){
    console.log("edit....");
    

    }
    function printNotes(notes){
        const tbody=document.querySelector('#notes')
        tbody.innerHTML= '';
        

        notes.forEach(notes=>printNote(note));

    }

function printNote(noteObject){
    //console.log("called");
    const  tbody=document.querySelector(`#notes`);
    const row=tbody.insertRow();  //tr
    for(let key in noteObject){
        if(key=='isMarked'){
        continue;
    }
        const td= row.insertCell();  // <td
        td.innerText= noteObject[key];
    }
    const td= row.insertCell();
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));
    td.appendChild(printIcon('user-pen'));


}