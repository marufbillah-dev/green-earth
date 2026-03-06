const loading = (status) => {
  const cardContainer = document.getElementById("card-container");
  const loadingElement = document.getElementById("loading")
  if (status) {
    cardContainer.classList.add("hidden")
    loadingElement.classList.remove("hidden")
  } else {
    cardContainer.classList.remove("hidden")
    loadingElement.classList.add("hidden")
  }
}

const loadAllCategories = () => {
  loading(true);
  const allCategoriesUrl =
    "https://openapi.programming-hero.com/api/categories";

  fetch(allCategoriesUrl)
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
};

const loadAllPlants = () => {
  loading(true);
  const allPlantUrl = "https://openapi.programming-hero.com/api/plants";

  fetch(allPlantUrl)
    .then((response) => response.json())
    .then((data) => displayPlants(data.plants));
};

const loadPlantsByCategory = (id) => {
  const activeBtnStyle = () => {
    const allCategoryBtn = document.querySelectorAll(".category-btn");
    const clickedBtn = document.getElementById(id);

    allCategoryBtn.forEach((btn) => {
      btn.className =
        "px-4 py-2 hover:bg-emerald-100 rounded-lg cursor-pointer category-btn";
    });

    clickedBtn.className =
      "bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer category-btn";
  };
  activeBtnStyle();
  
  loading(true);

  const plantsByCategoryUrl = `https://openapi.programming-hero.com/api/category/${id}`;

  fetch(plantsByCategoryUrl)
    .then((response) => response.json())
    .then((data) => displayPlants(data.plants));
};

const loadPlantDetails = (id) => {
  const plantDetailsUrl = `https://openapi.programming-hero.com/api/plant/${id}`;

  fetch(plantDetailsUrl)
    .then((response) => response.json())
    .then((data) => displayPlantDetails(data.plants));
};

const displayPlantDetails = (plantDetails) => {
  const plantDetailsContainer = document.getElementById(
    "plant-details-container",
  );
  plantDetailsContainer.innerHTML = "";

  plantDetailsContainer.innerHTML = `
    <div class="w-full md:w-1/2 h-64 md:h-auto">
        <img src="${plantDetails.image}" alt="Mango Tree" class="w-full h-full object-cover" />
    </div>

    <div class="w-full md:w-1/2 p-8 flex flex-col justify-between">
        <div>
            <div class="flex justify-between items-start mb-2 md:mt-2">
                <h3 class="text-2xl font-bold text-gray-800">${plantDetails.name}</h3>
                <span class="badge bg-emerald-100 text-green-700 border-none font-semibold">${plantDetails.category}</span>
            </div>

            <p class="py-4 text-gray-600 leading-relaxed text-sm">
                ${plantDetails.description}
            </p>

            <div class="mt-4">
                <span class="text-3xl font-bold text-green-800">৳${plantDetails.price}</span>
                <span class="text-gray-400 text-sm ml-2">/ per sapling</span>
            </div>
        </div>

        <div class="modal-action mt-8 flex gap-3">
            <form method="dialog" class="flex-1">
                <button
                    class="btn btn-outline border-gray-200 w-full rounded-xl hover:bg-gray-100 hover:text-gray-800">Close</button>
            </form>
            <button
                class="btn bg-yellow-400 hover:bg-yellow-500 text-green-900 border-none flex-2 rounded-xl px-8">
                Add to Cart
            </button>
        </div>
    </div>
  `;
  plant_modal.showModal();
};

const displayPlants = (plantsData) => {
  const cardContainer = document.getElementById("card-container");
  cardContainer.innerHTML = "";

  plantsData.forEach((plant) => {
    const newCard = document.createElement("div");
    newCard.className =
      "card bg-base-100 shadow-sm border border-gray-100 flex flex-col h-full";
    newCard.innerHTML = `
    <figure class="px-4 pt-4">
        <div class="w-full h-48 bg-gray-200 rounded-xl overflow-hidden cursor-pointer"
            onclick="loadPlantDetails(${plant.id})">
            <img src="${plant.image}" alt="${plant.name}"
                class="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
        </div>
    </figure>
    <div class="card-body gap-1.5 p-5 flex flex-col justify-between">
        <div>
            <h2 class="card-title text-lg font-semibold cursor-pointer hover:text-green-700"
                onclick="loadPlantDetails(${plant.id})">
                ${plant.name}
            </h2>
            <p class="text-sm text-gray-500 line-clamp-2">${plant.description}</p>
        </div>

        <div class="mt-auto">
            <div class="flex justify-between items-center mt-2">
                <span
                    class="badge font-medium bg-emerald-50 text-green-700 border-none py-3 px-4">${plant.category}</span>
                <span class="font-semibold text-lg">৳${plant.price}</span>
            </div>
            <div class="card-actions mt-4">
                <button class="btn bg-green-700 hover:bg-green-800 text-white w-full border-none">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
`;

    cardContainer.appendChild(newCard);
  });
  loading(false);
};

const displayCategories = (categoriesData) => {
  categoriesData.forEach((category) => {
    const categoryBtnContainer = document.getElementById(
      "category-btn-container",
    );

    const newCategoryBtn = document.createElement("li");
    // bg-green-700 text-white px-4 py-2 rounded-lg cursor-pointer category-btn
    newCategoryBtn.className =
      "px-4 py-2 hover:bg-emerald-100 rounded-lg cursor-pointer category-btn";
    newCategoryBtn.innerText = `${category.category_name}`;
    newCategoryBtn.setAttribute(
      "onclick",
      `loadPlantsByCategory(${category.id})`,
    );
    newCategoryBtn.setAttribute("id", `${category.id}`);

    categoryBtnContainer.appendChild(newCategoryBtn);
  });
  loading(false);
};

loadAllCategories();
loadAllPlants();
