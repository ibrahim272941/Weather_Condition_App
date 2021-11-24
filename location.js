const findMyState=(e)=>{

  

  const success = (position)=>{
    const remain = 0.1706794824218747;
    const latitude =position.coords.latitude+remain
    const longitude = position.coords.longitude;

    console.log(typeof(latitude))
    
    const geoApiUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

    fetch(geoApiUrl)
    .then(response=>response.json())
    .then(data=>{
      const city = data.locality
     
      getWeatherDataFromApi(city)
       
    });
    
  }
  const error = ()=>{
    console.log('error') }

  navigator.geolocation.getCurrentPosition(success ,error);
}


