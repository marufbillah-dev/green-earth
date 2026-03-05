const loadAllCategories = () => {
  const allCategoriesUrl =
    "https://openapi.programming-hero.com/api/categories";

  fetch(allCategoriesUrl)
    .then((response) => response.json())
    .then((data) => displayCategories(data.categories));
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
