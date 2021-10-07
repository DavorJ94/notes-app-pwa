import { hideAndClearForm } from "./hideShowForm.js";

const errorSubmitNote = document.querySelector(".submitNoteError");
const noteInput = document.querySelector(".noteInput");
const titleInput = document.querySelector("#titleInput");
const labelInput = document.querySelector("#labelInput");

export function saveNoteToDB(e) {
  e.preventDefault();
  if (!titleInput.value && !noteInput.value) {
    errorSubmitNote.innerHTML = "Fill out title or text form.";
    return;
  } else {
    errorSubmitNote.innerHTML = "";
  }

  db.collection("notes")
    .doc(auth.currentUser?.uid)
    .collection("notes")
    .add({
      titleInput: titleInput.value,
      noteInput: noteInput.value,
      labelInput: labelInput.value,
      bkgColor: "white",
      textColor: "#5f6368",
    })
    .then(() => {
      hideAndClearForm();
    });
}
