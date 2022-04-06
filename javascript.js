const elementId = (element) => document.getElementById(element);
const arrOfElm = (className) => document.getElementsByClassName(className);
// Loading the old notes
let oldNotes = localStorage.getItem("notes");
let noteObj = JSON.parse(oldNotes);

if (noteObj != null) {
  noteObj.forEach((element) => {
    addNewNote(null, element);
  });
}
// check if there is an empty note
Array.from(arrOfElm("noteTitle")).forEach((elm) => {
  if (elm.innerText == "") {
    elm.parentElement.remove();
  }
});

function addNewNote(e, text = "") {
  const note = document.createElement("div");
  note.className = "note";
  const div = document.createElement("div");
  div.className = "noteTitle";
  div.innerText = text;
  const editBtn = document.createElement("button");
  editBtn.className = "edit";
  const editi = document.createElement("i");
  editi.className = "fa-solid fa-pen fa-2x editI";
  editBtn.appendChild(editi);

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  const idelete = document.createElement("i");
  idelete.className = "fa-solid fa-trash-can fa-2x deleteI";
  deleteBtn.appendChild(idelete);

  note.appendChild(div);
  note.appendChild(editBtn);
  note.appendChild(deleteBtn);

  note.addEventListener("click", (e) => {
    elementId("noteView").style.transform = "translate(-50%, -50%)";
    elementId("viewParagraph").innerText = div.innerText;
    e.stopPropagation();
  });
  elementId("allNotesContainer").appendChild(note);

  // defining the delete button
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let arr = localStorage.getItem("notes");
    arr = JSON.parse(arr);
    if (arr != null) {
      arr.find((value, index) => {
        if (value == div.innerText) {
          arr.splice(index, 1);
        }
      });
    }
    localStorage.setItem("notes", JSON.stringify(arr));

    note.remove();
  });

  // defining the edit button
  editBtn.addEventListener("click", (e) => {
    e.stopPropagation();

    const editWindow = document.createElement("div");
    editWindow.className = "editWindow";

    const textarea = document.createElement("textarea");
    textarea.className = "editTitle";
    textarea.id = "editTitle";
    textarea.placeholder = "Write Something, awesome!";
    textarea.value = div.innerText;

    const doneBtn = document.createElement("button");
    doneBtn.className = "done";
    deleteBtn.id = "done";
    const donei = document.createElement("i");
    donei.className = "fa-solid fa-circle-check fa-3x doneI";
    doneBtn.appendChild(donei);

    editWindow.appendChild(textarea);
    editWindow.appendChild(doneBtn);
    document.body.appendChild(editWindow);
    editWindow.style.display = "flex";

    doneBtn.addEventListener("click", () => {
      if (textarea.value != div.innerText) {
        div.innerText = textarea.value;
        textarea.value = "";
        localStorage.removeItem("notes");
        let array = [];
        Array.from(arrOfElm("noteTitle")).forEach((element) => {
          array.push(element.innerText);
        });
        localStorage.setItem("notes", JSON.stringify(array));
      }
      editWindow.style.transform = "translate(-50%, 110%)";
      setTimeout(() => {
        editWindow.remove();
      }, 250);
    });
  });
}
// adding a new note on clicking plus button
document.getElementById("newNoteButton").addEventListener("click", addNewNote);

// styles
elementId("closeButton").addEventListener("click", (e) => {
  elementId("noteView").style.transform = "translate(-50%, 150%)";
  elementId("viewParagraph").innerText = "";
  e.stopPropagation();
});

document.querySelector(".cancel").addEventListener("click", () => {
  document.querySelector(".option-dailog").style.transform = "translateY(200%)";
});

document.querySelector(".option-button").addEventListener("click", () => {
  document.querySelector(".option-dailog").style.transform = "translateY(0)";
});
// accessing the all variable values
let root = document.querySelector(":root");
const getValue = (requredVariable) =>
  getComputedStyle(root).getPropertyValue("--" + requredVariable);
const setValue = (target, value) =>
  root.style.setProperty("--" + target, value);
document.querySelector('.dark-theme-label').addEventListener('click',()=>{
  let checkbox=document.querySelector('.dark-theme-checkbox');
  // there is false working like true
  if (checkbox.checked==false) {
    setValue('background-color','hsl(282, 50%, 3.9%)');
    setValue('ui-text-color','hsl(284, 76.8%, 64.5%)');
    setValue('alfa','1')
    setValue('notes-background-color','hsla(275.6, 85%, 26.1%, var(--alfa))');
    setValue('alfa1','calc(var(--alfa) - .1)')
    setValue('notes-color','hsl(284, 76.8%, 64.5%)');
    setValue('icon-color','hsl(284, 76.8%, 64.5%)');
    setValue('notes-hover-color','hsl(284.1, 100%, 25.9%)');
    setValue('scrollbar-color','var(--ui-text-color)');
    setValue('dailog-color','hsl(275.6, 85%, 35.1%)')
    setValue('icon-hover-color','hsl(275.6, 85%, 75.1%)')
    setValue('icon-done-hover-color','var(--icon-hover-color)')
    setValue('shadow','0 0 0.5rem 0.1rem hsla(275.6, 85%, 26.1%, var(--alfa1))');
    setValue('back-active-color','hsla(275.6, 85%, 26.1%, var(--alfa1))')
    setValue('border-color','hsl(284, 76.8%, 74.5%)')
}

if (checkbox.checked==true) {
  setValue('background-color','hsl(111, 33%, 8%)');
    setValue('ui-text-color','hsl(120, 100%, 50%)');
    setValue('alfa','1')
    setValue('notes-background-color','hsla(120, 100%, 50%, var(--alfa)');
    setValue('alfa1','calc(var(--alfa) - .1)')
    setValue('notes-color','hsl(100, 3%, 23%)');
    setValue('icon-color','hsl(0, 0%, 100%)');
    setValue('notes-hover-color','hsl(96, 100%, 50%)');
    setValue('scrollbar-color','hsl(120, 90%, 15%)');
    setValue('dailog-color','hsla(120, 78%, 49%, 0.986)')
    setValue('icon-hover-color','hsl(110, 98%, 48%)')
    setValue('icon-done-hover-color','hsl(110, 64%, 24%)')
    setValue('shadow','0 0 0.5rem 0.1rem hsla(120, 79%, 21%, var(--alfa1))');
    setValue('back-active-color','hsla(120, 79%, 21%, var(--alfa1))')
    setValue('border-color','rgb(21, 59, 4)')
}})