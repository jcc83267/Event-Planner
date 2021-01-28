// Write a fetch request to the Giphy API
fetch(`https://api.ipgeolocationapi.com/geolocate`)
.then(function(response)
{
   return response.json();
}).then(function(data){
    console.log(data);
})

// Then log the response in the console

