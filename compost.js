const getCompostLocations = () =>{
  $.ajax({
    url: "https://data.cityofnewyork.us/resource/if26-z6xq.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "1fpdxhyhYM31oAwRygDarGUOC"
    }
}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});
}

const findNearest = (data) =>{

}

const reverseGeocoding = (latitude, longitude) =>{
  const url = "https://us1.locationiq.com/v1/reverse.php?key="+"pk.2409b9389054765bf0147fa8ed85beda"+"&lat="+latitude+"&lon="+longitude+"&format=json"
  var settings = {
  "async": true,
  "crossDomain": true,
  "url" : url,
  "method": "GET"
}
