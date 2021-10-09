const modal = document.getElementById("myModal");
const titleInput = document.querySelector(".titleInputModal");
const textInput = document.querySelector(".noteInputModal");
const labelInput = document.querySelector(".labelInputModal");
const modalError = document.querySelector(".submitModalNoteError");

export default function modalFunction(id) {
  modal.style.display = "block";
  titleInput.value = "";
  textInput.value = "";
  labelInput.value = "";
  modal.setAttribute("data-currentNote", `${id}`);
  const clickedNoteTitle = document.querySelector(`#title-${id}`).innerText;
  const clickedNoteText = document.querySelector(`#text-${id}`).innerText;
  if (document.querySelector(`#labelContainer-${id}`)) {
    const clickedNoteLabels = document
      .querySelector(`#labelContainer-${id}`)
      .innerText.replace(/\n/g, ", ");
    labelInput.value = clickedNoteLabels;
  }

  if (clickedNoteTitle !== "(no title)") titleInput.value = clickedNoteTitle;
  if (clickedNoteText !== "(no description)") textInput.value = clickedNoteText;
}

export function saveModalValuesToDB(e) {
  e.preventDefault();
  const currentId = document
    .querySelector("#myModal")
    .getAttribute("data-currentNote");
  if (!titleInput.value && !textInput.value)
    return (modalError.innerHTML = "Fill out title or text form.");
  else modalError.innerHTML = "";

  db.collection("notes")
    .doc(auth.currentUser?.uid)
    .collection("notes")
    .doc(currentId)
    .update({
      titleInput: titleInput.value,
      noteInput: textInput.value,
      labelInput: labelInput.value,
    });
  titleInput.value = "";
  textInput.value = "";
  labelInput.value = "";
  modal.style.display = "none";
}

export function modifyCards(data) {
  const clickedNoteTitle = document.querySelector(`#title-${data.id}`);
  const clickedNoteText = document.querySelector(`#text-${data.id}`);
  const clickedNoteLabels = document.querySelector(
    `#labelContainer-${data.id}`
  );

  if (data.titleInput) {
    clickedNoteTitle.innerText = data.titleInput;
    clickedNoteTitle.style.fontSize = "";
    clickedNoteTitle.style.fontStyle = "";
  } else {
    clickedNoteTitle.innerText = "(no title)";
    clickedNoteTitle.style.fontSize = "10px";
    clickedNoteTitle.style.fontStyle = "italic";
  }

  if (data.noteInput) {
    clickedNoteText.innerText = data.noteInput;
    clickedNoteText.style.fontSize = "";
    clickedNoteText.style.fontStyle = "";
  } else {
    clickedNoteText.innerText = "(no description)";
    clickedNoteText.style.fontSize = "10px";
    clickedNoteText.style.fontStyle = "italic";
  }

  if (data.labelInput) {
    let eachLabelItem = data.labelInput
      .replace(/, /g, ",")
      .split(",")
      .map((item) => {
        return `<div class="label">${item}</div>`;
      })
      .join("");
    clickedNoteLabels.innerHTML = eachLabelItem;
  }
}
