const params = new URLSearchParams(window.location.search);
const city = params.get("city");
// console.log(city);

const cityName = document.querySelector("#cityName");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error");

let API_KEY = "30c7736a1814ed777cb3d565545845f2";

if (!city) {
  loading.classList.add("hidden");
  errorBox.classList.remove("hidden");
} else {
  cityName.textContent = city;

  async function fetchWeather(cityName) {
    try {
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`
      );
      console.log(geoRes);

      if (!geoRes.ok) throw new Error("Geo API failed");

      const geoData = await geoRes.json();
      console.log(geoData);

      let { lat, lon } = geoData[0];
      console.log(lat, lon);
    } catch (error) {
      console.log(error, "Error in Fetching Weather Details");
      loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }
  fetchWeather(city);
}
