function filterNotes() {
  const title = document.querySelectorAll(".noteTitle");
  const noteText = document.querySelectorAll(".noteText");
  const noteLabel = document.querySelectorAll(".labelContainer");
  const searchNotesInput = document.querySelector(".searchNotes");

  for (let i = 0; i < title.length; i++) {
    let parsedTitle = title[i].innerText.toUpperCase();
    let parsedNoteText = noteText[i].innerText.toUpperCase();
    let parsedLabel = noteLabel[i]?.innerText.toUpperCase();
    let parsedInput = searchNotesInput.value.toUpperCase();
    const id = title[i].getAttribute("name");
    const note = document.getElementById(`note-${id}`);

    if (
      parsedTitle.includes(parsedInput) ||
      parsedNoteText.includes(parsedInput) ||
      parsedLabel?.includes(parsedInput)
    ) {
      note.style.display = "flex";
    } else {
      note.style.display = "none";
    }
  }
}

export default filterNotes;
