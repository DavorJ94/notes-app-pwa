const titleInput = document.querySelector("#titleInput");
const labelInput = document.querySelector("#labelInput");
const formButtons = document.querySelector(".form-buttons");
const noteInput = document.querySelector(".noteInput");

export function hideAndClearForm() {
  titleInput.value = "";
  noteInput.value = "";
  labelInput.value = "";
  titleInput.style.display = "none";
  formButtons.style.display = "none";
  labelInput.style.display = "none";
  noteInput.style.borderBottom = "none";
}

export function showForm() {
  titleInput.style.display = "inline-block";
  formButtons.style.display = "flex";
  labelInput.style.display = "inline-block";
  noteInput.style.borderBottom = "0.5px solid #5f636898";
  setDefaultTextArea(noteInput);
}

function setDefaultTextArea(element) {
  element.style.height = "inherit";
}
