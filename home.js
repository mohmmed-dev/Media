let current_page = 1;
let last_page = 0;
window.addEventListener("scroll", () =>{
  scrollMore(current_page ,last_page)
})
putPage()
// Show Posts
function postsShow(posts) {
  posts.forEach((post) => {
    let isUserPost = user !== null && user.id == post.author.id;
    let divEitdandDlete ="";
    if (isUserPost) {
      divEitdandDlete = `  <div class='for-M'>
        <button class="p-0 btn btn-outline-danger" type="button" data-bs-toggle="modal"
                    data-bs-target="#delet-modal" onclick="idDelet(${post.id})"><img class="w-50" src="./img/trash-solid.svg"/></button>
        <button class=" p-0 btn btn-outline-primary" type="button" onclick="editPustBtn('${encodeURIComponent(JSON.stringify(post))}')"> <img class="w-50 text-primary" src="./img/paen.svg"/></button>
        </div>`;
    }
    document.querySelector(".posts").innerHTML += `
    <div class="card shadow-sm rounded my-3">
      <div class="card-header d-flex justify-content-between">
        <div style="cursor: pointer" onclick="userProfile(${post.author.id})"> 
          <img
          class="border rounded-circle border-white"
          src="${post.author.profile_image}"
          arl="me"/>
        <span>@${post.author.username}</span>
        </div>
        ${divEitdandDlete}
      </div>
      <div class="card-body" onclick="goPostPage(${post.id})">
        <img class="w-100 " src="${post.image}" />
        <p class="text-muted mt-1">${post.created_at}</p>
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">
          ${post.body}
        </p>
        <hr />
        <div>
         <img src="./img/paen.svg"/>
          <h6 class="d-inline-block">${post.comments_count} Comments</h6>
          <ul class="d-inline-block px-1" id="tags_${post.id}">
          </ul>
        </div>
      </div>
    </div>
  </div>
  `;
    if (post.tags.length !== 0) {
      post.tags.forEach((tag) => {
        document.getElementById(`tags_${post.id}`) += `
                <li class="d-inline-block py-1 px-2 h6 bg-dark rounded-pill text-white">${tag}</li>
        `;
      });
    }
  });
}
// Remove Posts
function removePosts() {
  document.querySelector(".posts").innerHTML = ""; 
}
// add Post To Page
function putPage(numberOfPage = 1) {
  loadingBall(true);
  axios
  .get(`${apiUrl}posts?limit=5&page=${numberOfPage}`)
  .then((respons) => {
    let posts = respons.data.data;
    last_page = respons.data.meta.last_page;
    postsShow(posts);
  })
  .catch((error) => {
    console.log(error);
  }).finally(() => {
    loadingBall(false);
})
}


