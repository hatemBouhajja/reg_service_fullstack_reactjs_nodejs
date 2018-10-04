import ajax from "basic-ajax";

function getAll(callback) {
  ajax.getJson("/msg?sort=createdAt%20DESC&limit=15").then(function (response) {
    callback(response);
  });
}

function add(description, title, user, email, phone, callback) {
  ajax.postJson("/msg", {
    description: description,
    title: title,
    user: user,
    email: email,
    phone: phone
  }).then(function (response) {
    callback(response);
  });
}

function remove(id, callback) {
  ajax.delete("/msg/" + id).then(function (response) {
    callback(response);
  });
}

export { getAll, add, remove };
