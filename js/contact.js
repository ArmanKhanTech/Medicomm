const name = document.querySelector("#name");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const phone = document.querySelector("#phone");

const submit = document.querySelector(".btn");

submit.addEventListener("click", (e) => {
  fetch("/submit-query", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      message: message.value,
      phone: phone.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data == "success") {
        showAlert1("Query Submitted Successfully", "success");
        setTimeout(() => {
          location.replace("/");
        }, 2000);
      }
    });
});
