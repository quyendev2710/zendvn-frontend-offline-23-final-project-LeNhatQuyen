const elAuthForm = document.getElementById("auth-form");
const elFormMessage = document.getElementById("form-messages");
const elEmail = document.getElementById("email");
const elPhone = document.getElementById("phone");
const elName = document.getElementById("name");
const elAddress = document.getElementById("address");

API.callWithToken()
  .get("auth/me")
  .then((res) => {
    const data = res.data.data;
    elEmail.value = data.email;
    elName.value = data.name;
    elPhone.value = data.phone;
    elAddress.value = data.address;
  })
  .catch((err) => {
    window.location.href = "404.html";
  });

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);

  API.callWithToken().put('auth/update', data).then(res =>{
    elFormMessage.innerHTML = /* html */`
        <div class="alert alert-success" role="alert">
            Thay đổi thông tin thành công
        </div>`;
  }).catch(err => {
    const errors = err.response.data.errors;

    let errString = '';

    for (const property in errors) {
        errString += /* html */ `<li>${errors[property]}</li>`
    }
    elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">${errString}</div>`
  })

});
