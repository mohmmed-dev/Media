const apiUrl = `https://tarmeezacademy.com/api/v1/`;
addLoadingBall() 
let user = JSON.parse(localStorage.getItem("user"))
setUpUl()

// LogIn User
function loginUser(){
  loadingBall(true)
const userName = document.getElementById("username-input").value;
const userPassword = document.getElementById("password-input").value;
const parms = {
  username: userName,
  password: userPassword
}
axios.post(`${apiUrl}login`,parms).then((response) => {
  localStorage.setItem("token" , response.data.token);
  localStorage.setItem("user" , JSON.stringify(response.data.user));
  removeModel("login-modal")
  setUpUl();
  showAlert("logged In Succesfully")
}).catch((error) => {
  showAlert(error.response.data.message,"danger")
}).finally(() => {
  loadingBall(false)
})
}
// LogIn User
function registerUser() {
  loadingBall(true)
  const realName = document.getElementById("new-name").value;
  const userName = document.getElementById("new-username").value;
  const userImg = document.getElementById("new-img").files[0];
  const userPassword = document.getElementById("new-password").value;
  let formData = new FormData();
  formData.append("name",realName);
  formData.append("username",userName);
  formData.append("password",userPassword);
  formData.append("image",userImg);
  axios.post(`${apiUrl}register`,formData,
  {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  }

  ).then((response) => {
    console.log(response.data)
    localStorage.setItem("token" , response.data.token);
  localStorage.setItem("user" , JSON.stringify(response.data.user));
  removeModel("modal-register")
  showAlert("Register New User")
  setUpUl();
}).catch(error => {
    showAlert(error.response.data.message,"danger")
  }).finally(() => {
  loadingBall(false);
});
};
// LogOut User
function LogOut() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  showAlert("logged Out Succesfully","danger");
  setUpUl()
}
// Show Button for LogIn LogOut
// Show Button for LogIn LogOut
function setUpUl() {
  const token = localStorage.getItem("token");
  const logIn = document.getElementById("login");
  const logOut = document.getElementById("logout");
  const register = document.getElementById("register");
  const addPost = document.getElementById("new-post");
  const profel = document.querySelector(".profal");
  const comments = document.getElementById("add-comments");
  if(token == null) {
    logOut.style.setProperty("display","none","important")
    profel.style.setProperty("display","none","important")
    logIn.style.setProperty("display","block","important")
    register.style.setProperty("display","block","important")
    if(addPost != null) {
      addPost.style.setProperty("display","none","important")
    }
    if(comments != null) {
      comments.style.setProperty("display","none","important")
    }
  }else {
    logIn.style.setProperty("display","none","important")
    register.style.setProperty("display","none","important")
    profel.style.setProperty("display","block","important")
    logOut.style.setProperty("display","block","important")
    userInof()
    if(addPost != null) {
      addPost.style.setProperty("display","flex","important")
    }
    if(comments != null) {
      comments.style.setProperty("display","flex","important")
    }
  }
}
//User Info
  function userInof() {
    let user = JSON.parse(localStorage.getItem("user"))
  document.querySelector(".profal").innerHTML = `
    <img
    src="${user.profile_image}" class="border rounded-circle border-white"/>
    <strong class="ms-2 my-1">${user.username}</strong>
  `;
}
// Remove Modal
function removeModel(modalElemnt) {
  let modal = document.getElementById(modalElemnt);
  let modalInst = bootstrap.Modal.getInstance(modal);
  modalInst.hide();
}
// Function Show Alert
const showAlert = (message, type = "success") => {
  const massegAlert = document.getElementById('massegAlert')
  const wrapper = document.createElement('div')
  wrapper.className = "position-fixed bottom-0";
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')
  massegAlert.append(wrapper)
  setTimeout(() => {
    wrapper.remove()
  },2000)
}

//  Add New Post and EditPost
function createNewPost() {
  loadingBall(true);
  let postID = document.getElementById("post-id").value;
  let isCraete = postID == null || postID == "";
  const title = document.getElementById("post-title").value;
  const body = document.getElementById("post-body").value;
  const img = document.getElementById("post-img").files[0];
  let token =  localStorage.getItem("token");
  let formData = new FormData();
  formData.append("title",title)
  formData.append("body",body)
  formData.append("image",img)
  let Url = "";
  if (isCraete) {
    Url = `${apiUrl}posts`;
  } else {
      formData.append("_method","put")
      Url = `${apiUrl}posts/${postID}`;
    }
    axios.post(Url,formData,{
      headers: {
        authorization: `Bearer ${token}`
      }
    }).then((response) => {
      removeModel("modal-add-post")
      removePosts()
      putPage()
      showAlert("You Eethd The Post")
    }).catch(error => {
      showAlert(error.response.data.message,"danger")
    }).finally(() => {
      loadingBall(false);
    })
};
// editPost
function editPustBtn(getPost) {
  let post = JSON.parse(decodeURIComponent(getPost));
  document.getElementById("post-id").value = post.id;
  document.getElementById("model-btn-Shere").innerHTML = `UpDate`;
  document.getElementById("modal-post-title").innerHTML = `Edit post`;
  document.getElementById("post-title").value = post.title;
  document.getElementById("post-body").value = post.body;
  // document.getElementById("post-body").files[0] = post.files[0];
  let postModal = new bootstrap.Modal(document.getElementById("modal-add-post"),{});
  postModal.toggle();
}
function addBtnPost() {
  document.getElementById("post-id").value = null;
  document.getElementById("model-btn-Shere").innerHTML = `Create`;
  document.getElementById("modal-post-title").innerHTML = `Craete A New Post `;
  document.getElementById("post-title").value = "";
  document.getElementById("post-body").value = "";
  let postModal = new bootstrap.Modal(document.getElementById("modal-add-post"),{});
  postModal.toggle();
}
// Delet Post
let idPostDelet = 0;
function idDelet(id) {
  idPostDelet = id;
}
function DeletPost() {
  loadingBall(true)
  let token =  localStorage.getItem("token");
  const header = {
    headers: {
        Content_Type: "multipart/form-data",
        authorization: `Bearer ${token}`
      }
  }
  const url = `${apiUrl}posts/${idPostDelet}`;
  axios.delete(url, header).then((response) => {
    removeModel("delet-modal")
    showAlert("You Dleted The Post")
  }).finally(() => {
    loadingBall(false)
  })
};
// Loading Effect
function addLoadingBall() {
   let loadung =  `<div id='loding'class="z-1 position-fixed text-center top-50 start-50 translate-middle">
      <div class="spinner-border" role="status">
        <span class="sr-only"></span>
      </div>
    </div>`;
    document.body.innerHTML +=loadung;
}
function loadingBall(isWork) {
  if (isWork) {
    document.getElementById("loding").style.display = "block";
  } else {
    document.getElementById("loding").style.display = "none";
  }
}

// Scroll Show More
function scrollMore(current_page ,last_page) {
  let chekIfScrollOver =   Math.floor(( window.innerHeight + window.pageYOffset)) >= (document.body.offsetHeight - 10);
  if (chekIfScrollOver && last_page > current_page) {
    current_page += 1;
    putPage(current_page)
  }
}


// Go Post Page
function goPostPage(id) {
window.location = `post.html?postId=${id}`;
}
// Going to Profile
function  userProfile(id = user.id) {
  if (id !== null) {window.location = `profile.html?userId=${id}`;};
}

