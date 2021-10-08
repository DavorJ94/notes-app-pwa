export default function changeNoteColorFromDB(data) {
  const noteItem = document.getElementById(`note-${data.id}`);
  const titleNode = noteItem.childNodes[1];
  const textNode = noteItem.childNodes[3];

  noteItem.style.backgroundColor = data.bkgColor;
  titleNode.style.color = data.textColor;
  textNode.style.color = data.textColor;
}
