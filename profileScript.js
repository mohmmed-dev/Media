loadingBall(true);

const urlParams = new URLSearchParams(window.location.search);
const userid = urlParams.get("userId");
const userToken = localStorage.getItem("token");
axios.get(`${apiUrl}users/${userid}`).then((response) => {
  let infoData = response.data.data;
  console.log(infoData)
  document.getElementById("info-img").src = infoData.profile_image;
  document.getElementById("info-email").innerHTML = infoData.email == null ? "---" :infoData.email;
  document.getElementById("info-name").innerHTML = infoData.name;
  document.getElementById("info-username").innerHTML = "@"+infoData.username;
  document.getElementById("info-posts").innerHTML = infoData.posts_count;
  document.getElementById("info-comments").innerHTML = infoData.comments_count;
})

function postsShow(posts) {
  document.getElementById("user-post").innerHTML = "";
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
    document.getElementById("user-post").innerHTML += `
    <div class="card shadow-sm rounded my-3">
      <div class="card-header d-flex justify-content-between">
        <div> 
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


function removePosts() {
  document.querySelector(".posts").innerHTML = ""; 
}

function putPage() {
axios.get(`${apiUrl}users/${userid}/posts`)
  .then((respons) => {
    console.log(respons.data)
    let posts = respons.data.data;
    postsShow(posts)
  })
  .catch((error) => {
    console.log(error);
  }).finally(() => {
    loadingBall(false);
  })
}
putPage() 


