// --- DOM Elements ---
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const addProductBtn = document.getElementById("addProductBtn");
const addProductForm = document.getElementById("addProductForm");
const productList = document.getElementById("product-list");

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

  // Create new product article
  const newItem = document.createElement("article");
  newItem.className = "product-item";
  newItem.innerHTML = `
    <h3 class="product-name">${name}</h3>
    <img src="${imgUrl}" alt="${name}">
    <p class="product-desc">${desc || "No description."}</p>
    <p class="product-price">$${Number(price).toLocaleString()}</p>
  `;

  // Thêm sản phẩm lên đầu danh sách
  productList.prepend(newItem);

  // Reset và ẩn form
  addProductForm.reset();
  addProductForm.style.display = "none";
});
