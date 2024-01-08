API.callWithToken().get("auth/me").then((res) => {
    window.location.href = "index.html";
});

const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elPassWord = document.getElementById("password");
const elPhone = document.getElementById("phone");
const elName = document.getElementById("name");
const elAddress = document.getElementById("address");
const elFormMessage = document.getElementById("form-messages");

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);
    
  API.call()
    .post("users/register", data)
    .then(resRegister => {
        const dataLogin = {email: data.email, password: data.password}
        API.call()
        .post("auth/login", dataLogin)
        .then((resLogin) => {
          window.location.href = "index.html";
        })
    })
    .catch(function (error) {
        const err = error.response.data.errors;
        
        let errString = '';

        for (const property in err) {
            errString += /* html */`<li>${err[property]}</li>`
        }
        elFormMessage.innerHTML = /* html */`<div class="alert alert-danger" role="alert">
            <ul>${errString}</ul>
        </div>`;
    });
});
