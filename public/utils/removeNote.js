function removeNote(target, shouldSetId) {
  let id;
  if (shouldSetId) {
    id = target;
  } else {
    id = target.getAttribute("name");
  }

  db.collection("notes")
    .doc(auth.currentUser?.uid)
    .collection("notes")
    .doc(id)
    .delete();
}

export default removeNote;
