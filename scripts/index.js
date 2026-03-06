const loading = (status) => {
  const cardContainer = document.getElementById("card-container");
  const loadingElement = document.getElementById("loading");
  if (status) {
    cardContainer.classList.add("hidden");
    loadingElement.classList.remove("hidden");
  } else {
    cardContainer.classList.remove("hidden");
    loadingElement.classList.add("hidden");
  }
};

const loadAllCategories = async () => {
  loading(true);
  const allCategoriesUrl =
    "https://openapi.programming-hero.com/api/categories";

  const response = await fetch(allCategoriesUrl);
  const data = await response.json();
  displayCategories(data.categories);
};

const loadAllPlants = async () => {
  loading(true);
  const allPlantUrl = "https://openapi.programming-hero.com/api/plants";

  const response = await fetch(allPlantUrl);
  const data = await response.json();
  displayPlants(data.plants);
};

const loadPlantsByCategory = async (id) => {
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

  const response = await fetch(plantsByCategoryUrl);
  const data = await response.json();
  displayPlants(data.plants);
};

const loadPlantDetails = async (id) => {
  const plantDetailsUrl = `https://openapi.programming-hero.com/api/plant/${id}`;

  const response = await fetch(plantDetailsUrl);
  const data = await response.json();
  displayPlantDetails(data.plants);
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
            <p class="text-sm text-gray-500">${plant.description}</p>
        </div>

        <div class="mt-auto">
            <div class="flex justify-between items-center mt-2">
                <span
                    class="badge font-medium bg-emerald-50 text-green-700 border-none py-3 px-4">${plant.category}</span>
                <span class="font-semibold text-lg">৳${plant.price}</span>
            </div>
            <div class="card-actions mt-4">
                <button class="btn bg-green-700 hover:bg-green-800 text-white w-full border-none" onclick="addToCart('${plant.id}', '${plant.name}', ${plant.price})">
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
    newCategoryBtn.onclick = () => loadPlantsByCategory(category.id);
    newCategoryBtn.setAttribute("id", `${category.id}`);

    categoryBtnContainer.appendChild(newCategoryBtn);
  });
  loading(false);
};

let cart = [];

const addToCart = (plantId, plantName, plantPrice) => {
  const existingItem = cart.find((item) => item.plantId === plantId);

  if (existingItem) {
    existingItem.plantQuantity += 1;
  } else {
    cart.push({ plantId, plantName, plantPrice, plantQuantity: 1 });
  }

  displayToCart();
};

const displayToCart = () => {
  const cartItemsContainer = document.getElementById("cart-items-container");
  cartItemsContainer.innerHTML = "";

  let cartTotalPrice = 0;

  cart.forEach((item) => {
    cartTotalPrice += item.plantPrice * item.plantQuantity;

    const newCart = document.createElement("div");
    newCart.className =
      "flex justify-between items-center text-sm bg-emerald-50 px-4 py-2 rounded-lg";
    newCart.innerHTML = `
      <div class="space-y-2">
          <p class="font-semibold">${item.plantName}</p>
          <p class="text-gray-400">৳${item.plantPrice} × ${item.plantQuantity}</p>
      </div>
      <button class="text-gray-400  hover:text-red-400 transition-all duration-100 text-2xl cursor-pointer p-1 w-6.5 h-6.5 rounded-full flex justify-center items-center hover:bg-emerald-100" onclick="deleteCartItem(${item.plantId})">×</button>
  `;

    cartItemsContainer.appendChild(newCart);
  });

  const cartTotalPriceElement = document.getElementById("cart-total-price");
  cartTotalPriceElement.innerText = cartTotalPrice;
};

const deleteCartItem = (plantId) => {
  const newCartItems = cart.filter((item) => item.plantId != plantId);
  cart = newCartItems;

  displayToCart();
};

loadAllCategories();
loadAllPlants();
