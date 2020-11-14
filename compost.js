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

const sortTimes = (travelArray) => {
  let tempArray = travelArray;
  console.log("0");
  let min = tempArray[0];
  for(let i = 1; i < tempArray.length; i++){
    console.log("1");
    if(min > tempArray[i]){
      console.log("2");
      min = tempArray[i];
    };
  };
  return min;
};

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
    });
  };
  console.log(travelTime);
  let minTime = sortTimes(travelTime);
  console.log(minTime);
};
