const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = parseInt(urlParams.get("id"));
const elCategoryName = document.getElementById("categoryName");
const elPublishDate = document.getElementById("publishDate");
const elArticlesTitle = document.getElementById("articlesTitle");
const elArticlesContent = document.getElementById("articlesContent");
const elArticlesThumb = document.getElementById("articlesThumb");
const elCommentNotice = document.getElementById("commentNotice");
const elCommentForm = document.getElementById("commentForm");
const elCommentContent = document.getElementById("commentContent");
const elListComment = document.getElementById("listComment");
const elTotalComment = document.getElementById("totalComment");
const elCommentMessageReply = document.getElementById("commentMessageReply");
const elCancelReply = document.getElementById("cancelReply");
const elReplyEmail = document.getElementById("replyEmail");
const elTopStoryArticles = document.getElementById("topStoryArticles");
const elPopularCategory = document.getElementById("popularCategory");
let parrentCommentID = null;
let level = 1;
let email = "";
const COMMENTS = JSON.parse(localStorage.getItem("COMMENTS")) || [];
let commentByArticles = COMMENTS.filter((item) => item.artilcesId == id);

API.callWithToken()
  .get("auth/me")
  .then((res) => {
    email = res.data.data.email;
    elCommentForm.classList.remove("d-none");
    elCommentNotice.classList.add("d-none");
  })
  .catch((err) => {
    elCommentForm.classList.add("d-none");
    elCommentNotice.classList.remove("d-none");
  })
  .finally(function () {
    renderComment(commentByArticles);
  });

API.call()
  .get(`articles/${id}`)
  .then((res) => {
    const artilces = res.data.data;
    elCategoryName.innerText = artilces.category.name;
    elPublishDate.innerText = dayjs(artilces.publish_date).fromNow();
    elArticlesTitle.innerText = artilces.title;
    elArticlesContent.innerHTML = artilces.content;
    elArticlesThumb.src = artilces.thumb;

    if (!RECENT_POST.includes(id)) {
      if (RECENT_POST.length === 3) RECENT_POST.shift();
      RECENT_POST.push(id);
      localStorage.setItem("RECENT_POST", JSON.stringify(RECENT_POST));
    }
  })
  .catch(function (error) {
    window.location.href = "404.html";
  });

API.call()
  .get(
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_jkNlw4c4jvceSyn7mq8harLXU1nSeH5UI16DA5Ne"
  )
  .then((res) => {
    // console.log(res);
    const currency = res.data.data;
    let html = /* html */ `
    <tr>
      <th scope="row">1</th>  
      <th scope="row">${currency.USD.code}-${currency.RUB.code}</th>
      <td>${currency.RUB.value}</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <th scope="row">${currency.USD.code}-${currency.AUD.code}</th>
      <td>${currency.AUD.value}</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <th scope="row">${currency.USD.code}-${currency.EUR.code}</th>
      <td colspan="2">${currency.EUR.value}</td>
    </tr>
    <tr>
      <th scope="row">4</th>
      <th scope="row">${currency.USD.code}-${currency.JPY.code}</th>
      <td colspan="2">${currency.JPY.value}</td>
    </tr>
    <tr>
      <th scope="row">5</th>
      <th scope="row">${currency.USD.code}-${currency.VND.code}</th>
      <td colspan="2">${currency.VND.value}</td>
    </tr>`;
    elPopularCategory.innerHTML = html;

  });

API.call()
  .get(`articles/${id}/related?limit=4`)
  .then((res) => {
    const data = res.data.data;
    let html = "";
    data.forEach((item) => {
      html += renderTopStoriesArticles(item);
    });
    elTopStoryArticles.innerHTML = html;
    elpreloader.remove();
  });

function renderTopStoriesArticles(item) {
  const dateTime = dayjs(item.publish_date).fromNow();
  return /* html */ `
  <div class="echo-top-story">
      <div class="echo-story-picture img-transition-scale">
          <a href="detail.html?id=${item.id}"><img src="${item.thumb}" alt="${item.title}" class="img-hover"></a>
      </div>
      <div class="echo-story-text">
          <h6><a href="detail.html?id=${item.id}" class="title-hover">${item.title}</a></h6>
          <a href="#" class="pe-none"><i class="fa-light fa-clock"></i>${dateTime}</a>
      </div>
  </div>`;
}

elCommentForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const content = elCommentContent.value.trim();

  if (content) {
    const newComment = {
      id: self.crypto.randomUUID(),
      email,
      content:
        level === 1
          ? content
          : `<span class="text-danger">@${elReplyEmail.innerText}:</span> ${content}`,
      dateTime: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      artilcesId: id,
    };
    if (parrentCommentID) {
      //todo new todo level 2
      const parentIdx = COMMENTS.findIndex(
        (item) => item.id === parrentCommentID
      );
      COMMENTS[parentIdx].childItem.push(newComment);
    } else {
      // todo new todo level 1
      newComment.childItem = [];
      COMMENTS.unshift(newComment);
    }
    localStorage.setItem("COMMENTS", JSON.stringify(COMMENTS));
    commentByArticles = COMMENTS.filter((item) => item.artilcesId === id);
    renderComment(commentByArticles);
    elCommentContent.value = "";
    parrentCommentID = null;
    elCommentMessageReply.classList.add("d-none");
  } else {
    alert("Vui long nhập nội dung bình luận");
  }
});

elListComment.addEventListener("click", function (e) {
  const el = e.target;

  if (el.classList.contains("btn-reply")) {
    parrentCommentID = el.dataset.id;
    elReplyEmail.innerText = el.dataset.replyEmail;
    level = parseInt(el.dataset.level);
    elCommentMessageReply.classList.remove("d-none");
  }
});

elCancelReply.addEventListener("click", function (e) {
  e.preventDefault();

  parrentCommentID = null;
  level = 1;
  elCommentMessageReply.classList.add("d-none");

});

function renderComment(list) {
  let html = "";
  list.forEach((item) => {
    html += renderCommentItem(item, item.id, true);
  });
  elListComment.innerHTML = html;
  elTotalComment.innerText = `${list.length} comment`;
}

function renderCommentItem(item, parentId = null, isParent = true) {
  const dateTime = dayjs(item.dateTime).fromNow();
  const level = isParent ? 1 : 2;
  const btnReply = email
    ? `<a href="#commentFormWrapper" class="btn btn-primary btn-reply" type="button" data-level="${level}" data-reply-email="${item.email}" data-id="${parentId}">Reply</a>`
    : "";

  let htmlChild = "";

  if (item.childItem.length > 0) {
    htmlChild += `<ul><div class="backgroundChildComment">`;

    htmlChild += `<h4 class="title" id="totalCommentChild">${item.childItem.length} Replied</h4>`;

    item.childItem.forEach((itemChild) => {
      const dateTimeChild = dayjs(itemChild.dateTime).fromNow();

      const btnReply = email
        ? `<btn class="btn btn-primary btn-reply" type="button" data-id="${item.id}">Reply</btn>`
        : "";

      htmlChild += renderCommentItemChild(itemChild, parentId, false);
    });
    htmlChild += `</div></ul>`;
  }

  return /* html */ `
  <ul class="comment-inner">
    <div class="comment-inner2">
      <div class="comment-inner3">
        <li class="wrapper">
          <div class="image-area">
              <img src="assets/images/home-1/trending-left/commentator-1.png" alt="author">
          </div>
          <div class="content">
              <h5 class="title">${item.email}</h5>
              <a href="#" class="pe-none">${dateTime}</a>
              <p class="desc">${item.content}</p>
          </div>
          <div class="reply">${btnReply}</div>
        </li>
      </div>
      ${htmlChild}
    </div>
  </ul>`;
}

function renderCommentItemChild(itemChild, parentId, isParent = false) {
  const dateTimeChild = dayjs(itemChild.dateTime).fromNow();
  const level = isParent ? 1 : 2;
  const btnReply = email
    ? `<a href="#commentFormWrapper" class="btn btn-primary btn-reply" type="button" data-level="${level}" data-reply-email="${itemChild.email}" data-id="${parentId}">Reply</a>`
    : "";
  return /* html */ `
  <li class="wrapper reply">
    <div class="image-are">
      <img src="assets/images/author.png" alt="">
    </div>
    <div class="content">
        <h5 class="title">${itemChild.email}</h5>
        <a href="#" class="pe-none">${dateTimeChild}</a>
        <p class="desc">${itemChild.content}</p>
    </div>
    <div class="reply">${btnReply}</div>
  </li>`;
}

// const data = [
//     {
//       id: "59c00111-4584-49c7-91af-abef67a902fd",
//       email: "student@gmail.com",
//       content: "123456 test binh luan",
//       dateTime: "2023-12-21 14:35:05",
//       artilcesId: 3993,
//       childItems: []
//     },
//     {
//       id: "d05eb35f-293f-4c96-8a98-1bcb60c3a810",
//       email: "lenhatquyen@gmail.com",
//       content: "test binh luan moi cuar bai viet 3993-02",
//       dateTime: "2023-12-21 14:28:35",
//       artilcesId: 3993,
//       childItems: []
//     },
//     {
//       id: "16469eaa-65ed-4c04-a734-4e5db07dab5a",
//       email: "lenhatquyen@gmail.com",
//       content: "test binh luan moi cuar bai 3993",
//       dateTime: "2023-12-21 14:26:36",
//       artilcesId: 3993,
//       childItems: []
//     },
// ];
