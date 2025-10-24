// --- DOM Elements ---
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("product-list");

let products = JSON.parse(localStorage.getItem("products")) || [
  {
    "name": "Classic Brown Teddy",
    "price": 20.0,
    "desc": "A timeless teddy bear with a warm smile and soft brown fur. Perfect for cuddles!",
    "image": "https://tse4.mm.bing.net/th/id/OIP.SaTKnMZt3i1X3coWHNkpQQHaG_?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "name": "Panda Hug Buddy",
    "price": 22.0,
    "desc": "Our best-selling panda plush, soft and huggable — your perfect bedtime companion.",
    "image": "https://tse2.mm.bing.net/th/id/OIP.G2BwZ-U9wMYYUgtO_qwXNAHaHP?rs=1&pid=ImgDetMain&o=7&rm=3"
  },
  {
    "name": "White Polar Bear Plush",
    "price": 25.0,
    "desc": "This fluffy polar bear plush will melt your heart with its adorable face and cozy fur.",
    "image": "https://tse1.mm.bing.net/th/id/OIP.eUmeCBI87ycgtij2Pjv0dgHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
  }
];

// Hiển thị sản phẩm
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((p) => {
    const item = document.createElement("article");
    item.className = "product-item";
    item.innerHTML = `
      <h3 class="product-name">${p.name}</h3>
      <img src="${p.image}" alt="${p.name}">
      <p>${p.desc}</p>
      <p class="product-price">$${p.price}</p>
    `;
    productList.appendChild(item);
  });
}

// --- SEARCH FUNCTIONALITY ---
function searchProducts() {
  console.log("Searching for:", searchInput.value);
  const keyword = searchInput.value.toLowerCase();
  const products = document.querySelectorAll(".product-item");

  products.forEach(product => {
    const name = product.querySelector(".product-name").textContent.toLowerCase();
    if (name.includes(keyword)) {
      product.style.display = ""; // show
    } else {
      product.style.display = "none"; // hide
    }
  });
}

// Search button click
searchBtn.addEventListener("click", searchProducts);

// Allow search on Enter key or typing
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchProducts();
  }
});

// --- TOGGLE ADD PRODUCT FORM ---
addProductBtn.addEventListener("click", () => {
  if (addProductForm.style.display === "block") {
    addProductForm.style.display = "none"; // hide
    return;
  }
  addProductForm.style.display = "block"; // show
});

// --- ADD PRODUCT HANDLER ---
addProductForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get input values
  const name = document.getElementById("newName").value.trim();
  const desc = document.getElementById("newDesc").value.trim();
  const price = document.getElementById("newPrice").value.trim();
  const imgUrl = document.getElementById("newImage").value.trim() || "https://via.placeholder.com/200x200";

  if (!name || !price || isNaN(price) || Number(price) <= 0) {
    errorMsg.textContent = "Please enter a valid name and price!";
    return;
  }

  errorMsg.textContent = "";

  const newProduct = { name, price, desc, imgUrl };
  products.push(newProduct);

  // Lưu vào localStorage
  localStorage.setItem("products", JSON.stringify(products));

  // Cập nhật lại danh sách hiển thị
  renderProducts();

  // Reset và ẩn form
  addProductForm.reset();
  addProductForm.style.display = "none";
});

window.onload = () => {
  renderProducts();
};
