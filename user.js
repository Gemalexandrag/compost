const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    $("#coordinates").append("Geolocation is not supported by this browser.");
  }
}

const showPosition = (position) => {
  $("#coordinates").append("Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude);
  $("#loading").append("Loading...");
  reverseGeocoding(position.coords.latitude, position.coords.longitude);
}

const reverseGeocoding = (latitude, longitude) =>{
  const url = "https://us1.locationiq.com/v1/reverse.php?key="+"pk.2409b9389054765bf0147fa8ed85beda"+"&lat="+latitude+"&lon="+longitude+"&format=json"
  var settings = {
    "async": true,
    "crossDomain": true,
    "url" : url,
    "method": "GET"
  }
  $.ajax(settings).done(function (response) {
    let address = response.address.house_number + " " + response.address.road + ", " +  response.address.city + ", " + response.address.state + " " + response.address.postcode;
    getCompostLocations(address);
  });
}
