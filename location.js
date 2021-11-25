const findMyState=(e)=>{

  

  const success = (position)=>{
    const remain = 0.1706794824218747;
    const latitude =position.coords.latitude+remain
    const longitude = position.coords.longitude;

  
    
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
    .then(response=>response.json())
    .then(data=>{
      const city = data.locality
     
      getLocationWeatherDataFromApi(city)
       
      
    });
    
  }
  const error = ()=>{
    console.log('error') }

  navigator.geolocation.getCurrentPosition(success ,error);
}



const getLocationWeatherDataFromApi = async (e) => {
let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));
let input = e
let weatherType = "metric";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${weatherType}`


const response = await axios.get(url);

const { main, name, sys, weather } = response.data;
const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

const actuelInner = `
 <div class="card d-flex justify-content-center bg-warning m-3 my-3" style="width: 8rem; height: 9rem;">
      <div class="card-body d-flex flex-column justify-content-center">
        <h6 style="font-size:.8rem" class="card-title">${name} <sup style="font-size:.5rem">${
  sys.country
}</sup></h6>
        <p class="card-text mx-4">${Math.round(
          parseFloat(main.temp)
        )}<sup>°C</sup></p>
      </div>
      <img class="city-icon" style="width: 2rem; margin-left: 1rem;" src='${iconUrl}'>
      <p style="font-size:.8rem; text-transform:uppercase; margin-left: 1rem;">${
        weather[0].description
      }</p>

`;
const actuel = document.querySelector(".actuel");
actuel.innerHTML = actuelInner;


}