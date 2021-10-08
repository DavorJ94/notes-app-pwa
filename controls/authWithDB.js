import changeNoteColorFromDB from "../utils/changeNoteColorFromDB.js";
import { modifyCards } from "../utils/modalFunction.js";
import createNewNote from "../utils/createNewNote.js";
import { setupUI } from "../utils/setupUI.js";

const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const searchNotesContainer = document.querySelector(".searchNotesContainer");
const searchNotesInput = document.querySelector(".searchNotes");
const notesMessage = document.querySelector(".notes-message");
const signInWithGoogleButton = document.querySelector(".google-btn");

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("notes/" + user.uid + "/notes").onSnapshot((snapshot) => {
      const changes = snapshot.docChanges();

      changes.forEach((change) => {
        if (change.type === "added") {
          createNewNote({ ...change.doc.data(), id: change.doc.id });
        } else if (change.type === "removed") {
          document.getElementById(`note-${change.doc.id}`).remove();
        } else if (change.type === "modified") {
          modifyCards({ ...change.doc.data(), id: change.doc.id });
          changeNoteColorFromDB({ ...change.doc.data(), id: change.doc.id });
        }
      });
      if (snapshot.docs.length > 2) {
        searchNotesContainer.style.display = "flex";
      } else {
        if (searchNotesInput.value === "")
          searchNotesContainer.style.display = "none";
        if (snapshot.docs.length === 0) notesMessage.style.display = "block";
        else notesMessage.style.display = "none";
      }
    });
    setupUI(user);
  } else {
    setupUI();
  }
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((credentials) => {
      db.collection("notes").doc(credentials.user.uid).collection("notes");
      signUpForm.reset();
      signUpFormContainer.style.display = "none";
      signUpForm.querySelector(".signuperror").innerHTML = "";
    })
    .catch((err) => {
      signUpForm.querySelector(".signuperror").innerHTML = err.message;
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      loginForm.reset();
      loginFormContainer.style.display = "none";
      loginForm.querySelector(".loginerror").innerHTML = "";
    })
    .catch((err) => {
      loginForm.querySelector(".loginerror").innerHTML = err.message;
    });
});

signInWithGoogleButton.addEventListener("click", () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(googleProvider)
    .then((result) => {
      setupUI(true);
      loginFormContainer.style.display = "none";
      signUpFormContainer.style.display = "none";
    })
    .catch((error) => {
      console.log("There was an error", error.message);
    });
});
