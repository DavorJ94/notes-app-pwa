function removeNote(target) {
  const id = target.getAttribute("name");

  db.collection("notes")
    .doc(auth.currentUser?.uid)
    .collection("notes")
    .doc(id)
    .delete()
    .then(() => {
      document.getElementById(`note-${id}`).remove();
    });
}

export default removeNote;
