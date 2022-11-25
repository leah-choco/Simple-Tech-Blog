//const blogId = document.querySelector('input[name="blog-id"]').value;

const { response } = require("express");

const editFormHandler = async function (event) {
  event.preventDefault();

  const title = document.querySelector('input[name="blog-title"]').value.trim();
  const body = document
    .querySelector('textarea[name="blog-body"]')
    .value.trim();

  const id = window.location.pathname.split("/")[2];

  const response = await fetch(`/api/edit/${blogId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

//Deleting a post
const deleteClickHandler = async function () {
  await fetch(`/api/edit/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .querySelector("#edit-post-form")
  .addEventListener("submit", editFormHandler);
document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteClickHandler);
