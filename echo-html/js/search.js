const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const keyword = urlParams.get("keyword");
const elTitleCategory = document.getElementById("titleCategory");
const elMyPagination = document.getElementById("myPagination");
const elArticles = document.getElementById("articles");
let currentPage = parseInt(urlParams.get('page'));

if(isNaN(currentPage)) currentPage = 1;

getArticles(currentPage);

elMyPagination.addEventListener("click", function (e) {
  const el = e.target;
  if (el.classList.contains("page-item")) {
    currentPage = parseInt(el.innerText);
    getArticles(currentPage);
    addOrUpdateUrlParam('page', currentPage)
  }
  if (el.classList.contains("page-item-prev")) {
    currentPage--;
    getArticles(currentPage);
    addOrUpdateUrlParam('page', currentPage)
  }
  if (el.classList.contains("page-item-next")) {
    currentPage++;
    getArticles(currentPage);
    addOrUpdateUrlParam('page', currentPage)
  }
});

function addOrUpdateUrlParam(key, value) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  urlParams.set("key", value);
  const newUrl = window.location.pathname + "?" + urlParams.toString();
  history.pushState(null, "", newUrl);
}

function getArticles(page = 1) {
  API.call()
    .get(`articles/search?q=${keyword}&limit=5&page=${page}`)
    .then((res) => {
      const articles = res.data.data;
      const totalPage = res.data.meta.last_page;
      const total = res.data.meta.total;
      
      let html = "";
      articles.forEach((item) => {
        const regex = new RegExp(keyword, 'gi');

        const title = item.title.replace(regex, (match) => `<mark>${match}</mark>`);
        const thumb = item.thumb;
        const publishDate = item.publish_date;
        const description = item.description.replace(regex, (match) =>  `<mark>${match}</mark>`);
        const authorName = item.author;
        html += /* html */ `
            <div class="echo-hero-baner">
                <div class="echo-inner-img-ct-1  img-transition-scale">
                    <a href="detail.html?id=${item.id}"><img src="${thumb}" alt="Echo" class="w-100 h-100"></a>
                </div>
                <div class="echo-banner-texting">
                    <h3 class="echo-hero-title text-capitalize font-weight-bold"><a href="detail.html?id=${item.id}" class="title-hover">${title}</a></h3>
                    <div class="echo-hero-area-titlepost-post-like-comment-share">
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-clock"></i>${dayjs(
                              publishDate
                            ).fromNow()}</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-eye"></i>${authorName}</a>
                        </div>
                        <div class="echo-hero-area-like-read-comment-share">
                            <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i>1.5k Share</a>
                        </div>
                    </div>
                    <hr>
                    <p class="echo-hero-discription">${description}</p>
                </div>
            </div>`;
      });
      elTitleCategory.innerText = `Tìm thấy ${total} bài viết với từ khoá ${keyword}`;
      elArticles.innerHTML = html;
      renderPagination(totalPage);
      elpreloader.remove(); 
    })
    .catch(function (error){
        window.location.href = 'index.html';
    })
}

function renderPagination(total) {
  const disabledPrev = currentPage === 1 ? "pointer-events-none" : "";
  const disabledNext = currentPage === total ? "pointer-events-none" : "";
  let html = `<a href="#" class="prev page-item-prev ${disabledPrev}">Previous</a>`;
  for (let index = 1; index <= total; index++) {
    const active = index === currentPage ? "active pointer-events-none" : "";
    html += /* html */ `<a href="#" class="page-item ${active}">${index}</a>`;
  }
  html += `<a href="#" class="next page-item-next ${disabledNext}">Next</a>`;
  elMyPagination.innerHTML = html;
}
