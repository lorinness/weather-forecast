const searchInput = document.getElementById("forecast-city-search");
const searchButton = document.getElementById("search-button");
const successResponseBox = document.getElementById("success-response");
const errorResponseBox = document.getElementById("error-response");

const validateSearchInput = () => {
  const value = searchInput.value ?? "";
  searchButton.disabled = value.length < 1;
};

validateSearchInput();

searchInput.addEventListener("input", validateSearchInput);

successResponseBox.classList.add("hidden");
errorResponseBox.classList.add("hidden");

searchButton.addEventListener("click", () => {
  const city = searchInput.value;

  fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.results?.length) {
        throw new Error();
      }

      successResponseBox.innerHTML = "";
      successResponseBox.classList.remove("hidden");
      errorResponseBox.classList.add("hidden");

      const cityName = data.results[0].name;
      const countryName = data.results[0].country;
      const lat = data.results[0].latitude;
      const long = data.results[0].longitude;

      successResponseBox.innerHTML += `<p>City: ${cityName}</p>`;
      successResponseBox.innerHTML += `<p>Country: ${countryName}</p>`;
      successResponseBox.innerHTML += `<p>Lat: ${lat}</p>`;
      successResponseBox.innerHTML += `<p>Long: ${long}</p>`;
    })
    .catch(() => {
      successResponseBox.classList.add("hidden");
      errorResponseBox.classList.remove("hidden");
    });
});
