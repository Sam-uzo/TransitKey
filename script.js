export const signUpBtn = document.querySelector(".SignUp-btn");

export function signUpBtnHandler() {
  if (document.title == "Create Account") {
    signUpBtn.addEventListener("click", () => {
      window.location.href = "./passenger-login.html";
    });
  } else if (document.title == "Login") {
    signUpBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  } else {
    signUpBtn.addEventListener("click", () => {
      window.location.href = "./index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  signUpBtnHandler();
});
