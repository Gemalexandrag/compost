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
  for(let i = 0; i < data.length; i++){
    let address = data[i].location + ", " + data[i].borough + ", New York " + data[i].zip_code;
    const url = "http://dev.virtualearth.net/REST/V1/Routes/Driving?o=JSON&wp.0=" + userAddress.replace(" ", "%20") + "&wp.1=" + address.replace(" ", "%20") + "&routeAttributes=routePath&key=AunGgSEZ_MbKXvzPyN3B4kvqK9Ge-k8sNG3zyJ976T4DpWBAzDprClBd-Z4hA4af";
    $.ajax({
      url: url,
      type: "GET"
    }).done(function(info) {
      travelTime.push(info.resourceSets[0].resources[0].travelDuration);
      if(i == data.length - 1){
        let minTime = travelTime.sort((a,b)=>a-b)[0];
        for(let j = 0; j < data.length; j++){
          if(travelTime[j] == minTime){
            console.log(data[j].location + ", " + data[j].borough + ", New York " + data[j].zip_code);
          }
        }
      }
    });
  };
};
