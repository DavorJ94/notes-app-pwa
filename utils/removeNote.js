function removeNote(target) {
  const notesMessage = document.querySelector(".notes-message");
  const name = target.getAttribute("name");
  localStorage.removeItem(name);
  const noteElement = document.getElementById(`note-${name}`);
  noteElement.remove();
  const storageItems = Object.values({ ...localStorage });
  if (storageItems.length === 0) {
    notesMessage.style.display = "block";
  } else {
    notesMessage.style.display = "none";
  }
}

export default removeNote;
