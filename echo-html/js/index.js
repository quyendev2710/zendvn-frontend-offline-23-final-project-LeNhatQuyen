const elArticleMain = document.getElementById("articlesMain");
const elArticleOther = document.getElementById("articleOther");
const elArticleNew = document.getElementById("articleNew");
const elCategoriesFeatureWithArticles = document.getElementById(
  "categoriesFeatureWithArticles"
);
const elRecentPost = document.getElementById('recentPost');
const elCategoriesColwithArticles = document.getElementById('categoriesColwithArticles');
let recentPostIds = RECENT_POST.toString();

API.call().get(`articles?limit=3&ids=${recentPostIds}`).then(res => {
    const articles = res.data.data;
    let html ='';
    articles.forEach(item => {
      html += /* html */ `
      <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
        <div class="echo-popular-area-single-item">
            <div class="echo-popular-area-img img-transition-scale">
                <a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
            </div>
            <div class="echo-popular-area-item-title">
                <h5 class="text-center text-capitalize"><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h5>
            </div>
            <div class="echo-popular-area-read-view text-center">
                <a href="#" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(item.publish_date).fromNow()}</a>
                <a href="#" class="pe-none"><i class="fa-light fa-eye"></i> 3.5k Views</a>
            </div>
        </div>
      </div>`
    })
    elRecentPost.innerHTML = html;
    elpreloader.remove();
})

API.call()
  .get("articles?limit=9")
  .then((res) => {
    const articles = res.data.data;
    let html = "";
    articles.forEach((item, index) => {
      if (index === 0) {
        elArticleMain.innerHTML = renderArticlsMain(item);
      } else {
        html += renderArticlesOther(item);
      }
    });
    elArticleOther.innerHTML = html;
  });

API.call()
  .get("articles/popular?limit=8")
  .then((res) => {
    const articles = res.data.data;

    let html = "";
    articles.forEach((item) => {
      html += /* html */ `
        <div class="swiper-slide">
            <div class="echo-latest-news-main-content">
                <div class="echo-latest-news-img img-transition-scale">
                    <a href="detail.html?id=${item.id}">
                        <img src="${
                          item.thumb
                        }" alt="Echo" class="img-hover h-100">
                    </a>
                </div>
                <div class="echo-latest-news-single-title">
                    <h5><a href="detail.html?id=${item.id}" class="text-capitalize title-hover">${
                      item.title
                    }</a></h5>
                </div>
                <div class="echo-latest-news-time-views">
                    <a href="detail.html?id=${item.id}" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(
                      item.publish_date
                    ).fromNow()}</a>
                    <a href="detail.html?id=${item.id}" class="pe-none"><i class="fa-light fa-eye"></i>${
                      item.author
                    }</a>
                </div>
            </div>
        </div>`;
    });
    elArticleNew.innerHTML = html;
  });

// Render category feature
API.call()
  .get("categories_news/articles?limit_cate=4&limit=6")
  .then((res) => {
    const data = res.data.data;
    let html = "";
    data.forEach((item, index) => {
      const categoryName = item.name;
      const articles = item.articles;
       
      html += /* html */ `
        <section class="echo-trending-area">
            <div class="echo-trending-content">
                <div class="container">
                    <a href="detail.html?id=${item.id}"><h6>${categoryName}</h6></a>
                    <div class="echo-trending-full-content">
                        ${renderArticlesByCategoryFeature(articles, index)}
                    </div>
                </div>
            </div>
        </section>`;
    });
    elCategoriesFeatureWithArticles.innerHTML = html;
  });

API.call().get('categories_news/articles?limit_cate=3&limit=3').then(res => {
    const data = res.data.data;
    let htmlMain = '';
    data.forEach(item => {
        const categoryName = item.name;
        const articles = item.articles;

        htmlMain += /* html */ `
        <div class="col-xl-4 col-lg-4 col-md-6">
            <div class="echo-de-category-content echo-responsive-wd">
                <h5 class="text-capitalize">${categoryName}</h5>
                <hr>
                ${renderArticlesColByCategory(articles)}
                <div class="echo-de-category-show-more-btn">
                    <a href="category.html?id=${item.id}" class="text-capitalize echo-py-btn">Show more</a>
                </div>
            </div>
        </div>` 
    });
    elCategoriesColwithArticles.innerHTML = htmlMain;
})

API.call().get('https://api.tomorrow.io/v4/weather/forecast?location=10.762622,106.660172&apikey=czXSTyRZk1COxhcI2448GWj3JtpJI4IB').then(res => {
  const data = res.data;
  const weatherHourly = Math.ceil(data.timelines.hourly[0].values.temperature);
})


function renderArticlesOther(item) {
  return /* html */ `
    <div class="echo-top-story">
        <div class="echo-story-picture img-transition-scale">
            <a href="detail.html?id=${item.id}"><img src="${
              item.thumb
            }" alt="Echo" class="img-hover"></a>
        </div>
        <div class="echo-story-text">
            <h4><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h4>
            <a href="#" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(
              item.publish_date
            ).fromNow()}</a>
        </div>
    </div>`;
}

function renderArticlsMain(item) {
  return /* html */ `
    <div class="echo-hero-baner">
        <div class="echo-hero-banner-main-img  img-transition-scale">
            <a href="detail.html?id=${item.id}"><img class="banner-image-one img-hover w-100" src="${
              item.thumb
            }" alt="Echo"></a>
        </div>
        <h1 class="echo-hero-title text-capitalize font-weight-bold"><a href="detail.html?id=${item.id}" class="title-hover">${
          item.title
        }</a></h1>
        <hr>
        <p class="echo-hero-discription">${item.content}</p>
        <div class="echo-hero-area-titlepost-post-like-comment-share">
            <div class="echo-hero-area-like-read-comment-share">
                <a href="#"><i class="fa-light fa-clock"></i>${dayjs(
                  item.publish_date
                ).fromNow()}</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
                <a href="#"><i class="fa-light fa-eye"></i>3.5k Views</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
                <a href="#"><i class="fa-light fa-comment-dots"></i>05 Comment</a>
            </div>
            <div class="echo-hero-area-like-read-comment-share">
                <a href="#"><i class="fa-light fa-arrow-up-from-bracket"></i>1.5k Share</a>
            </div>
        </div>
    </div>`;
}

function renderArticlesByCategoryFeature(articles, idx){
    let htmlArticlesLeft = "";
    let htmlArticlesRight = "";

    articles.forEach((articlesItem, index) => {
      const title = articlesItem.title;
      const thumb = articlesItem.thumb;
      const publishDate = articlesItem.publish_date;
      
      if (index < 4) {
        htmlArticlesLeft += /* html */`
        <div class="echo-trending-left-site-post">
              <div class="echo-trending-left-site-post-img img-transition-scale">
                  <a href="detail.html?id=${articlesItem.id}">
                      <img src="${thumb}" alt="${title}" class="img-hover">
                  </a>
              </div>
              <div class="echo-trending-right-site-post-title">
                  <h5><a href=detail.html?id=${articlesItem.id}" class="text-capitalize title-hover">${title}</a></h5>
                  <div class="echo-trending-post-bottom-icons">
                      <a href="detail.html?id=${articlesItem.id}" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(publishDate).fromNow()}</a>
                      <a href="#" class="pe-none"><i class="fa-light fa-eye"></i>3.5k Views</a>
                  </div>
              </div>
          </div>`;
      } else {
        htmlArticlesRight += /* html */`
        <div class="echo-trending-right-site-post">
            <div class="echo-trending-right-site-post-img img-transition-scale">
                  <a href="detail.html?id=${articlesItem.id}">
                      <img src="${thumb}" alt="Echo" class="img-hover">
                  </a>
            </div>
            <div class="echo-trending-right-site-post-title">
                  <h4 class="text-capitalize"><a href="detail.html?id=${articlesItem.id}" class="title-hover">${title}</a></h4>
            </div>
            <div class="echo-trending-right-site-like-comment-share-icons">
                <div class="echo-trending-right-like-comment-content">
                    <a href="#" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(publishDate).fromNow()}</a>
                </div>
                <div class="echo-trending-right-like-comment-content">
                    <a href="#" class="pe-none"><i class="fa-light fa-eye"></i>3.5k Views</a>
                </div>
                <div class="echo-trending-right-like-comment-content">
                    <a href="#" class="pe-none"><i class="fa-light fa-comment-dots"></i> 05
                        Comment</a>
                </div>
                <div class="echo-trending-right-like-comment-content">
                    <a href="#" class="pe-none"><i class="fa-light fa-arrow-up-from-bracket"></i>
                        1.5k Share</a>
                </div>
            </div>
        </div>`;
      }
    });


    const rowClass = idx % 2 === 0 ? '' : 'flex-row-reverse';
    return /* html */`
    <div class="row gx-6 ${rowClass}">
        <div class="col-xl-6 col-lg-6 col-md-12">
        ${htmlArticlesLeft}
        </div>
        <div class="col-xl-6 col-lg-6 col-md-12">
            ${htmlArticlesRight}
        </div>
    </div>`

}

function renderArticlesColByCategory(articles){
    let htmlChild = '';
    articles.forEach(articlesItem => {
        const publishDate = articlesItem.publish_date;
        htmlChild += /* html */`
        <div class="echo-de-category-content-img-title">
            <div class="echo-de-category-content-img img-transition-scale">
                <a href="detail.html?id=${articlesItem.id}">
                    <img src="${articlesItem.thumb}" alt="${articlesItem.title}" class="img-hover">
                </a>
            </div>
            <div class="echo-de-category-content-title">
                <h6><a href="detail.html?id=${articlesItem.id}" class="title-hover">${articlesItem.title}</a></h6>
                <div class="echo-de-category-read">
                    <a href="#" class="pe-none"><i class="fa-light fa-clock"></i>${dayjs(publishDate).fromNow()}</a>
                </div>
            </div>
        </div>`
    })
    return htmlChild;
   
}