API.callWithToken()
  .get("auth/me")
  .then((res) => {
    // todo
  })
  .catch((err) => {
    window.location.href = "index.html";
  });

ClassicEditor.create(document.querySelector("#content"))
  .then((newEditor) => {
    editor = newEditor;
  })
  .catch((error) => {
    console.error(error);
  });

let editor;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));

const elAuthorForm = document.getElementById("auth-form");
const elFormMessage = document.getElementById("formMessage");
const elThumb = document.getElementById("thumb");
const elThumbPreview = document.getElementById("thumbPreview");
const elBtnRandom = document.getElementById("btnRandom");
const elTitle = document.getElementById("title");
const elCategoryId = document.getElementById("category_id");
const elDescription = document.getElementById("description");
const elContent = document.getElementById("content");

API.call()
  .get(`articles/${id}`)
  .then((res) => {
    const articles = res.data.data;

    elThumb.value = articles.thumb;
    elThumbPreview.src = articles.thumb;
    elTitle.value = articles.title;
    elDescription.value = articles.description;
    elCategoryId.value = articles.category_id;
    elContent.value = articles.content;
    editor.setData(articles.content);
  })
  .catch(function (error) {
    window.location.href = "404.html";
  });

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
    .put(`articles/${id}`, data)
    .then((res) => {
        window.location.href = 'articles-list-admin.html';
    })
    .catch((err) => {
      const errors = err.response.data.errors;
      showFormErrors(errors, elFormMessage);
    });
});
