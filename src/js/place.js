const params = new URLSearchParams(window.location.search)
const city = params.get("city")

const cityName = document.querySelector("#cityName")
const loading = document.querySelector("#loading")
const placeBox = document.querySelector("#placeBox")
const errors = document.querySelector("#error")

if(!city){
    loading.classList.add("hidden")
    errors.textContent = "City Not Provided"
    errors.classList.remove("hidden")
}else{
    
}