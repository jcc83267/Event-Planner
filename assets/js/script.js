geo = navigator.geolocation;
let latitude = "";
let longitude = "";
let zipcode = "";
let cityName = "";
let restaurantResult = document.querySelector("#restaurant-results");
let eventResult = document.querySelector("#event-results")
const yelpAPIKey = "wgwBHXXCmjfhA8POZxL1enAYiNxFkZaMNuU6dS69ZcDhreiKa8ML6ozNE4iRMt-FSnJ_1NIksvaGTV8231srY2uYwa4kW-Y21BbJA8CcpHlsXhPoTCs_7gNK6VAWYHYx";
//grabs zip from local storage
var storedZip = localStorage.getItem("saveZip");
document.getElementById("manualZipcode").value = storedZip;

//find lat long through viewers device (if supported)
function geoFindMe() {

    function success(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        fetch(`https://open.mapquestapi.com/geocoding/v1/reverse?key=bND6GyuaB7NQRDxRazZuJ5Z96jjtaYvP&location=${latitude},${longitude}&includeRoadMetadata=true&includeNearestIntersection=true`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data)
                zipcode = data.results[0].locations[0].postalCode;
                console.log(zipcode)
                document.getElementById("manualZipcode").value = zipcode;
                //apiCall(latitude, longitude);
            })
    }
    function error() {
        status.textContent = "Unable to retrieve your location";
    }
    if (!navigator.geolocation) {
        status.textContent = "Geolocation is not supported by your browser";
    } else {
        status.textContent = "Locating…";
        navigator.geolocation.getCurrentPosition(success, error);
    }
}

//function to call zomato and yelp, to create a list of 5 results each 
function apiCall(lat, long) {
    //zomato api call start
    fetch(`https://developers.zomato.com/api/v2.1/geocode?lat=${lat}&lon=${long}&apikey=dbd02e4423c6033a5250e6d333cec9d8`)
        //api key for zomato: dbd02e4423c6033a5250e6d333cec9d8 || 6d8b3a7303ea9f77b8f54dac5bc623c3 || 7547a7eff7513a3f9a5f6096095ec8e9
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data)
            //setup for showing restaurants
            for (let i = 0; i < 5; i++) {
                let tempName = data.nearby_restaurants[i].restaurant.name;
                let tempURL = data.nearby_restaurants[i].restaurant.events_url;
                let tempCuisine = data.nearby_restaurants[i].restaurant.cuisines;
                let tempCost = data.nearby_restaurants[i].restaurant.price_range;
                let tempAddress = data.nearby_restaurants[i].restaurant.location.address;
                let tempPrice = ""
                for (let i = 0; i < tempCost; i++) {
                    tempPrice = tempPrice + "$";
                }
                //create break
                let breakEl = document.createElement("br");
                //create container 
                let resultsEl = document.createElement("div");
                resultsEl.classList = "card";
                //create header/upper portion of container
                let headerEl = document.createElement("header");
                headerEl.classList = "card-header";
                //title for header
                let titleEl = document.createElement("p");
                titleEl.classList = "card-header-title";
                titleEl.innerHTML = tempName;
                headerEl.appendChild(titleEl);
                //created the content of the container
                let contentEl = document.createElement("div");
                contentEl.classList = "card-content";
                //info for content
                let contentInfoEl = document.createElement("div");
                contentInfoEl.classList = "content";
                contentInfoEl.innerHTML = "Cuisine Type: ".bold() + tempCuisine + "<br/>Cost: ".bold() + tempPrice + "<br/>Address: ".bold() + tempAddress;
                contentEl.appendChild(contentInfoEl);
                //link for content
                let urlEl = document.createElement("a");
                urlEl.setAttribute("href", tempURL);
                urlEl.setAttribute("target", "_blank");
                urlEl.setAttribute("rel", "noreferrer");
                //name of link for content
                var websiteEl = document.createElement("span");
                websiteEl.textContent = "For more info Click Here";
                urlEl.appendChild(websiteEl);
                contentEl.appendChild(urlEl);
                //append header and content to container
                resultsEl.appendChild(headerEl);
                resultsEl.appendChild(contentEl);
                //append card to box
                restaurantResult.appendChild(breakEl);
                restaurantResult.appendChild(resultsEl);
            }
        });
    //zomato api call end

    //yelp api call start
    fetch("https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/events?latitude=" + lat + "&longitude=" + long + "&sort_on=popularity&sort_by=desc&limit=5", {
        "method": "GET",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Bearer wgwBHXXCmjfhA8POZxL1enAYiNxFkZaMNuU6dS69ZcDhreiKa8ML6ozNE4iRMt-FSnJ_1NIksvaGTV8231srY2uYwa4kW-Y21BbJA8CcpHlsXhPoTCs_7gNK6VAWYHYx"
        }
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            //setup for showing events
            for (let i = 0; i < data.events.length; i++) {
                let tempName = data.events[i].name
                let tempURL = data.events[i].event_site_url
                let tempCategory = data.events[i].category;
                let tempCost = data.events[i].is_free; //
                let tempFree =""
                if(tempCost === true) {
                    tempFree = "Event is free"
                } else {
                    tempFree = "Event is not free(click below for more info)"
                }
                let tempAddress = data.events[i].location.display_address[0] + "," + data.events[i].location.display_address[1]
                //create break
                let breakEl = document.createElement("br");
                //create container 
                let resultsEl = document.createElement("div");
                resultsEl.classList = "card";
                //create header/upper portion of container
                let headerEl = document.createElement("header");
                headerEl.classList = "card-header";
                //title for header
                let titleEl = document.createElement("p");
                titleEl.classList = "card-header-title";
                titleEl.innerHTML = tempName;
                headerEl.appendChild(titleEl);
                //created the content of the container
                let contentEl = document.createElement("div");
                contentEl.classList = "card-content";
                //info for content
                let contentInfoEl = document.createElement("div");
                contentInfoEl.classList = "content";
                contentInfoEl.innerHTML = "Category: ".bold() + tempCategory + "<br/>Price: ".bold() + tempFree + "<br/>Address: ".bold() + tempAddress;
                contentEl.appendChild(contentInfoEl);
                //link for content
                let urlEl = document.createElement("a");
                urlEl.setAttribute("href", tempURL);
                urlEl.setAttribute("target", "_blank");
                urlEl.setAttribute("rel", "noreferrer");
                //name of link for content
                var websiteEl = document.createElement("span");
                websiteEl.textContent = "For more info Click Here";
                urlEl.appendChild(websiteEl);
                contentEl.appendChild(urlEl);
                //append header and content to container
                resultsEl.appendChild(headerEl);
                resultsEl.appendChild(contentEl);
                //append card to box
                eventResult.appendChild(breakEl);
                eventResult.appendChild(resultsEl);
            }
        });
    //yelp api call end
}

//function when the search button is clicked it will save the zipcode then go to reversegeo()
function getzip(events) {
    console.log(events)
    zipcode = document.querySelector("#manualZipcode").value
    reverseGeo(zipcode)

    //stores zip to localstorage
    var zipSave = document.getElementById("manualZipcode").value;
    localStorage.setItem("saveZip", zipSave);
}

//function to convert the zipcode to latlong then goes through the apiCall()
function reverseGeo(zipcode) {
    fetch(`https://open.mapquestapi.com/geocoding/v1/address?key=bND6GyuaB7NQRDxRazZuJ5Z96jjtaYvP&location=${zipcode}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            console.log(data)
            let lat = data.results[0].locations[0].latLng.lat
            let long = data.results[0].locations[0].latLng.lng
            console.log(lat + " " + long)
            apiCall(lat, long);
        })
}

document.querySelector("#find-me").addEventListener("click", geoFindMe);
document.querySelector("#searchbutton").addEventListener("click", getzip)
document.querySelector("#manualZipcode").addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("searchbutton").click();
    }
})