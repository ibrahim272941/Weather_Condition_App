const form = document.querySelector(".top-banner form");

const formInput = document.querySelector(".top-banner input");
const message = document.querySelector(".top-banner .msg");

const list = document.querySelector(".cities");

const apiKey = "34012183b5a60cf5e2938d7f0859ea5e";

localStorage.setItem("apiKey", EncryptStringAES(apiKey));
localStorage.setItem(
  "apikey",
  EncryptStringAES("4d8fb5b93d4af21d66a2948710284366")
);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
let apiKey = DecryptStringAES(localStorage.getItem("apiKey"));

let input = formInput.value;
let weatherType = "metric";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=${weatherType}`;



//default konum alarak ekrana güncel verme

    
try {
const response = await axios.get(url);

const { main, name, sys, weather } = response.data;
const cityListItems = list.querySelectorAll(".city");
const cityListItemsArray = Array.from(cityListItems);

if (cityListItemsArray.length > 0) {
  const filteredArray = cityListItemsArray.filter(
    (item) =>
      item.querySelector(".city-name span").innerText.toLowerCase() ==
      name.toLowerCase()
  );
  if (filteredArray.length > 0) {
    message.innerText = `You already know the weather for ${
      filteredArray[0].querySelector(".city-name span").innerText
    }, please search for another city`;
    form.reset();
    formInput.focus();
    return;
  }
} 

const iconUrl = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0].icon}.svg`;
// console.log(iconUrl);

const createdCityCard = document.createElement("li");
createdCityCard.classList.add("city");
const createdCityCardInner = `
<div class = "head">
<h2 class="city-name" data-name="${name},${
  sys.country
}"><span>${name}</span><sup>${sys.country}</sup>
</h2>
<button><i style="font-size: 2rem;" class="fas fa-window-close"></i></button>
</div>

<div class="city-temp">${Math.round(parseFloat(main.temp))}<sup>°C</sup></div>
<figure>
<img class="city-icon" src="${iconUrl}">
<figcaption>${weather[0].description}</figcaption>
</figure>`;
createdCityCard.innerHTML = createdCityCardInner;
list.appendChild(createdCityCard);

message.innerText = "";
form.reset();
formInput.focus();
} 

catch (error) {
    message.innerText = `The City is not founded ${error} `;
}


};

const cardDelete = (city)=>{
    city.parentElement.parentElement.parentElement.remove();
}
list.addEventListener('click',(e)=>{
    if (e.target.classList.contains('fas')) {
       cardDelete(e.target)
        
    }
})

