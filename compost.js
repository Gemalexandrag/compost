//gets array of compost location
const getCompostLocations = (userAddress) => {
  $.ajax({
    url: "https://data.cityofnewyork.us/resource/if26-z6xq.json",
    type: "GET",
    data: {
      "$limit": 5000,
      "$$app_token": "1fpdxhyhYM31oAwRygDarGUOC"
    }
    // calls function-->(to find nearest compost location)
  }).done(function(data) {
    findNearest(data, userAddress);
  });
}
//finds nearest compost location
const findNearest = (data, userAddress) => {
  let travelTime = [];
  let saveTime = [];
  let dataCounter = 0;
  //gets address of all compost locations
  for (let i = 0; i < data.length; i++) {
    let address = data[i].location.split(",")[0] + ", " + data[i].borough + ", New York " + data[i].zip_code;
    const url = "http://dev.virtualearth.net/REST/V1/Routes/Driving?o=JSON&wp.0=" + userAddress.replace(" ", "%20") + "&wp.1=" + address.replace(" ", "%20") + "&routeAttributes=routePath&key=AunGgSEZ_MbKXvzPyN3B4kvqK9Ge-k8sNG3zyJ976T4DpWBAzDprClBd-Z4hA4af";
    $.ajax({
      url: url,
      type: "GET"
    }).done(function(info) {
      dataCounter += 1;
      travelTime[i] = info.resourceSets[0].resources[0].travelDuration;
      saveTime[i] = info.resourceSets[0].resources[0].travelDuration;
      let length = data.length;
      if (dataCounter == length) {
        let minTime = travelTime.sort((a, b) => a - b)[0];
        //goes through ALL compost locations and finds shortest time
        for (let j = 0; j < data.length; j++) {
          if (saveTime[j] == minTime) {
            $("#travel-time").text("Travel time: " + minTime);
            $("#address").text("Address: " + data[j].location + ", " + data[j].borough + ", New York " + data[j].zip_code);
            $("#loading").remove();
            //maps stuff
            var map = new Microsoft.Maps.Map('#myMap');
            //Load the directions module.
            Microsoft.Maps.loadModule('Microsoft.Maps.Directions', function() {
              //Create an instance of the directions manager.
              directionsManager = new Microsoft.Maps.Directions.DirectionsManager(map);

              //Create waypoints to route between.
              var seattleWaypoint = new Microsoft.Maps.Directions.Waypoint({
                address: userAddress
              });
              directionsManager.addWaypoint(seattleWaypoint);

              var workWaypoint = new Microsoft.Maps.Directions.Waypoint({
                address: address
              });
              directionsManager.addWaypoint(workWaypoint);

              //Specify the element in which the itinerary will be rendered.
              directionsManager.setRenderOptions({
                itineraryContainer: '#directionsItinerary'
              });

              //Calculate directions.
              directionsManager.calculateDirections();
            });
            return;
          };
        };
      };
    }).fail(function() {
      dataCounter += 1;
      travelTime[i] = 100000000000000000000000000000000000000000;
      saveTime[i] = 100000000000000000000000000000000000000000;
    })
  };
};
