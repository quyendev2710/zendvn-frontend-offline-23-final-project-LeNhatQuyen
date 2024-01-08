// access key 6V2K_BJCnAnfg_2aAvyR_U6HD5Kxb3bHe0IYx6j8JVA
// Secret key imfjtXXSz9yAWZ_vsMxcrWlVkP1EZdAs9wB2QZLlo90

// https://api.unsplash.com/photos/random?client_id=6V2K_BJCnAnfg_2aAvyR_U6HD5Kxb3bHe0IYx6j8JVA&orientation=landscape

API.callWithToken()
  .get("auth/me")
  .then((res) => {
    // todo
  })
  .catch((err) => {
    window.location.href = "index.html";
});


ClassicEditor.create(document.querySelector("#content")).catch((error) => {
  console.error(error);
});

const elAuthorForm = document.getElementById("auth-form");
const elFormMessage = document.getElementById("formMessage");
const elThumb = document.getElementById("thumb");
const elThumbPreview = document.getElementById("thumbPreview");
const elBtnRandom = document.getElementById("btnRandom");

elBtnRandom.addEventListener("click", function () {
  API.call()
    .get(
      "https://api.unsplash.com/photos/random?client_id=6V2K_BJCnAnfg_2aAvyR_U6HD5Kxb3bHe0IYx6j8JVA&orientation=landscape"
    )
    .then((res) => {
      const urlThumb = res.data.urls.regular;
      elThumb.value = urlThumb;
      elThumbPreview.src = urlThumb;
    });
});

elThumb.addEventListener("change", function () {
  if (elThumb.value) elThumbPreview.src = elThumb.value;
});

elAuthorForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(elAuthorForm);
  const data = Object.fromEntries(formData);
  API.callWithToken()
    .post("articles/create", data)
    .then((res) => {
      elFormMessage.innerHTML = "";
      elAuthorForm.reset();
      elThumbPreview.src = "./assets/image/placeholder.png";
      
      showToastMessage('Thêm bài viết thành công');
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      showFormErrors(errors, elFormMessage);
    });
});
