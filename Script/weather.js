
// This is API key :
//Please go , https://openweathermap.org and create own api and use it :
const KEY = "bd72c143d49f92262a241c663aa3e6e1";

 
const KELVIN = 273 ;
//Accessing an Object[element Having class Value = notification] & store to notification :
const notification = document.querySelector('.notification');

//Accessing an Object[element Having class Value = icon] & store to icon:
const icon  = document.querySelector('.icon');

//Accessing an Object[element Having class Value = temperature-value] & store to tValue :
const tValue = document.querySelector('.temperature-value');

//Accessing an Object[element Having class Value = temperature-description] & store to tDescription :
const tDescription = document.querySelector('.temperature-description');

//Accessing an Object[element Having class Value = location] & store to loca :
const loca = document.querySelector('.location');


//handling click event  on tValue Object :
tValue.addEventListener('click',(eventObject)=>{
 
    //Accessing element whom to click event Apply :
    let  p  = eventObject.target ;
    
   //Check temperature unit in Celceis or not :
   // if in Celceis it convert it into Fehrenheit and show to User :
   //otherwise it convert into celceis ans show to User: 
    if(weather.unit == 'C'){
      //converting  celceis to fehrenheit : 
       let F = weather.temperature * (9/5) + 32 ;

       //changing unit to fehrenheit:
       weather.unit = 'F';
       //rounding temperature value and store to temperature :
       weather.temperature = Math.floor(F) ;
       
       //show temperature to User :
       tValue.innerHTML = `<p>${weather.temperature}&deg; ${weather.unit}</p>` ;
    }else{
       //converting   fehrenheit to celceis : 
       let C = ((weather.temperature - 32)* 5 ) / 9 ;
        
       //changing unit to Celceis:
       weather.unit = 'C';

       //rounding temperature value and store to temperature :
       weather.temperature = Math.floor(C) ;

       //show temperature to User :
       tValue.innerHTML = `<p>${weather.temperature}&deg; ${weather.unit}</p>` ;
    }

})

//Crating weather object in order to store weather information :
const weather = {};

//It is set Position Function:It has one parameter  :
//parameter = position => storing longitude and latitude of particular location :
const setPosition = position=>{
   
    //Accessing latitude and store to weather object :
    weather.latitude = position.coords.latitude;

    //Accessing longitude and store to weather object :
    weather.longitude = position.coords.longitude;
  
    //Calling getWeather function and passing latitude and longitude to it :
    getWeather(weather.latitude,weather.longitude);  
     
}

//It is set showError Function:It has one parameter  :
//parameter = error => storing Error found while getting user location:
const showError = (error)=>{
  
    // Making notification object visible to User :
    notification.style.display = "block";
    
    if(error.code == 1)
        notification.innerHTML = "User denied the request for Geolocation." ;
    else
        notification.innerHTML = "Please Connect to Internet." ;
     
}

//It is display function :responsible to display weather information to user:
//It has one parameter: weather  
const displayInfo =(weather)=>{

    //Displaying  weather data :
    icon.innerHTML = `<img src="Icons/${weather.icon}.png">`;
    tValue.innerHTML = `<p>${weather.temperature}&deg;${weather.unit}</p>`;
    tDescription.innerHTML = `<p>${weather.description}</p>` 
    loca.innerHTML = `<p>${weather.city} , ${weather.country}</p>`
}

//It is asynchronous getWeather  function : responsible to get weather information from server and store to 
// Weather Object :
//receiving two parameter :latitude ,longitude 
const getWeather = async(latitude,longitude)=>{
  
  //It is link where we will get weather infomation on basics of latitude and longitude of user location: 
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`;
  
  //try & catch blocks:responsible to handling Runtime Error: 
  //try block : if any runtime error thown ,then it catch ny catch block and execute catch block:
  try{
  
  //calling fetch api and passing it  server link ,in order to retrieve  weather information:
  //fetch Api  return promise Object with response
  //when promise is resolved then response receive to response Object (with help of await ):     
  let response  =  await fetch(api);
  
  // response.json() function also return promise :
  //when promise is resolved then data receive to data Object(with the help of await ): 
  let data      =  await response.json();

  //retrieve weather information from data and store to it weather Object :

  //temperature receive from serve in form of kelvin :
   weather.temperature =  Math.floor(data.main.temp - KELVIN); //converting Kelvin to celceis :
   weather.city = data.name ;
   weather.country  = data.sys.country;
   weather.description = data.weather[0].main;
   weather.icon  = data.weather[0].icon;
   weather.unit = "C";

   //Calling display function and passing weather Object:
   displayInfo(weather);
  
}catch(error){
    notification.style.display = "block";
    notification.innerHTML = "Oops something went wrong :" ;
 
  }
}

//It checking whether User browser support Geolocation API or not:
//Geolocation is an API ,responsible to retrieve user location :
//If support then get User location:
//If not then show message to User :
if(navigator.geolocation){

  //getCurrentPosition is a method present inside geolocation Object{Property}:It is callback methods,
  // taking two functions,first setPosition function,2nd is showError function :
  //if user support geolocation API then getCurrentPositon method retrieve user location ,then pass location to
  //setPosition method & call it .
  // if getCurrentPosition method not able to retrieve user location then it pass error to showError method and call it.
    navigator.geolocation.getCurrentPosition(setPosition,showError);
}else{
 //Assigning an string to notification Object :  
notification.innerHTML = "Geolocation is not supported by this browser.";
}
