const navButtons = document.querySelectorAll(".navButton");
const jokeElement = document.querySelector(".jokeElement");
const fontColor = document.getElementById("notes-font-color-input");
const fontWeight = document.getElementById("font-weight");
const fontFamily = document.getElementById("font-style");
const blockwords = document.getElementById("word-block");
const nextBtn = document.querySelector(".next-button");
const likeBtn = document.querySelector(".like-button");
const navbar = document.querySelector(".navbar");
const page = document.querySelectorAll(".page");
const theme = document.querySelectorAll(".theme");
const darkThemeMq = window.matchMedia("prefers-color-scheme:dark");

const setTheme = (property, value) =>
  document.documentElement.style.setProperty(property, value);

const darkFunc = (dark = false) => {
  if (dark == false) {
    setTheme("--navbar-back-color", "hsl(330 100% 50%)");
    setTheme("--page-back-color", "hsl(0 0% 100%)");
  } else {
    setTheme("--navbar-back-color", "hsl(120 91% 44%)");
    setTheme("--page-back-color", "hsl(120 82% 6%)");
  }
};

if (localStorage.getItem("colors") == null) {
  theme.forEach((elm) => {
    if (elm.classList[0] == "auto-theme") {
      if (localStorage.getItem("theme") == null) {
        elm.dataset.isselected = true;
        if (darkThemeMq.matches == false) {
          darkFunc();
        } else {
          darkFunc(true);
        }
      }
    }
  });
}
const oldColors = JSON.parse(localStorage.getItem("colors"));
if (oldColors != null) {
  setTheme("--page-back-color", oldColors[0]);
  setTheme("--navbar-back-color", oldColors[1]);
}

let themeMode = localStorage.getItem("theme");
if (themeMode != null) {
  theme.forEach((elm) => {
    if ((elm.classList[0] == "auto-theme") & (themeMode == "auto")) {
      elm.dataset.isselected = true;
    }
    if ((elm.classList[0] == "light-theme") & (themeMode == "light")) {
      elm.dataset.isselected = true;
    }
    if ((elm.classList[0] == "dark-theme") & (themeMode == "dark")) {
      elm.dataset.isselected = true;
    }
  });
  if (themeMode == "light") {
    darkFunc();
  }
  if (themeMode == "dark") {
    darkFunc(true);
  }
  if (themeMode == "auto") {
    if (darkThemeMq.matches == false) {
      darkFunc();
    } else {
      darkFunc(true);
    }
  }
}

theme.forEach((elm) => {
  elm.addEventListener("click", () => {
    theme.forEach((elm) => {
      elm.dataset.isselected = false;
    });
    elm.dataset.isselected = true;
    if (elm.classList[0] == "auto-theme") {
      if (darkThemeMq.matches == false) {
        darkFunc();
      } else {
        darkFunc(true);
      }
      localStorage.setItem("theme", "auto");
      localStorage.removeItem("colors");
    }
    if (elm.classList[0] == "dark-theme") {
      darkFunc(true);
      localStorage.setItem("theme", "dark");
      localStorage.removeItem("colors");
    }
    if (elm.classList[0] == "light-theme") {
      darkFunc();
      localStorage.setItem("theme", "light");
      localStorage.removeItem("colors");
    }
  });
});
let i = 0;
navButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.dataset.selected = true;
    page.forEach((elm) => (elm.dataset.selected = false));
    if (button.dataset.name == "home") {
      page.forEach((elm) => {
        if (elm.dataset.name == "home") {
          elm.dataset.selected = true;
        }
      });
    }
    if (button.dataset.name == "theme-page") {
      page.forEach((elm) => {
        if (elm.dataset.name == "theme-page") {
          elm.dataset.selected = true;
        }
      });
    }
    if (button.dataset.name == "fonts-page") {
      page.forEach((elm) => {
        if (elm.dataset.name == "fonts-page") {
          elm.dataset.selected = true;
        }
      });
    }
    if (button.dataset.name == "jokes-page") {
      page.forEach((elm) => {
        if (elm.dataset.name == "jokes-page") {
          elm.dataset.selected = true;
        }
      });
    }

    navButtons.forEach((elm) => {
      if ((elm.dataset.selected == "true") & (elm != button)) {
        elm.dataset.selected = false;
      }
    });
  });
});

function createElement(className, element = "div", id = "id") {
  let elm = document.createElement(element);
  elm.className = className;
  if (id != "id") {
    elm.id = id;
  }
  return elm;
}

const noteContainer = document.querySelector(".notes-container");

const addButton = document.querySelector(".add-button");
function addNoteCard(oldText = "") {
  const noteCard = createElement("note-card"); //note-card
  const trashPen = createElement("trash-pen"); //buttons
  const trash = createElement(`trash btn`); //trash
  trash.innerHTML = `<div><i class="fa-solid fa-trash"></i></div>`;

  const pen = createElement(`pen btn`); //pen
  pen.dataset.clicked = false;
  pen.innerHTML = `<div><i class="fa-solid fa-pen"></i></div>`;

  const textParent = createElement("text-parent"); //text parent
  const text = createElement("text", undefined, "text"); //text
  const defultText = oldText == "" ? "CLICK PEN TO WRITE!" : oldText;
  text.innerText = defultText;
  const textarea = createElement("textarea", "textarea", "textarea"); //text area

  // appending elements
  trashPen.append(trash, pen);
  textParent.append(text, textarea);
  noteCard.append(trashPen, textParent);
  noteContainer.prepend(noteCard);
  //********ADDING EVENT LISTENERS*******

  //deleting notes
  trash.addEventListener("click", () => {
    let t = JSON.parse(localStorage.getItem("textData"));
    if (t != null) {
      let i = t.indexOf(text.innerText);
      if (i != -1) {
        t.splice(i, 1);
        localStorage.setItem("textData", JSON.stringify(t));
      }
    }
    noteCard.remove();
  });
  //blocking offensive word
  ////////////////////////////////////////////////////////////
  //                      work in Progress                  //
  ////////////////////////////////////////////////////////////
  async function getWords(text) {
    const res = await fetch("words.json");
    const words = await res.json();
    words.forEach((badWord) => {
      if (text.includes(badWord)) {
        text = text.replace(badWord, "*".repeat(badWord.length));
      }
    });
    return text;
  }
  //toggling pen
  pen.addEventListener("click",async function () {
    let textData = JSON.parse(localStorage.getItem("textData"));
    if (textData != null) {
      if (textData.indexOf(text.innerText) != -1) {
        textData.splice(i, 1);
      }
    } else {
      textData = [];
    }
    if (pen.dataset.clicked == "false") {
      textarea.style.transform = `translateX(0)`;
      pen.dataset.clicked = true;
      textarea.innerText = text.innerText;
      if (text.innerText == "CLICK PEN TO WRITE!") {
        textarea.value = "";
      }
      textarea.focus();

      return;
    }
    if (pen.dataset.clicked == "true") {
      textarea.style.transform = `translateX(200%)`;
      pen.dataset.clicked = false;
      text.innerText =await getWords(textarea.value);
      if (textarea.value == "") {
        text.innerText = defultText;
      }
      if (textarea.value != "") {
        textData.push(textarea.value);
        localStorage.setItem("textData", JSON.stringify(textData));
      }
      return;
    }
  });
}
//loading exiting notes data
let noteData = JSON.parse(localStorage.getItem("textData"));
if (noteData != null) {
  noteData.forEach((elm) => {
    addNoteCard(elm);
  });
}
addButton.addEventListener("click", () => addNoteCard());

// adding user selected color
const colorInputs = document.querySelectorAll(".color-input");
colorInputs.forEach((elm) => {
  elm.addEventListener("change", () => {
    if (elm.classList[0] == "back") {
      setTheme("--page-back-color", elm.value);
    }
    if (elm.classList[0] == "nav") {
      setTheme("--navbar-back-color", elm.value);
    }
    let colors = [];
    colorInputs.forEach((elm) => {
      colors.push(elm.value);
    });
    localStorage.removeItem("theme");
    localStorage.setItem("colors", JSON.stringify(colors));
  });
});

async function fontStyle() {
  const res = await fetch("fonts.json");
  const fonts = await res.json();
  let allFonts = [
    ...fonts.monospace,
    ...fonts.sansSerif,
    ...fonts.cursive,
    ...fonts.serif,
  ];
  allFonts.forEach((val) => {
    let elm = ` <option value="${val}">${val}</option>`;
    fontFamily.insertAdjacentHTML("afterbegin", elm);
  });
}
fontStyle();
fontColor.addEventListener("change", () => {
  setTheme("--note-color", fontColor.value);
});

fontWeight.addEventListener("change", () => {
  setTheme("--font-weight", fontWeight.value);
});

fontFamily.addEventListener("change", () => {
  setTheme("--font-family", fontFamily.value);
});

//jokes a part

async function joke() {
  try {
    const res = await fetch("https://icanhazdadjoke.com/", {
      headers: {
        accept: "application/json",
      },
    });
    const joke = await res.json();
    jokeElement.innerText = joke.joke;
  } catch (error) {
    jokeElement.innerText = error;
  }
}
joke();
nextBtn.addEventListener("click", () => {
  joke();
});

likeBtn.addEventListener("click", () => {
  let oldJokes = [JSON.parse(localStorage.getItem("oldJokes"))];
  if (oldJokes[0] == null) {
    oldJokes = [];
  }
  oldJokes.push(jokeElement.innerText);
  localStorage.setItem("oldJokes", JSON.stringify(oldJokes));
});
