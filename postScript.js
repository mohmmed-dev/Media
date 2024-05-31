loadingBall(true);
// take Id Post and Token User
const urlParams = new URLSearchParams(window.location.search);
const showPostId = urlParams.get("postId");
const userToken = localStorage.getItem("token");
getPost();
// Show Post
function getPost() {
  document.querySelector(".posts").innerHTML = "";
  axios
    .get(`${apiUrl}posts/${showPostId}`)
    .then((respons) => {
      let post = respons.data.data;
      document.querySelector(".posts").innerHTML += `
      <h1>@${post.author.username} Post</h1>
    <div class="card shadow-sm rounded my-3">
      <div class="card-header" style="cursor: pointer" onclick="userProfile(${post.author.id})">
        <img
          class="border rounded-circle border-white"
          src="${post.author.profile_image}"
          arl="me"
        />
        <span>@${post.author.username}</span>
      </div>
      <div class="card-body">
        <img class="w-100" src="${post.image}" />
        <p class="text-muted mt-1">${post.created_at}</p>
        <h5 class="card-title">${post.title}</h5>
        <p class="card-text">${post.body}</p>
        <hr />
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-pen d-inlen"
            viewBox="0 0 16 16"
          >
            <path
              d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"
            />
          </svg>
          <h6 class="d-inline-block">
          ${post.comments_count} comments
          </h6>
          <ul class="d-inline-block px-1" id="tags_${post.id}"></ul>
        </div>
      </div>
      <div class="card-footer">
        <div class="comments">
        </div>
        <div class=" input-group" id="add-comments">
          <input type="text" class="form-control shadow-none" id="comment-body" />
          <input
            type="submit"
            class="bg-transparent text-primary border border-primary rounded-start "
            id="stop"
            value="send"
          />
        </div>
      </div>
    </div>
      `;
      addNewCoomnet();
      post.comments.forEach((comment) => {
        document.querySelector(".comments").innerHTML += `
        <div class="my-2" id="comment_${comment.author.id}">
            <div>
              <img
                class="border rounded-circle border-white"
                src="${comment.author.profile_image}"
              />
              <strong>@${comment.author.username}</strong>
            </div>
            <p class="mt-1">
              ${comment.body}
            </p>
          </div>`;
      });
      setUpUl();
    })
    .catch((error) => {
      showAlert(error.response.data.message,"danger")
    })
    .finally(() => {
      loadingBall(false);
    });
}
// Add new Comment To server
function newComment() {
  let textBody = document.getElementById("comment-body").value;
  const parms = {
    body: textBody,
  };
  axios
    .post(`${apiUrl}posts/${showPostId}/comments`, parms, {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
    .then((respons) => {
      showAlert("You Add Comment");
      getPost();
    })
    .catch((error) => {
      showAlert(error.response.data.message, "danger");
    })
    .finally(() => {
      loadingBall(false);
    });
}
function addNewCoomnet() {
  document.getElementById("stop").addEventListener("click", (button) => {
    loadingBall(true);
    button.preventDefault();
    newComment();
  });
}