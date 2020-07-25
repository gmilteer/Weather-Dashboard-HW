$(document).ready(function () {
 
// Empties array of saved cities from user imput
  var savedCities = [];
// click function on search button displays user input onto the city div and data from AJAX request onto the corresponding divs
  $("#search-button").on("click", function () {
    var city = $("#current-city");
    
   
    var userInput = $("#city-name").val();

    if(savedCities.includes(userInput)) {
      return;
    } else {
      savedCities.push(userInput);
      var newSearch = $("<button type='button' id='newSearch' class='search-btn btn-lrg'>").text(userInput)
      $("#new-div").append(newSearch);
    }
    city.text(userInput + " | ")
    cityName = userInput;

    getWeather(userInput);
    displayDate();
    
   
        });
    });
    // click even for city buttons
    $(document).on("click", ".search-btn", function () {
        var city = $("#currentCity");
        getWeather($(this).text());
        var citySearch = $(this).text();
        city.text(citySearch + " | ");

    });
    // Function to display date
    function displayDate() {
        var date = moment().format(("M" + "-" + "D" + "-" + "YYYY") + " |");
        $("#currentDate").text(date);
    };
    // Function that retrieves weather data
    function getWeather(userInput) {

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=806cb968e80e73594a933189dd65df65";
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      var temp = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      $("#temperature").text(temp + "°F");
      $("#humidity").text(response.main.humidity + "%");
      $("#wind-speed").text(response.wind.speed + "mph");
      console.log(response);
     
      var lat = response.coord.lat;
      var lng = response.coord.lon;
      var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lng + "&appid=806cb968e80e73594a933189dd65df65";
      console.log(queryURL);
      $.ajax({
        url: queryURL,
        method: "GET",
      }).then(function (response) {
        console.log(response);
        var uvi =response.current.uvi;
        $("#uv-index").text(response.current.uvi);
        $("#uv-index").text(uvi);
        if (uvi <= 2) {
          $("uv-index").css({
            "background-color": "#88BDBC",
            "padding" : "10px 10px 10px 10px",
            "border" : "2px solid #343a3f",
          });
        } else if (uvi <= 5 && uvi > 2) {
          $("#uv-index").css({
            "background-color": "F3D250",
            "padding" : "10px 10px 10px 10px",
            "border" : "2px solid #343a3F",
          });
        } else {
          $("#uv-index").css ({
            "background-color": "#F78888",
            "padding": "10px 10px 10px 10px",
            "border": "2px solid #343A3F",
          });
        };
      
      });
    });
        

// 5-Day Forecast API
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=e189f3ac24747877cecf335702c81a6e"
$.ajax({
    url: queryURL,
    method: "GET"

}).then(function (response) {
    console.log(response.list)

    for (var i = 0; i < 5; i++) {
        var c = (i * 8);
        var dayDiv = $("#day" + (i + 1));
        var dateDiv = $("#day" + (i + 1)).html(moment().add((i + 1), "days").format("M" + "/" + "D" + "/" + "YYYY"))
        dayDiv.append(dateDiv);
        var iconDiv = $("#weatherIcon" + (i + 1));
        iconDiv.attr("src", "https://openweathermap.org/img/wn/" + response.list[c].weather[0].icon + ".png");
        var tempDiv = $("#tempDay" + (i + 1))
        tempDiv.html(Math.floor((response.list[c].main.temp - 273.15) * 1.80 + 32) + "°F");
        var humidityDiv = $("#humidityDay" + (i + 1));
        humidityDiv.html(response.list[c].main.humidity + "%")

      };
    });
};

