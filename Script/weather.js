
const KEY = "bd72c143d49f92262a241c663aa3e6e1";

const KELVIN = 273 ;

const notification = document.querySelector('.notification');
const icon  = document.querySelector('.icon');
const tValue = document.querySelector('.temperature-value');
const tDescription = document.querySelector('.temperature-description');
const loca = document.querySelector('.location');


tValue.addEventListener('click',(eventObject)=>{
 
    let  p  = eventObject.target ;
    console.log(p);
   
    if(weather.unit == 'C'){
       let F = weather.temperature * (9/5) + 32 ;
       weather.unit = 'F';
       weather.temperature = Math.floor(F) ;
       tValue.innerHTML = `<p>${weather.temperature}&deg; ${weather.unit}</p>` ;
    }else{
    
        let C = ((weather.temperature - 32)* 5 ) / 9 ;
       weather.unit = 'C';
       weather.temperature = Math.floor(C) ;
       tValue.innerHTML = `<p>${weather.temperature}&deg; ${weather.unit}</p>` ;
    }

})
const weather = {};

const setPosition = position=>{

    weather.latitude = position.coords.latitude;
    weather.longitude = position.coords.longitude;
    getWeather(weather.latitude,weather.longitude);  
     
}
const showError = (error)=>{
    notification.style.display = "block";
   console.log("code",error.code);

    if(error.code == 1)
        notification.innerHTML = "User denied the request for Geolocation." ;
    else
        notification.innerHTML = "Please Connect to Internet." ;
     
}

const displayInfo =(weather)=>{

    icon.innerHTML = `<img src="Icons/${weather.icon}.png">`;
    tValue.innerHTML = `<p>${weather.temperature}&deg;${weather.unit}</p>`;
    tDescription.innerHTML = `<p>${weather.description}</p>` 
    loca.innerHTML = `<p>${weather.city} , ${weather.country}</p>`
}

const getWeather = async(latitude,longitude)=>{
  
  
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
   
  try{
  let response  =  await fetch(api);
  let data      =  await response.json();

   weather.temperature =  Math.floor(data.main.temp - KELVIN);
   weather.city = data.name ;
   weather.country  = data.sys.country;
   weather.description = data.weather[0].main;
   weather.icon  = data.weather[0].icon;
   weather.unit = "C";

   displayInfo(weather);
  
}catch(error){
    notification.style.display = "block";
    notification.innerHTML = "Oops something went wrong :" ;
 
  }
}

if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
   
notification.innerHTML = "Geolocation is not supported by this browser.";
}
