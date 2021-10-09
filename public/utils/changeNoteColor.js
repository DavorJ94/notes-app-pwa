export default function changeNoteColor(target) {
  const parentNode = target.parentNode;
  const parentNodeName = parentNode.getAttribute("name");
  const clickedColor = target.getAttribute("data-color");
  const clickedColorText = target.getAttribute("data-text-color");

  db.collection("notes")
    .doc(auth.currentUser?.uid)
    .collection("notes")
    .doc(parentNodeName)
    .update({
      bkgColor: clickedColor,
      textColor: clickedColorText,
    });
}
