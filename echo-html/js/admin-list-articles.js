API.callWithToken()
  .get("auth/me")
  .then((res) => {
    // todo
  })
  .catch((err) => {
    window.location.href = "index.html";
  });

const elArticles = document.getElementById("articles");

//list

API.callWithToken()
  .get("articles/my-articles")
  .then((res) => {
    const articles = res.data.data;
    let html = "";

    articles.forEach((item) => {
      const checked = item.status === "1" ? "checked" : "";

      html += /* html */ `
        <tr>
            <td>${item.id}</td>
            <td>
              <img src="${item.thumb}" alt="" width="150px">
            </td>
            <td>${item.title}</td>
            <td>${renderSlbCategories(item.category.id, item.id)}</td>
            <td><input type="checkbox" class="form-check-input chk-status" ${checked} data-id="${item.id}" /></td>
            <td>
                <a href="detail.html?id=${item.id}" class="btn btn-info">View</a>
                <a href="articles-update-admin.html?id=${item.id}" class="btn btn-warning">Edit</a>
                <button class="btn btn-danger btn-delete" data-id="${item.id}">Delete</button>
            </td>
        </tr>`;
    });
    elArticles.innerHTML = html;
  });

elArticles.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("btn-delete")) {
    const articlesId = el.dataset.id;
    API.callWithToken()
      .delete(`articles/${articlesId}`)
      .then((res) => {
        showToastMessage("Xoá bài viết thành công");
        el.parentElement.parentElement.remove();
    });
  }
});

elArticles.addEventListener("change", function (e) {
  const el = e.target;

  if (el.classList.contains("category")) {
    const categoryId = el.value;
    const articlesId = el.dataset.id;
    API.callWithToken()
      .patch(`articles/${articlesId}`, { category_id: categoryId })
      .then((res) => {
        showToastMessage("Thay đổi doanh mục bài viết thành công");
      });
  }
  if (el.classList.contains("chk-status")) {
    const status = el.checked ? 1 : 0;
    const articlesId = el.dataset.id;
    API.callWithToken()
      .patch(`articles/${articlesId}`, { status: status })
      .then((res) => {
        showToastMessage("Thay đổi trạng thái thành công");
      });
  }
});

function renderSlbCategories(id, articleId) {
  const categories = [
    { id: 1, name: "Thế Giới" },
    { id: 2, name: "Thời Sự" },
    { id: 3, name: "Kinh Doanh" },
    { id: 5, name: "Giải Trí" },
    { id: 6, name: "Thể Thao" },
    { id: 7, name: "Pháp Luật" },
    { id: 8, name: "Giáo Dục" },
    { id: 9, name: "Sức Khoẻ" },
    { id: 10, name: "Đời Sống" },
    { id: 11, name: "Du Lịch" },
    { id: 12, name: "Khoa Học" },
    { id: 13, name: "Số Hoá" },
    { id: 14, name: "Xe" },
  ];
  let html = "";
  categories.forEach((item) => {
    const selected = item.id === id ? "selected" : "";
    html += `<option value = "${item.id}" ${selected}>${item.name}</option>`;
  });

  return /* html */ `
    <select class="form-select category" data-id="${articleId}">${html}</select>`;
}
