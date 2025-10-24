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
