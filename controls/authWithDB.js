import createNewNote from "../utils/createNewNote.js";
import { setupUI } from "../utils/setupUI.js";
const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");

auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("notes")
      .doc(user.uid)
      .collection("notes")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((note) => {
          createNewNote({ ...note.data(), id: note.id });
        });
      })
      .catch((err) => {
        console.log("err occured");
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

  auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
    db.collection("notes")
      .doc(credentials.user.uid)
      .set({ notes: [] })
      .catch((err) => {
        console.log("err occured", err.message);
      });

    signUpForm.reset();
    signUpFormContainer.style.display = "none";
  });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  auth.signInWithEmailAndPassword(email, password).then((credentials) => {
    loginForm.reset();
    loginFormContainer.style.display = "none";
  });
});
