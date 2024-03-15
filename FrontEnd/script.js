let allCategory = [];
let allWorks = [];

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
  data.map((item) => {
    gallery.appendChild(renderWorkItem({ data: item }));
  });
};

function renderWorkItem({ data }) {
  console.log(data);
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.title;
  let figcaption = document.createElement("figcaption");
  figcaption.textContent = data.title;
  figure.dataset.categoryId = data.categoryId;
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
    filterButton.addEventListener("click", () => {
      let figures = document.querySelectorAll("figure[data-category-id]");
      figures.forEach((figure) => {
        if (i === 0) {
          figure.style.display = "block";
          return;
        }
        if (figure.dataset.categoryId == i) {
          figure.style.display = "block";
        } else {
          figure.style.display = "none";
        }
      });
    });
    categoryBox.appendChild(filterButton);
  }
};

const init = async () => {
  await getAllCategory();
  await getAllWorks();
  renderCategoryButton();
  console.log("allWorks", allWorks);
};

init();
