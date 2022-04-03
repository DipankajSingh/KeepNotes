const elementId = (element) => document.getElementById(element);
const arrOfElm = (className) => document.getElementsByClassName(className);
// Loading the old notes
let oldNotes = localStorage.getItem("notes");
let noteObj = JSON.parse(oldNotes);

if (noteObj != null) {
  noteObj.forEach((element) => {
    addNewNote(null, element);
  });
};
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
    elementId("noteView").style.display = "inline-block";
    elementId("viewParagraph").innerText = div.innerText;
    e.stopPropagation();
  });
  elementId("allNotesContainer").appendChild(note);

  // defining the delete button
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    let arr = localStorage.getItem("notes");
    arr = JSON.parse(arr);
    if (arr!=null){arr.find((value, index) => {
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
        localStorage.removeItem('notes');
        let array = [];
        Array.from(arrOfElm("noteTitle")).forEach((element) => {
          array.push(element.innerText);
        });
        localStorage.setItem("notes", JSON.stringify(array));
      };
      editWindow.style.display = "none";
    });
  });
}
// adding a new note on clicking plus button
document.getElementById("newNoteButton").addEventListener("click", addNewNote);

elementId("closeButton").addEventListener("click", (e) => {
  elementId("noteView").style.display = "none";
  elementId("viewParagraph").innerText = "";
  e.stopPropagation();
});

document.querySelector('.cancel').addEventListener('click',()=>{
  document.querySelector('.option-dailog').style.transform='translateY(200%)';
})

document.querySelector('.option-button').addEventListener('click',()=>{
  document.querySelector('.option-dailog').style.transform='translateY(0)';
})
