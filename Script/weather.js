console.log("Weather APi :");

const key = "bd72c143d49f92262a241c663aa3e6e1";

const notification = document.querySelector('.notification');
const icon  = document.querySelector('.icon');
const tValue = document.querySelector('.temperature-value');
const tDescription = document.querySelector('.temperature-description');
const loca = document.querySelector('.location');

const weather = {};

const setPosition = position=>{

    weather.latitude = position.coords.latitude;
    weather.longitude = position.coords.longitude;
    display(weather.latitude,weather.longitude);  
     
}
const showError = (error)=>{
    notification.innerHTML = "User denied the request for Geolocation." ;
}

const display = (latitude,longitude) =>{
  console.log("latitude",latitude);
  console.log("longitude",longitude);
}

if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
   
notification.innerHTML = "Geolocation is not supported by this browser.";
}
