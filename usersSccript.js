let current_page = 1;
let last_page = 0;
putPage(current_page) 
window.addEventListener("scroll", () =>{
  scrollMore(current_page ,last_page)
})
function userHTML(users) {
  for(user of users) {
  document.querySelector(".users").innerHTML +=`
    <div class="user col-6 col-md-4" onclick="userProfile(${user.id})">
      <div
        class="text-center shadow-sm rounded py-3 px-2 my-2 bg-body-tertiary"
      >
        <img
          src="${user.profile_image}"
          class="border rounded-circle border-white"
        />
        <div
          class=" my-2 "
        >
          <div class="">
            <h2 class="h6">${user.name}</h2>
            <h4 id="info-username" class="h6">@${user.username}</h4>
          </div>
          <div>
            <p class="m-0">
              <span class="h5" id="info-posts">${user.posts_count}</span> POSTS
            </p>
            <p class="m-0">
              <span class="h5">${user.comments_count}</span> Comments
            </p>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

function putPage(numberOfPage = 1) {
  loadingBall(true);
  axios
  .get(`${apiUrl}users?limit=10&page=${numberOfPage}`)
  .then((respons) => {
    let users = respons.data.data;
    last_page = respons.data.meta.last_page;
    userHTML(users)
  })
  .catch((error) => {
    showAlert(error.response.data.message,"danger")
  }).finally(() => {
    loadingBall(false);
})
}