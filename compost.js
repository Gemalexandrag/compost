const getCompostLocations = (userAddress) =>{
  $.ajax({
    url: "https://data.cityofnewyork.us/resource/if26-z6xq.json",
    type: "GET",
    data: {
      "$limit" : 5000,
      "$$app_token" : "1fpdxhyhYM31oAwRygDarGUOC"
    }
}).done(function(data) {
  findNearest(data, userAddress);
});
}

const findNearest = (data, userAddress) => {
  let travelTime = [];
  let saveTime = [];
  for(let i = 0; i < data.length; i++){
    let address = data[i].location.split(",")[0] + ", " + data[i].borough + ", New York " + data[i].zip_code;
    const url = "http://dev.virtualearth.net/REST/V1/Routes/Driving?o=JSON&wp.0=" + userAddress.replace(" ", "%20") + "&wp.1=" + address.replace(" ", "%20") + "&routeAttributes=routePath&key=AunGgSEZ_MbKXvzPyN3B4kvqK9Ge-k8sNG3zyJ976T4DpWBAzDprClBd-Z4hA4af";
    $.ajax({
      url: url,
      type: "GET"
    }).done(function(info) {
      travelTime.push(info.resourceSets[0].resources[0].travelDuration);
      saveTime.push(info.resourceSets[0].resources[0].travelDuration);
      if(i == data.length - 1){
        let minTime = travelTime.sort((a,b)=>a-b)[0];
        console.log(saveTime);
        for(let j = 0; j < data.length; j++){
          if(saveTime[j] == minTime){
            $("#coordinates").append("<br> Travel time: " + minTime + "<br> Address: " + data[j].location + ", " + data[j].borough + ", New York " + data[j].zip_code);
            $("#loading").remove();
            var map = new Microsoft.Maps.Map('#myMap');
           //Load the directions module.
           Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function () {
               //Create an instance of the directions manager.
               directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

               //Create waypoints to route between.
               var seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: userAddress });
               directionsManager.addWaypoint(seattleWaypoint);

               var workWaypoint = new Microsoft.Maps.Directions.Waypoint({ address: address});
               directionsManager.addWaypoint(workWaypoint);

               //Specify the element in which the itinerary will be rendered.
               directionsManager.setRenderOptions({ itineraryContainer: '#directionsItinerary' });

               //Calculate directions.
               directionsManager.calculateDirections();
           });
            return;
          }
        }
      }
    });
  };
};
