import { hideAllElements } from "../utils/hideAllElements.js";

const signUpBtn = document.querySelector("#signUpBtn");
const logInBtn = document.querySelector("#logInBtn");
const logOutBtn = document.querySelector("#logOutBtn");

signUpBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideAllElements();
  signUpFormContainer.style.display = "block";
});

logInBtn.addEventListener("click", (e) => {
  e.preventDefault();

  hideAllElements();
  loginFormContainer.style.display = "block";
});

logOutBtn.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    hideAllElements();
    loginFormContainer.style.display = "block";
  });
});

{
  /* <button class="btn" id="logInBtn">Log in</button>
<button class="btn" id="signUpBtn">Sign Up</button>
<button class="btn" id="logOutBtn">Log Out</button> */
}
