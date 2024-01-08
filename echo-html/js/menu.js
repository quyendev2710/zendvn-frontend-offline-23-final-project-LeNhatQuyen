const elMainMenu = document.getElementById("mainMenu");
const elmenuMobile = document.querySelector('.menuMobile');


API.call()
  .get("categories_news")
  .then((response) => {
    const data = response.data;
    const categories = data.data;
    let htmlMenu = "";
    let htmlMenuOther = "";
    let htmlMenuMobile = '';
    let htmlMenuMobileOther = '';
    categories.forEach((item, index) => {
      if (index < 3) {
        htmlMenu += /*html */`<li class="menu-item"><a href="category.html?id=${item.id}" class="echo-dropdown-main-element">${item.name}</a></li>`;
        htmlMenuMobile += /*html */ `<li class="menu-item"><a class="main mobile-menu-link" href="category.html?id=${item.id}">${item.name}</a></li>`
      } else {
        htmlMenuOther += `<li class="nav-item"><a href="category.html?id=${item.id}">${item.name}</a></li>`;
        htmlMenuMobileOther += /* html */ `<li><a class="mobile-menu-link" href="category.html?id=${item.id}">${item.name}</a></li>`;
      }
    });
    elMainMenu.innerHTML =
      htmlMenu +
      /* html */
      ` <li class="menu-item echo-has-dropdown">
          <a href="#" class="echo-dropdown-main-element">
              <span>Doanh mục khác </span>
              <i class="bi bi-chevron-down dropdown-indicator"></i>
          </a>
          <ul class="echo-submenu list-unstyled">${htmlMenuOther}</ul>    
        </li>`;

    elmenuMobile.innerHTML = 
      htmlMenuMobile + 
      /*html */
      `<li class="has-droupdown">
        <a href="#" class="main menuMobileChild">Danh mục khác</a>
        <ul class="submenu mm-collapse">
          ${htmlMenuMobileOther}
        </ul>
      </li>`


    const token = localStorage.getItem("ACCESS_TOKEN");

    API.callWithToken()
      .get("auth/me")
      .then((resMe) => {
        const name = resMe.data.data.name;
        elMainMenu.innerHTML += /* html */ `
        <li class='menu-item echo-has-dropdown'>
          <a href="#" class="echo-dropdown-main-element">
            <span>${name}</span>
            <i class="bi bi-chevron-down dropdown-indicator"></i>
          </a>
          <ul class="echo-submenu list-unstyled">
            <li class="nav-item"><a href="profiles.html">Thông tin tài khoản</a><li>
            <li class="nav-item"><a href="change-password.html">Cập nhật mật khẩu</a><li>
            <li class="nav-item"><a href="articles-create-admin.html">Thêm bài viết</a><li>
            <li class="nav-item"><a href="articles-list-admin.html">Quản lý bài viết</a><li>
            <li class="nav-item"><a href="register.html" id="btnLogout">Đăng xuất</a><li>
          </ul>    
        </li>`;
        elmenuMobile.innerHTML += /* html */ `
        <li class="has-droupdown">
          <a href="#" class="main menuMobileChild">${name}</a>
          <ul class="submenu mm-collapse">
            <li ><a class="mobile-menu-link" href="profiles.html">Thông tin tài khoản</a></li>
            <li><a class="mobile-menu-link" href="change-password.html">Cập nhật mật khẩu</a></li>
            <li><a class="mobile-menu-link" href="articles-create-admin.html">Thêm bài viết</a></li>
            <li><a class="mobile-menu-link" href="articles-list-admin.html">Quản lý bài viết</a></li>
            <li><a class="mobile-menu-link" href="register.html" id="btnLogout">Đăng xuất</a></li>
          </ul>
        </li>`
      })
      .catch((err) => {
        elMainMenu.innerHTML += /* html */ `
        <li class='menu-item echo-has-dropdown'>
          <a href="#" class="echo-dropdown-main-element">
            <span>Tài khoản</span>
            <i class="bi bi-chevron-down dropdown-indicator"></i>
          </a>
          <ul class="echo-submenu list-unstyled">
            <li class="nav-item"><a href="login.html">Đăng nhập</a><li>
            <li class="nav-item"><a href="register.html">Đăng ký</a><li>
          </ul>    
        </li>`;
        elmenuMobile.innerHTML += /* html */ `
        <li class="has-droupdown">
          <a href="#" class="main menuMobileChild">Tài khoản</a>
          <ul class="submenu mm-collapse">
            <li><a class="mobile-menu-link" href="login.html">Đăng nhập</a></li>
            <li><a class="mobile-menu-link" href="register.html">Đăng ký</a></li>
          </ul>
        </li>`
      });
  });

  document.addEventListener('click', function(e){
    const el = e.target;

    if(el.classList.contains('menuMobileChild')){
      el.parentElement.classList.toggle('mm-active');
      el.nextElementSibling.classList.toggle('mm-show');
    }

  })

elMainMenu.addEventListener("click", function (e) {
  const el = e.target;
  if (el.id === "btnLogout") {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    window.location.href = "index.html";
  }
});
