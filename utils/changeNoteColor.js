export default function changeNoteColor(e) {
  const parentNodeName = e.parentNode.getAttribute("name");
  const clickedColor = e.getAttribute("data-color");
  const clickedColorText = e.getAttribute("data-text-color");
  const noteItem = document.getElementById(`note-${parentNodeName}`);
  const titleNode = noteItem.childNodes[1];
  const textNode = noteItem.childNodes[3];

  noteItem.style.backgroundColor = clickedColor;
  titleNode.style.color = clickedColorText;
  textNode.style.color = clickedColorText;

  db.collection("notes")
    .doc(auth.currentUser?.uid)
    .collection("notes")
    .doc(parentNodeName)
    .update({
      bkgColor: clickedColor,
      textColor: clickedColorText,
    });
}
