document.addEventListener("DOMContentLoaded", function () {
  init();
});

const init = async () => {
  getAllCategory();
  await getAllWorks();
  // test filtre
  const tt = [...allWorks.filter((item) => item.categoryId === 2)];
  console.log("tt val", tt);
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
