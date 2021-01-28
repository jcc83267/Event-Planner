// Write a fetch request to the Giphy API
//fetch(`https://api.ipgeolocationapi.com/geolocate`)
//.then(function(response)
//{
   //return response.json();
//}).then(function(data){
    //console.log(data);
//})

// Then log the response in the console
let lat = 0;
let long = 0;


//Ticketmaster API
fetch('https://app.ticketmaster.com/discovery/v2/events.json?latlong&apikey=yBsl7HwVy9ACMlaFULOndxI8rHxtRPAt').then(function(response){
    return response.json(); 
}).then(function(data){
    console.log(data);
    console.log(data._embedded.events[0].name);
})


//Zomato API
fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=34.147785&lon=-118.144516&apikey=dbd02e4423c6033a5250e6d333cec9d8`)
.then(function(response)
{
   return response.json();
}).then(function(data){
    console.log(data);
    console.log("Name of restaurant: " + data.nearby_restaurants[0].restaurant.name)
})