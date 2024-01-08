API.callWithToken().get("auth/me").then((res) => {
    window.location.href = "index.html";
  });
const elAuthForm = document.getElementById("auth-form");
const elEmail = document.getElementById("email");
const elPassWord = document.getElementById("password");
const elFormMessage = document.getElementById('form-messages');

elAuthForm.addEventListener("submit", function (e) {
  e.preventDefault();


  const formData = new FormData(elAuthForm);
  const data = Object.fromEntries(formData);
  console.log(data);

  API.call()
    .post("auth/login", data)
    .then((res) => {

        
        const token = res.data.access_token;
        localStorage.setItem('ACCESS_TOKEN', token);
        window.location.href = "index.html";
    })
    .catch(function (error) {
        elFormMessage.innerHTML = `<div class="alert alert-danger" role="alert">
        Thông tin đăng nhập không đúng, Vui lòng thử lại sau</div>`;
        elEmail.value = '';
        elPassWord.value = '';
    });
});
