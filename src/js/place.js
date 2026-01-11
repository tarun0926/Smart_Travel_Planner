const params = new URLSearchParams(window.location.search);
const city = params.get("city");

const cityName = document.querySelector("#cityName");
const loading = document.querySelector("#loading");
const placeBox = document.querySelector("#placeBox");
const errors = document.querySelector("#error");

let openweathermap_apikey = "30c7736a1814ed777cb3d565545845f2";
let unsplash_apikey = "O5R-wAnWZbIHNeZ5-JTaPoAXiNjScLHX5R2Hfck97do";
let geoapify_apikey = "349da27a2fad43e0a9b104702d9aa98b";

if (!city) {
  loading.classList.add("hidden");
  errors.textContent = "City Not Provided";
  errors.classList.remove("hidden");
} else {
  cityName.textContent = `Best places in ${city}`;
  async function fetchPlaces(cityName) {
    try {
      // Getting Lat & Lon from openweather api
      const geoRes = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${openweathermap_apikey}`
      );
      const geoData = await geoRes.json();

      if (!geoData.length) throw new Error("City Not Found");

      const { lat, lon } = geoData[0];

      // Get Places From GeoAPIfy
      const placesRes = await fetch(
        `https://api.geoapify.com/v2/places?categories=tourism.sights&filter=circle:${lon},${lat},12000&limit=12&apiKey=${geoapify_apikey} `
      );

      if (!placesRes.ok) throw new Error("Places API Failed");

      const data = await placesRes.json();
      loading.classList.add("hidden");

      console.log(data);
      

    } catch (error) {
      console.log("Places Error:", error.message);
      loading.classList.add("hidden");
      errors.textContent = error.message;
      errors.classList.remove("hidden");
    }
  }
  fetchPlaces(city);
}
