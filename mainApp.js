import IdGenerator from "./utils/idGenerator.js";
import createNewNote from "./utils/createNewNote.js";
import removeNote from "./utils/removeNote.js";
import changeNoteColor from "./utils/changeNoteColor.js";
import modalFunction, {
  saveToLocalStorageModal,
} from "./utils/modalFunction.js";
import filterNotes from "./utils/filterNotes.js";

const formInput = document.querySelector(".formInput");
const titleInput = document.querySelector("#titleInput");
const labelInput = document.querySelector("#labelInput");
const formButtons = document.querySelector(".form-buttons");
const noteInput = document.querySelector(".noteInput");
const submitButton = document.querySelector(".submit");
const closeButton = document.querySelector(".close");
const modal = document.querySelector("#myModal");
const submitModal = document.querySelector(".submitModal");
const notesMessage = document.querySelector(".notes-message");
const searchNotesContainer = document.querySelector(".searchNotesContainer");
const searchNotesInput = document.querySelector(".searchNotes");

window.addEventListener("load", () => {
  const storageItems = Object.values({ ...localStorage });
  storageItems.map((note) => {
    let noteElement = JSON.parse(note);
    createNewNote(
      noteElement.id,
      noteElement.titleInput,
      noteElement.noteInput,
      noteElement.labelInput,
      noteElement.bkgColor,
      noteElement.textColor
    );
  });
  if (storageItems.length === 0) {
    notesMessage.style.display = "block";
  } else {
    notesMessage.style.display = "none";
  }
  if (storageItems.length >= 2) {
    searchNotesContainer.style.display = "flex";
  } else {
    searchNotesContainer.style.display = "none";
  }
});

function setDefaultTextArea(element) {
  element.style.height = "inherit";
}

document.addEventListener("click", function (e) {
  e.stopPropagation();
  const isClickInside = formInput.contains(e.target);
  const isClickClose = closeButton.contains(e.target);
  const isClickSubmit = submitButton.contains(e.target);
  if (!isClickInside || isClickClose || isClickSubmit) {
    titleInput.value = "";
    noteInput.value = "";
    labelInput.value = "";
    titleInput.style.display = "none";
    formButtons.style.display = "none";
    labelInput.style.display = "none";
    noteInput.style.borderBottom = "none";
    const storageItems = Object.values({ ...localStorage });
    if (storageItems.length === 0) {
      notesMessage.style.display = "block";
    } else {
      notesMessage.style.display = "none";
    }

    if (storageItems.length >= 2) {
      searchNotesContainer.style.display = "flex";
    } else {
      searchNotesContainer.style.display = "none";
    }
    setDefaultTextArea(noteInput);
  } else {
    titleInput.style.display = "inline-block";
    formButtons.style.display = "flex";
    labelInput.style.display = "inline-block";
    noteInput.style.borderBottom = "0.5px solid #5f636898";
    setDefaultTextArea(noteInput);
    const storageItems = Object.values({ ...localStorage });
    if (storageItems.length === 0) {
      notesMessage.style.display = "block";
    } else {
      notesMessage.style.display = "none";
    }
    if (storageItems.length >= 2) {
      searchNotesContainer.style.display = "flex";
    } else {
      searchNotesContainer.style.display = "none";
    }
  }

  if (e.target.classList.contains("buttonTrash")) {
    removeNote(e.target);
    const storageItems = Object.values({ ...localStorage });
    if (storageItems.length >= 2) {
      searchNotesContainer.style.display = "flex";
    } else {
      searchNotesContainer.style.display = "none";
    }
  }
  if (e.target.classList.contains("color-option")) changeNoteColor(e.target);
  if (
    e.target.classList.contains("note") ||
    e.target.classList.contains("noteTitle") ||
    e.target.classList.contains("noteText") ||
    e.target.classList.contains("label") ||
    e.target.classList.contains("trash-and-color-container")
  ) {
    modalFunction(e.target.getAttribute("name"));
  }
});

submitButton.addEventListener("click", saveToLocalStorage);
submitModal.addEventListener("click", saveToLocalStorageModal);

function saveToLocalStorage(e) {
  e.preventDefault();
  if (!titleInput.value && !noteInput.value)
    return alert("Fill out title or text form.");
  const id = IdGenerator({ id: "" });
  localStorage.setItem(
    id,
    JSON.stringify({
      id,
      titleInput: titleInput.value,
      noteInput: noteInput.value,
      labelInput: labelInput.value,
      bkgColor: "white",
      textColor: "#5f6368",
    })
  );
  createNewNote(id, titleInput.value, noteInput.value, labelInput.value);
  titleInput.value = "";
  noteInput.value = "";
}

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

searchNotesContainer.onclick = function (event) {
  searchNotesInput.focus();
};

searchNotesInput.addEventListener("keyup", filterNotes);
