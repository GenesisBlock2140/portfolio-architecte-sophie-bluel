let modal = document.getElementById("galerie-modal");

let btn = document.getElementById("openModalBtn");
let btnTopbar = document.getElementById("btn-edit-topbar");

let span = document.getElementsByClassName("close")[0];

let modalListSection = document.querySelector(".galerie-modal-section");
let modalAddSection = document.querySelector(".galerie-modal-add-section");
let addNewWorkBtn = document.querySelector(".add-new-work-btn");
let arrowLeftBtn = document.querySelector(".arrow-left");
let uploadNewWorkBtn = document.querySelector(".validate-new-work-btn");

uploadNewWorkBtn.onclick = ((event) => {
  event.preventDefault();
  event.stopPropagation();
  postNewWork();
})

function resetVisiblity() {
  modalListSection.style.display = "block";
  modalAddSection.style.display = "none";
  arrowLeftBtn.style.visibility = "hidden";
}

addNewWorkBtn.onclick = function () {
  modalListSection.style.display = "none";
  modalAddSection.style.display = "block";
  arrowLeftBtn.style.visibility = "visible";
};

arrowLeftBtn.onclick = function () {
  resetVisiblity();
};

btn.onclick = function () {
  modal.style.display = "block";
  renderAllWorksModal(allWorks);
};

btnTopbar.onclick = function () {
  modal.style.display = "block";
  renderAllWorksModal(allWorks);
};

span.onclick = function () {
  modal.style.display = "none";
  resetVisiblity();
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
    resetVisiblity();
  }
};

const renderAllWorksModal = (data) => {
  const gallery = document.querySelector(".galerie-modal-list");
  gallery.innerHTML = "";
  data.map((item) => {
    gallery.appendChild(renderWorkItemModal(item));
  });
  renderCategoryList();
};

function renderCategoryList() {
  let select = document.getElementById("categorieInput");
  allCategory.forEach((item) => {
    let option = document.createElement("option");
    option.value = item.id;
    option.textContent = item.name;
    select.appendChild(option);
  })
}

function renderWorkItemModal(data) {
  let div = document.createElement("div");
  div.classList.add("galerie-modal-item");
  let button = document.createElement("button");
  button.classList.add("delete-work-btn");
  button.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (window.confirm('Voulez-vous vraiment supprimer cet item ?')) {
      fetch("http://localhost:5678/api/works/" + data.id, {method: "DELETE", headers: {"Authorization": "Bearer " + localStorage.getItem("token")}})
      .then((res) => {
        console.log(res);
        if (res.status === 204) {
          let workItemInModal = document.getElementById("figureModal" + data.id);
          let workItemInGallery = document.getElementById("figure" + data.id);
          workItemInModal.remove();
          workItemInGallery.remove();
          allWorks = allWorks.filter((item) => item.id !== data.id);
        } else if (res.status === 401) {
          throw new Error("Non authorisé");
        } else {
          throw new Error("Erreur coté serveur");
        }
      }).catch((err) => {
        console.log(err);
      })
    }
  };
  let icon = document.createElement("i");
  icon.setAttribute("class", "fa-solid fa-trash-can trash-icon");
  button.appendChild(icon);
  let img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.title;
  div.appendChild(button);
  div.appendChild(img);
  div.id = "figureModal" + data.id;
  return div;
}

function postNewWork() {
  let uploadPicture = document.querySelector("#uploadPicture");
  console.log(uploadPicture.files[0])
  let titreInput = document.querySelector("#titreInput");
  let categorieInput = document.querySelector("#categorieInput");
  const formData = new FormData();
  formData.append('image', uploadPicture.files[0]);
  formData.append('title', titreInput.value);
  formData.append('category', categorieInput.value);
  fetch("http://localhost:5678/api/works", {
    method: "POST", 
    headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
    body: formData,
  }).then((res) => {
    if (res.status == 201) {
      return res.json();
    }
  }).then((data) => {
    console.log(data);
    document.querySelector(".galerie-modal-list").appendChild(renderWorkItemModal(data));
    document.querySelector(".gallery").appendChild(renderWorkItem({ data: data }));
    allWorks.push(data);
  }).catch((err) => {
    console.log(err)
  })
}

// https://www.w3schools.com/howto/howto_css_modals.asp
// https://www.w3schools.com/jsref/met_win_confirm.asp
