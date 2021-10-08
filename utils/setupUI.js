const logInBtn = document.querySelector("#logInBtn");
const signUpBtn = document.querySelector("#signUpBtn");
const logOutBtn = document.querySelector("#logOutBtn");
const signInWithGoogleButton = document.querySelector(".google-btn");

export function setupUI(user) {
  if (user) {
    logInBtn.style.display = "none";
    signUpBtn.style.display = "none";
    signInWithGoogleButton.style.display = "none";
    logOutBtn.style.display = "block";
    mainContent.style.display = "block";
  } else {
    document.querySelector(".note-container").innerHTML = "";
    signUpBtn.style.display = "block";
    logInBtn.style.display = "block";
    signInWithGoogleButton.style.display = "flex";
    logOutBtn.style.display = "none";
    loginFormContainer.style.display = "block";
  }
}
