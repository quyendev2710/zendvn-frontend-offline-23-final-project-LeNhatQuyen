API.callWithToken().get('auth/me').then(res => {
    //todo
}).catch(err => {
    window.location.href = "404.html";
})

const elAuthForm = document.getElementById("auth-form");
const elFormMessage = document.getElementById("form-messages");
const elPasswordCurrent = document.getElementById("password_current");
const elPasswordNew = document.getElementById("password");
const elPasswordConfirmation = document.getElementById("password_confirmation");


elAuthForm.addEventListener("submit", function (e) {
    e.preventDefault();
        
    const formData = new FormData(elAuthForm);
    const data = Object.fromEntries(formData);
  
    API.callWithToken().put("auth/change-password", data).then(res => {
        elPasswordCurrent.value = '';
        elPasswordNew.value = '';
        elPasswordConfirmation.value = '';
        elFormMessage.innerHTML = `<div class="alert alert-success" role="alert">Thay đổi mật khẩu thành công</div>`;
    })
    .catch(err => {
        const errors = err.response.data.errors;


        let errString = '';


        for (const property in errors) {
            errString += /* html */ `<li>${errors[property]}</li>`
        }
        elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">${errString}</div>`;
    })
  });