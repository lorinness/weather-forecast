const searchInput = document.getElementById("forecast-city-search");
const searchButton = document.getElementById("search-button");

const validateSearchInput = () => {
  const value = searchInput.value ?? "";
  searchButton.disabled = value.length < 1;
};

validateSearchInput();

searchInput.addEventListener("input", validateSearchInput);
