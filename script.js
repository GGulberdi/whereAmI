
const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");
const latitudeInput = document.querySelector("#latitude");
const longitudeInput = document.querySelector("#longitude");

const apiKey = "1d034200-3668-11eb-92d4-75137161fa98";  

const whereAmI = function (lat, lng) {
  
    let full =`https://app.geocodeapi.io/api/v1/reverse?apikey=1d034200-3668-11eb-92d4-75137161fa98&point.lat=${lat}&point.lon=${lng}`
    let countryUrl = 'https://restcountries.eu/rest/v2/name/'
    console.log(full)
   fetch(full).then((response)=>{
      if(!response.ok){
            return new Error(`Problem with GeocodeApi web site with the code ${response.status}`)
          }else{
            return response.json()
          }
        }).then((data)=>{
      console.log(data);
      let cntry = data.features["0"].properties.country;
      let region = data.features["0"].properties.region;
      console.log(`You are in ${cntry}, country of ${region}`)
      fetch(`${countryUrl}${cntry}`).then(response=>{
        if(!response.ok){
              return new Error(`Problem with country web site with the code ${response.status}`)
            }else{
              return response.json()
            }
      }).then(data=>{
        console.log(data);
        renderCountry(data[0], region)
      }).catch(error=>{
    console.log(error);
  });
 })
 }
    // console.log(whereAmI('52.508','13.381'))
whereAmI(latitudeInput.value,longitudeInput.value)


btn.addEventListener("click", displayCountry);

