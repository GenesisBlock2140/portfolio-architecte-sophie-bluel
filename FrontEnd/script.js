let allCategory = [];
let allWorks = [];
let logoutButton = document.querySelector("#logoutBtn");
logoutButton.onclick = function () {
  localStorage.clear();
  location.reload();
}

const getAllCategory = async () => {
  // Adding "Tous" to category in first place
  allCategory.push({ id: 0, name: "Tous" });
  const req = await fetch("http://localhost:5678/api/categories");
  const res = await req.json();
  allCategory = allCategory.concat(res);
  console.log(allCategory);
};

const getAllWorks = async () => {
  const req = await fetch("http://localhost:5678/api/works");
  const res = await req.json();
  allWorks = res;
  console.log(res);
  renderAllWorks({ data: res });
};

const renderAllWorks = ({ data }) => {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  data.map((item) => {
    gallery.appendChild(renderWorkItem({ data: item }));
  });
};

function renderWorkItem({ data }) {
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.title;
  let figcaption = document.createElement("figcaption");
  figcaption.textContent = data.title;
  figure.dataset.categoryId = data.categoryId;
  figure.id = "figure" + data.id;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  return figure;
}

const renderCategoryButton = () => {
  let categoryBox = document.querySelector(".category-btn-box");

  for (let i = 0; i < allCategory.length; i++) {
    let filterButton = document.createElement("button");
    filterButton.textContent = allCategory[i].name;
    filterButton.classList.add("category-btn");
    if (i === 0) {
      filterButton.classList.add("category-btn-active");
    }
    filterButton.addEventListener("click", () => {
      let selectAllCategoryBtn = document.querySelectorAll(".category-btn");
      selectAllCategoryBtn.forEach(function(item) {
        item.classList.remove("category-btn-active");
      });
      filterButton.classList.add("category-btn-active");
      let figures = document.querySelectorAll("figure[data-category-id]");
      figures.forEach((figure) => {
        if (i === 0 || figure.dataset.categoryId == i) {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      });
    });
    categoryBox.appendChild(filterButton);
  }
};

const checkIsLogin = () => {
  if (localStorage.getItem("token")) {
    let filterList = document.querySelector(".category-btn-box");
    filterList.style.visibility = "hidden";
    let bannerEditMode = document.querySelector(".edit-mode-banner");
    bannerEditMode.style.visibility = "visible";
    let header = document.querySelector("header");
    header.style.marginTop = "100px";
    let loginBtn = document.querySelector("#loginHref");
    loginBtn.style.display = "none";
    logoutButton.style.display = "block";
    let openModalBtn = document.querySelector("#openModalBtn");
    openModalBtn.style.display = "block";
  }
}

const init = async () => {
  checkIsLogin();
  await getAllCategory();
  await getAllWorks();
  renderCategoryButton();
  console.log("allWorks", allWorks);
};

init();
