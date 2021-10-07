const signUpForm = document.getElementById("signUpForm");
const loginForm = document.getElementById("loginForm");
const logInBtn = document.querySelector("#logInBtn");
const signUpBtn = document.querySelector("#signUpBtn");
const logOutBtn = document.querySelector("#logOutBtn");

auth.onAuthStateChanged((user) => {
  if (user) {
    logInBtn.style.display = "none";
    signUpBtn.style.display = "none";
    logOutBtn.style.display = "block";
    mainContent.style.display = "block";
  } else {
    signUpBtn.style.display = "block";
    logInBtn.style.display = "block";
    logOutBtn.style.display = "none";
    loginFormContainer.style.display = "block";
  }
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signUpForm.email.value;
  const password = signUpForm.password.value;

  auth.createUserWithEmailAndPassword(email, password).then((credentials) => {
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
