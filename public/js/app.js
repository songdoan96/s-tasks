// tooltip
tippy(".tooltip", {});

// Add list
const btnAddList = document.querySelector("#btn-add-list");
const addListWrap = document.querySelector(".add-list");
const btnCloseList = document.querySelector(".btn-close-add-list");
btnAddList?.addEventListener("click", function () {
  addListWrap.classList.remove("hidden");
});
btnCloseList?.addEventListener("click", function () {
  addListWrap.classList.add("hidden");
});

// Edit list
const btnEditList = document.querySelector(".btn-edit-list");
const btnCloseModalEditList = document.querySelector(".btn-close-modal-edit-list");
const modalEditList = document.querySelector(".modal-edit-list");
btnEditList?.addEventListener("click", function () {
  modalEditList.classList.remove("hidden");
});
btnCloseModalEditList?.addEventListener("click", function () {
  modalEditList.classList.add("hidden");
});

// Add task
const btnAddTask = document.querySelector("#btn-add-task");
const btnCloseAddTask = document.querySelector(".btn-close-add-task");
const modalAddTask = document.querySelector(".modal-add-task");

btnAddTask?.addEventListener("click", function () {
  modalAddTask.classList.remove("hidden");
});
btnCloseAddTask?.addEventListener("click", function () {
  modalAddTask.classList.add("hidden");
});

// Clear alert
const btnClearAlert = document.querySelectorAll(".btn-clear-alert");
btnClearAlert?.forEach((elm) => {
  elm.addEventListener("click", function () {
    elm.closest("div").classList.add("hidden");
  });
});

// Cleat toast
const btnClearToast = document.querySelectorAll(".btn-clear-toast");
btnClearToast?.forEach((elm) => {
  elm.addEventListener("click", function () {
    elm.closest("div").classList.add("hidden");
  });
  setTimeout(() => {
    elm.closest("div").classList.add("hidden");
  }, 5000);
});

// Logout submit
const btnLogout = document.querySelector("#btn-logout");
btnLogout?.addEventListener("click", function (e) {
  e.preventDefault();

  var form = document.createElement("form");
  form.method = "POST";
  form.action = "/user/logout";
  document.body.appendChild(form);

  form.submit();
});
