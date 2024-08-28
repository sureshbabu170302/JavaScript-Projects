const fetchButton = document.querySelector("#available-posts button");
const listElements = document.querySelector(".posts");
const postTemplate = document.getElementById("single-post");
const form = document.querySelector("#new-post form");
const postList = document.querySelector("ul");

function sendHttpRequest(method, url, data) {
  // const promise = new Promise((resolve, reject) => {
  // const xhr = new XMLHttpRequest();
  // xhr.open(method, url);
  // xhr.onload = function () {
  //   if (xhr.status >= 200 && xhr.status < 300) {
  //     resolve(xhr.response);
  //   } else {
  //     reject(new Error("Something went wrong!"));
  //   }
  // };
  // xhr.onerror = function () {
  //   reject(new Error("Failed to send request"));
  // };
  // xhr.send(JSON.stringify(data));
  // });
  // return promise;
  return fetch(url, {
    method: method,
    body: data,
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        throw new Error("Something went erong - server side");
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

async function fetchPosts() {
  try {
    const responseData = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const listOfPosts = responseData.data;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true);
      postEl.querySelector("h2").textContent = post.title.toUpperCase();
      postEl.querySelector("p").textContent = post.body;
      postEl.querySelector("li").id = post.id;
      listElements.append(postEl);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title: title,
    body: content,
    userId: userId,
  };

  const fd = new FormData(form);
  // fd.append('title', title);
  // fd.append('body', content);
  fd.append("userId", userId);

  const response = await axios.post(
    "https://jsonplaceholder.typicode.com/posts",
    post
  );
  console.log(response.data);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const enteredTitle = event.currentTarget.querySelector("#title").value;
  const enteredContent = event.currentTarget.querySelector("#content").value;
  createPost(enteredTitle, enteredContent);
});

fetchButton.addEventListener("click", fetchPosts);
postList.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const postId = event.target.closest("li").id;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
});
