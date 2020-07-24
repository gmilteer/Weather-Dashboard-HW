$(document).ready(function () {
 

  var savedCities = [];

  $("#search-button").on("click", function () {
    var userInput = $("#city-name").val();
    var city = $("#current-city");
    var saveCity = $("userInput");
    var newSearch = $("<button type=button class=btn-lg>").text(userInput);
    $("#new-div").append(newSearch);
    city.text(userInput + "|");
    cityName = userInput;

    getWeather(userInput);
    displayDate();
        });
    });
    $(document).on("click", ".search-btn", function () {
        var city = $("#currentCity");
        getWeather($(this).text());
        var citySearch = $(this).text();
        city.text(citySearch + " | ");

    });

    function displayDate() {
        var date = moment().format(("M" + "-" + "D" + "-" + "YYYY") + " |");
        $("#currentDate").text(date);
    };
    function getWeather(userInput) {

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=806cb968e80e73594a933189dd65df65";
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then(function (response) {
      var temp = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
      $("#temperature").text(temp);
      $("#humidity").text(response.main.humidity);
      $("#wind-speed").text(response.wind.speed);
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
        $("#uv-index").text(response.current.uvi);
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

