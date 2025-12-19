// broweser method -  URLSearchParams
const params = new URLSearchParams(window.location.search);

const city = params.get("city")

const cityName = document.querySelector("#cityName");

let GEODB_API_KEY = "0195a03772mshbea4f740b029fc9p13095bjsn8ee1b9144628"; //starting point
let GEODB_HOST = "wft-geo-db.p.rapidapi.com"; //end point

if(city){
    cityName.textContent = city;

    async function fetchCityDetails(cityName) {
        try{
            let res = await fetch(`https://${GEODB_HOST}/v1/geo/cities?namePrefix=${city}&limit=1`,
                {
                    method: "GET",
                    headers : {
                        "X-RapidAPI-Key": GEODB_API_KEY,
                        "X-RapidAPI-Host":  GEODB_HOST,
                    },
                }
            );
            console.log(res);

            if(!res.ok){
                console.log("API Response Not Fetched..");
            }

            let data = await res.json();
            console.log(data);

            if(!data.data || data.data.length === 0){
                console.log("City Not Found");
            }
            let cityData = data.data[0];
            console.log(cityData);
            
            
            //Display City Info
        }catch(error){
            console.log(error); 
        }
    }

    fetchCityDetails(city);
}else{
    cityName.textContent = "Unknown City"
}
