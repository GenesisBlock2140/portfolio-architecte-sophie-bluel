document.addEventListener("DOMContentLoaded", function () {
  init();
});

const init = async () => {
  await getAllCategory();
  renderCategoryButton();
  await getAllWorks();
  // test filtre
  const tt = [...allWorks.filter((item) => item.categoryId === 1)];
  console.log("tt val", tt);
  console.log("allWorks", allWorks);
};

let allCategory = [];
let allWorks = [];

const getAllCategory = async () => {
  const req = await fetch("http://localhost:5678/api/categories");
  const res = await req.json();
  allCategory = res;
};

const getAllWorks = async () => {
  const req = await fetch("http://localhost:5678/api/works");
  const res = await req.json();
  allWorks = res;
  console.log(res);
  renderAllWorks({ data: res });
};

const renderAllWorks = ({ data }) => {
  data.map((item) => {
    renderWorkItem({ imageUrl: item.imageUrl, title: item.title });
  });
};

function renderWorkItem({ imageUrl, title }) {
  const gallery = document.querySelector(".gallery");
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  img.src = imageUrl;
  img.alt = title;
  let figcaption = document.createElement("figcaption");
  figcaption.textContent = title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}

const renderCategoryButton = () => {
  let categoryBox = document.querySelector(".category-btn-box");

  for (let i = 0; i < allCategory.length; i++) {
    let filterButton = document.createElement("button");
    filterButton.textContent = allCategory[i].name;
    filterButton.classList.add("category-btn");
    filterButton.addEventListener("click", () => {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";
      filterButton.classList.add("category-btn-active");
      renderAllWorks({
        data: [
          ...allWorks.filter((item) => item.categoryId === allCategory[i].id),
        ],
      });
    });
    categoryBox.appendChild(filterButton);
  }

  let filterAll = document.querySelector(".filter-all");
  filterAll.addEventListener("click", () => {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    renderAllWorks({
      data: [...allWorks],
    });
  });
};
