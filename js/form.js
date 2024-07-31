const loader = document.querySelector(".loader");

const submitBtn = document.querySelector(".submit-btn");
const name = document.querySelector("#name") || null;
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const number = document.querySelector("#number") || null;
const tac = document.querySelector("#terms-and-cond") || null;
const notification = document.querySelector("#notification") || null;

submitBtn.addEventListener("click", () => {
  if (name != null) {
    if (name.value.length < 3) {
      showAlert("Name must be atleast three letters long");
    } else if (!email.value.length) {
      showAlert("Please enter your e-mail");
    } else if (password.value.length < 8) {
      showAlert("Password must be atleast eight characters long");
    } else if (!number.value.length) {
      showAlert("Please enter your phone number");
    } else if (!Number(number.value) || number.value.length < 10) {
      showAlert("Invalid Number");
    } else if (!tac.checked) {
      showAlert("You must agree all terms and conditions");
    } else {
      loader.style.display = "block";
      sendData("/signup", {
        name: name.value,
        email: email.value,
        password: password.value,
        number: number.value,
        tac: tac.checked,
        notification: notification.checked,
        seller: false,
      });
    }
  } else {
    if (!email.value.length || !password.value.length) {
      showAlert("Kindly fill all the inputs");
    } else {
      loader.style.display = "block";
      sendData("/login", {
        email: email.value,
        password: password.value,
      });
    }
  }
});

window.onload = () => {
  if (sessionStorage.user) {
    user = JSON.parse(sessionStorage.user);
    if (compareToken(user.authToken, user.email)) {
      location.replace("/");
    }
  }
};
