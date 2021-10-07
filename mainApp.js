import { saveNoteToDB } from "./utils/saveNoteToDB.js";
import removeNote from "./utils/removeNote.js";
import changeNoteColor from "./utils/changeNoteColor.js";
import modalFunction, {
  saveToLocalStorageModal,
} from "./utils/modalFunction.js";
import filterNotes from "./utils/filterNotes.js";
import { hideAndClearForm, showForm } from "./utils/hideShowForm.js";

const formInput = document.querySelector(".formInput");

const submitButton = document.querySelector(".submit");
const closeButton = document.querySelector(".close");
const modal = document.querySelector("#myModal");
const submitModal = document.querySelector(".submitModal");
const notesMessage = document.querySelector(".notes-message");
const searchNotesContainer = document.querySelector(".searchNotesContainer");
const searchNotesInput = document.querySelector(".searchNotes");

// window.addEventListener("load", () => {
//   const storageItems = Object.values({ ...localStorage });

//   if (storageItems.length === 0) {
//     notesMessage.style.display = "block";
//   } else {
//     notesMessage.style.display = "none";
//   }
//   if (storageItems.length >= 2) {
//     searchNotesContainer.style.display = "flex";
//   } else if (searchNotesInput.value === "") {
//     searchNotesContainer.style.display = "none";
//   }
// });

submitModal.addEventListener("click", saveToLocalStorageModal);

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

searchNotesContainer.onclick = function (event) {
  searchNotesInput.focus();
};

searchNotesInput.addEventListener("keyup", filterNotes);

formInput.addEventListener("click", (e) => {
  e.preventDefault();
  const isClickClose = closeButton.contains(e.target);
  const isClickSubmit = submitButton.contains(e.target);
  if (isClickClose) {
    hideAndClearForm();
    return;
  }
  if (isClickSubmit) {
    saveNoteToDB(e);
    return;
  }
  showForm();
});

document.addEventListener("click", function (e) {
  e.stopPropagation();

  if (e.target.classList.contains("buttonTrash")) {
    removeNote(e.target);
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
