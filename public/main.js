import { saveNoteToDB } from "./utils/saveNoteToDB.js";
import removeNote from "./utils/removeNote.js";
import changeNoteColor from "./utils/changeNoteColor.js";
import modalFunction, { saveModalValuesToDB } from "./utils/modalFunction.js";
import filterNotes from "./utils/filterNotes.js";
import { hideAndClearForm, showForm } from "./utils/hideShowForm.js";

const formInput = document.querySelector(".formInput");
const submitButton = document.querySelector(".submit");
const closeButton = document.querySelector(".close");
const modal = document.querySelector("#myModal");
const submitModal = document.querySelector(".submitModal");
const searchNotesInput = document.querySelector(".searchNotes");
const modalError = document.querySelector(".submitModalNoteError");

submitModal.addEventListener("click", saveModalValuesToDB);

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
    modalError.innerHTML = "";
  }
});

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

  if (e.target.classList.contains("color-option")) {
    changeNoteColor(e.target);
  }
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
