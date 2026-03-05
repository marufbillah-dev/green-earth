const loadAllCategories = () => {
  const allCategoriesUrl =
    "https://openapi.programming-hero.com/api/categories";

  fetch(allCategoriesUrl)
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
};

const loadAllPlants = () => {
  const allPlantUrl = "https://openapi.programming-hero.com/api/plants";

  fetch(allPlantUrl)
    .then((response) => response.json())
    .then((data) => displayPlants(data.plants));
};

const displayPlants = (plantsData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  plantsData.forEach((plant) => {
    const newCard = document.createElement("div");
    newCard.className = "card bg-base-100 shadow-sm border border-gray-100";
    newCard.innerHTML = `
        <figure class="px-4 pt-4">
            <div class="w-full h-48 bg-gray-200 rounded-xl">
                <img src="${plant.image}">
            </div>
        </figure>
        <div class="card-body gap-1.5 p-5">
            <h2 class="card-title text-lg font-semibold">${plant.name}</h2>
            <p class="text-sm text-gray-500">${plant.description}</p>
            <div class="flex justify-between items-center mt-2">
                <span class="badge font-medium bg-emerald-50 text-green-700 border-none py-3 px-4">${plant.category}</span>
                <span class="font-semibold text-lg">৳${plant.price}</span>
            </div>
            <div class="card-actions mt-2">
                <button class="btn bg-green-700 hover:bg-green-800 text-white w-full border-none">Add to Cart</button>
            </div>
        </div>
    `;

    cardContainer.appendChild(newCard);
  });
};

const displayCategories = (categoriesData) => {
  categoriesData.forEach((category) => {
    const categoryBtnContainer = document.getElementById(
      "category-btn-container",
    );

    const newCategoryBtn = document.createElement("li");
    // bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer
    newCategoryBtn.className =
      "px-4 py-2 hover:bg-emerald-100 rounded-lg cursor-pointer";
    newCategoryBtn.innerText = `${category.category_name}`;
    newCategoryBtn.setAttribute(
      "onclick",
      `loadPlantsByCategory(${category.id})`,
    );

    categoryBtnContainer.appendChild(newCategoryBtn);
  });
};

loadAllCategories();
loadAllPlants();
