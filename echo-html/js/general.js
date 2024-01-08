

const API = {
    call: function (){
      return axios.create({
          baseURL: "https://apiforlearning.zendvn.com/api/v2/",
      });
    },
    callWithToken: function (token){
      if(!token) {
        token = localStorage.getItem('ACCESS_TOKEN');
      }
      return axios.create({
          baseURL: "https://apiforlearning.zendvn.com/api/v2/",
          headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
  };
  
  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.locale("vi");

  let RECENT_POST = JSON.parse(localStorage.getItem('RECENT_POST')) || [] ;
  
  const ACCESS_TOKEN = "ACCESS_TOKEN";
  const token = localStorage.getItem(ACCESS_TOKEN);
  let RECENT_POSTS = JSON.parse(localStorage.getItem("RECENT_POSTS")) || [];
  let recentPostiIdString = RECENT_POSTS.toString();
  const recentPost = document.getElementById("recentPosts");
  const elInputSearch = document.getElementById("inputSearch");
  const elTempeature = document.getElementById('temperature');
  const elpreloader = document.getElementById('preloader');
 
  // elInputSearch.addEventListener("keyup", function (e) {
  //   if (e.key === "Enter") {
  //     const keyword = elInputSearch.value.trim();
  
  //     if (keyword) {
  //       window.location.href = `search.html?keyword=${keyword}`;
  //     } else {
  //       alert("Vui long nhap tu khoa can tim");
  //       elInputSearch.value = "";
  //     }
  //   }
  // });
  API.call().get('https://api.tomorrow.io/v4/weather/forecast?location=10.762622,106.660172&apikey=czXSTyRZk1COxhcI2448GWj3JtpJI4IB').then(res => {
  const data = res.data;
  const weatherHourly = Math.ceil(data.timelines.hourly[0].values.temperature);
  elTempeature.innerText = `${weatherHourly} °C,`;
})
  function showFormErrors(errors, el) {
    let errString = "";
    for (const property in errors) {
      errString += /* html */ `<li>${errors[property]}</li>`;
    }
    el.innerHTML = /* html */ `
      <div class="alert alert-danger" role="alert">
        <ul>${errString}</ul>
      </div>`;
  }
  
  
  function showToastMessage(message){
    Toastify({
      text: message,
      duration: 3000,
      close: true,
    }).showToast();
  }

