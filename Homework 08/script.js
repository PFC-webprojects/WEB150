/*

Homework #8 - Sunny with Chance of Awesome

Peter Caliandro
WEB 150
Winter 2018
March 20, 2018

script.js

*/

//  These constants are used for both visual identification of table columns and programmatic identification of table cell values.
const DT_DY = "day";
const DT_DT = "date";
const DT_TM = "time";
const TEMP  = "temperature";
const PSR   = "pressure";
const DESC  = "description";
const CLOUD = "cloud_cover";
const RAIN  = "rain";
const SNOW  = "snow";
const HMD   = "humidity";
const WNDSP = "wind_speed";
const WNDDG = "wind_direction";
const ICO   = "icon"

//  These constants are used as class names to indicate the style of certain table cells.  If their values are changed, then the corresponding entries in styles.css will also have to be changed.
const SHD   = "shaded";

//  This array, with its implicit numeric indexes from 0 to 15, enables compass directions in degrees to be converted to the symbols for their corresponding cardinal directions.
const CARD_DIR = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW"
];

const WEB_ADDRESS = "http://api.openweathermap.org/data/2.5/forecast";  //  This is where the weather data comes from.
const API_KEY     = "ce6da552b3e49367622e6950c4c88c5c";  //  This constant was supplied by OpenWeatherMap to allow access to their data.


$(document).ready(function() {
    $("#submit").click(function(event) {
        event.preventDefault();  //  The submit button in the HTML form will reload the page if this statement isn't run.  Setting up the button as a submit button enables its click event to be triggered when the user hits the <Enter> key from anywhere in the form.
    });
    $("#submit").on("click", getWeather);
    $("#system").on("click", convertValues);

});


function getWeather() {
//  Get the city name from the city input element.
//  Submit an AJAX request for weather data for that city name.
//  Supply actions to take if the city name is clearly invalid,
//      while waiting for a response, after receiving a failure response, and after receiving the requested data.
    var city = $("#city > input").val().trim();
    if (city.length && isNaN(city.charAt(0))) {  //  Reject blank and numeric city submissions.
        var requestString  =  WEB_ADDRESS + "?q=" + city + ",US&APPID=" + API_KEY;
        var request = jQuery.ajax({url: requestString});
        waitMessage();  //  Display this message while the application is asynchronously waiting for OpenWeatherMap to return our requested dataset.

        request.done(function(response) {
            createSummary(response);
            createTable(response);
            markHighsLows();
            convertValues();
        });

        request.fail(function() {
            $("#respnse").html("<p>Sorry, this request did not succeed.</p>");
        });

    } else {
        $("#response").html('<p class="warning"><i>Please enter the name of a city in the United States.</i></p>');
    }
}


function waitMessage() {
//  Post a message to the web page while the application is waiting for a response from OpenWeatherSource.
    $("#response").html('<p>Waiting for a response (sometimes this takes a few seconds) . . . </p>')
        .append("<p>If you don't see results after fifteen seconds or more, it might be the case that " +
            "<i>" + $("#city > input").val().trim() + "</i> is not in the database.&nbsp; You could try " +
            "entering a nearby location instead.</p>")
        .append("<p>Unfortunately, searching by City and State together is not available at this time.</p>");
}


function createSummary(jsonResponse) {
//  Post information near the top of the web page about the city for which forecast data has been requested.
//  Also post information to help users interpret the weather data on the rest of the web page.
    var latitude  = jsonResponse.city.coord.lat;
    latitude  =  Math.abs(latitude).toFixed(2) + " °" +
        (latitude < 0  ?  "S"  :  "N");

    var longitude = jsonResponse.city.coord.lon;
    longitude  =  Math.abs(longitude).toFixed(2) + " °" +
        (longitude < 0  ?  "W"  :  "E");

    var timeZone = (new Date(jsonResponse.list[0].dt * 1000)).toString().split(" ").splice(5).join(" ");

    $("#response")
        .html("<hr />")
        .append("<h3>Five-Day Weather Forecast for " +
            jsonResponse.city.name + ", " +
            jsonResponse.city.country + "</h3>")
        .append("<p>located at " +
            latitude + ", " + longitude + "</p>")
        .append("<p>Note that all times shown below are for your time zone, " +
            timeZone + ".&nbsp;  If " + jsonResponse.city.name +
            " is in a different time zone, then you will have to" +
            " adjust the time difference accordingly.</p>")
        .append('<p>Also note that <span class="daily_high">daily high</span> ' +
            'and <span class="daily_low">daily low</span> temperatures are ' +
            'marked below only for those days for which there is complete ' +
            'information.</p>');
}


function createTable(jsonResponse) {
//  Post a table of weather forecast details for the requested city.
    $("#response").append("<table></table>");
    $("#response > table").html('<tr id="header"></tr>');
    $("#response > table > tr").html(createTableDataRow());  //  Calling createTableDataRow() with no argument will cause it to create the table's header row.
    jsonResponse.list.forEach(function(record){  //  Each item in the array of objects that is  jsonResponse.list  contains all forecast information for a three-hour time interval and will comprise one row of the results table.
        $("#response > table > tr:last").after(createTableDataRow(record));
    });
}


function createTableDataRow(forecast) {
    var header   =   typeof forecast  ===  "undefined";  //  Calling createTableDataRow() with no argument will cause it to create the table's header row.
    if (!header) {
        var dateParts   = new Date(forecast.dt * 1000).toString().split(" ");  //  Split a full-length JavaScript date string into its component parts for use in separate table fields.
    }

    //  The order of the table's columns, both in the header row and in the data rows, is determined solely by the order of the set() calls in the chained statement below.
    var forecastMap = new Map()  //  I'm using a map here because I want the iteration order to be guaranteed, because I want the keys and values to be defined in parallel for ease of reading, and because I want the keys and values to be simultaneously accessible later through an enumeration.
        .set(DT_DY,  header || dateParts[0])  //  If header is false, then dateParts[0] will be the value matched to the key DT_DY.  If header is true, then true gets matched, which is inconsequential, as it won't be needed.
        .set(DT_DT,  header || dateParts.slice(1, 4).join(" "))  //  See the const declarations earlier in this module . . .
        .set(DT_TM,  header || dateParts[4])
        .set(ICO,    header || forecast.weather[0].icon)
        .set(DESC,   header || forecast.weather[0].description)
        .set(TEMP,   header || forecast.main.temp)
        .set(PSR,    header || forecast.main.pressure)
        .set(CLOUD,  header || forecast.clouds.all)
        .set(HMD,    header || forecast.main.humidity)
        .set(RAIN,   header || forecast.hasOwnProperty("rain") ?
                     header || forecast.rain.hasOwnProperty("3h") ?
                     header || forecast.rain["3h"] : 0 : 0)  //  .rain and .snow may or may not show up in the forecast object.  Even if they do, they may contain either a .3h property or no properties at all.  These nested ternary operators cover all the possibilities.
        .set(SNOW,   header || forecast.hasOwnProperty("snow") ?
                     header || forecast.snow.hasOwnProperty("3h") ?
                     header || forecast.snow["3h"] : 0 : 0)
        .set(WNDSP,  header || forecast.wind.speed)
        .set(WNDDG,  header || forecast.wind.deg);

    if (header) {  //  Create header row from information in forecastMap.
        var dataRowHtml = "";
        forecastMap.forEach(function(value, key, map) {
            dataRowHtml += "<th><div><span>" +  //  The div and the span here are used by the CSS to format the header row just right.
                ("_" + key).split("_").reduce((fieldName, word) =>  //  The added "_" is simply to ensure that the reduce method acts on the first word as well as any remaining words.
                fieldName + " " + word.charAt(0).toUpperCase() + word.slice(1))  //  Each key here comes from one of the global constants declared at the top of this module.  All we're doing here is replacing any underscores with spaces and capitalizing each of the resulting words.
                + "</span></div></th>";
        });
    } else {  //  Create and format data row from information in forecastMap.    
        this.shaded  =  this.shaded || false;  //  The use of  this  effectively makes  shaded  a static property of the createTableDataRow() function, since this function is an object.  Here we are initializing shaded to false, if it has not yet been defined, which means, if createTableDataRow() is being called for the first time.
        if (this.previousDay !== forecastMap.get(DT_DY)) {  //  As with the above line,  this.previousDay  is effectively a (private) static variable.
            this.shaded = !this.shaded;  //  If this day is different from the previous day, then toggle  this.shaded.
        }
        var shadeClass   =  this.shaded ? (' class="' + SHD + '"') : '';
        this.previousDay =  forecastMap.get(DT_DY);  //  Set this static value for use in the next call to this function.
        var dataRowHtml  = '<tr' + shadeClass + '>';  //  Add a class to this table row if it is to be shaded.
        for (var [key, value] of forecastMap.entries()) {  //  Iterate through the keys and corresponding values of the map  forecastMap  in order to reduce it to a string to be applied as the HTML to create a data row in the weather forecast table.
            dataRowHtml  +=  '<td class="' + key + ' ' + typeof value + '" ' +
                             'data-' + key + '="' + value + '">' + value + '</td>';  //  The purpose of setting classes here is for measurement system conversion within the table, after initial loading of data.  The  'data-' + key  HTML attribute will store the raw data for each table cell in its original format and accuracy.  This data will be used later by the measurement system conversion method.
        }
        dataRowHtml += "</tr>";
    }
    return dataRowHtml;
}


function markHighsLows() {
//  For each day for which all eight 3-hour weather predictions are available,
//  find the highest and lowest temperatures and apply a class to each to visually identify it.
    var uniqueDates = [];  //  Create an array to contain each date in the forecast.
    $("#response > table td." + DT_DT).each(function() {
        if (!uniqueDates.includes($(this).data(DT_DT))) {
            uniqueDates.push($(this).data(DT_DT));  //  Populate the array with each date that has not yet been encountered.
        }
    });
    
    uniqueDates.forEach(function(uniqueDate) {
        var dayTemperatureCells = $("#response > table td." + DT_DT +
            "[data-" + DT_DT + "='" + uniqueDate + "']").siblings("td." + TEMP);  //  Select all the temperature cells corresponding to this particular date.
        if (dayTemperatureCells.length < 8) {  //  But don't bother identifying a daily high or low if we don't have all eight forecasts for that day.
            return;
        }
        var highTemperature = -Infinity;
        var lowTemperature  =  Infinity;
        dayTemperatureCells.each(function() {  //  Find the highest and lowest temperatures for this date.
           var thisTemperature = $(this).attr("data-" + TEMP);
           if (thisTemperature > highTemperature) {
               highTemperature = thisTemperature;
           }
           if (thisTemperature < lowTemperature) {
               lowTemperature = thisTemperature;
           }
        });
        dayTemperatureCells.filter("[data-" + TEMP + "='" + highTemperature + "']").addClass("daily_high");  //  Add a class to mark the cell(s) with the daily high.
        dayTemperatureCells.filter("[data-" + TEMP + "='" +  lowTemperature + "']").addClass("daily_low");
    });
}


function convertValues() {
//  Extract the raw numeric data stored behind the scenes in many of the table data cells,
//  convert it to either metric or U.S. standard, format it nicely, and display it in the table data cells.

    if (! $("#response > table").length) {
        return;  //  This function will get called if the user changes the value of the Measurement System radio buttons.  However, let's not bother running this function when there is no table yet to run it on.
    }

    var metric = $("input[value='metric']").prop("checked");  //  Determines to which measurement system to convert values.

    $("#response > table td." + TEMP).each(function() {  //  Run this function on each of the td elements with class TEMP, in other words, all the cells in the temperature column.
        var kelvin      =  $(this).data(TEMP);
        var celsius     =  kelvin - 273.15;
        var fahrenheit  =  celsius * 9.0 / 5.0  +  32.0;
        var display     =  metric ? celsius : fahrenheit;
        $(this).html(display.toFixed(2)  +  (metric ? " °C" : " °F"));
    });

    $("#response > table td." + PSR).each(function() {
        var hectopascals   =  $(this).data(PSR);
        var inchesmercury  =  hectopascals / 33.8639;
        var display        =  metric ? hectopascals : inchesmercury;
        $(this).html(display.toFixed(2)  +  (metric ? " hPa" : " in"));
    });

    $("#response > table td." + CLOUD).each(function() {
        $(this).html(($(this).data(CLOUD)).toFixed(0) + "%");
    });

    $("#response > table td." + RAIN).each(function() {
        var millimeters   =  $(this).data(RAIN);
        var inches        =  millimeters * 0.0393700787401575;
        var display       =  metric ? millimeters : inches;
        $(this).html(display.toFixed(2)  +  (metric ? " mm" : " in"));
    });

    $("#response > table td." + SNOW).each(function() {
        var millimeters   =  $(this).data(SNOW);
        var centimeters   =  millimeters * 0.1;
        var inches        =  millimeters * 0.0393700787401575;
        var display       =  metric ? centimeters : inches;
        $(this).html(display.toFixed(2)  +  (metric ? " cm" : " in"));
    });

    $("#response > table td." + HMD).each(function() {
        $(this).html(($(this).data(HMD)).toFixed(0) + "%");
    });

    $("#response > table td." + WNDSP).each(function() {
        var meterssecond  =  $(this).data(WNDSP);
        var kilometerhour =  meterssecond * 3.6;
        var mileshour     =  meterssecond * 2.236936292054402;
        var display       =  metric ? kilometerhour : mileshour;
        $(this).html(display.toFixed(2)  +  (metric ? " km/h" : " mph"));
    });

    $("#response > table td." + WNDDG).each(function() {
        $(this).html(CARD_DIR[Math.round(($(this).data(WNDDG)) / 22.5) % 16]);  //  Mod 16 enables values beyond 348.75° to get mapped to CARD_DIR[0] (N).
        $(this).css("text-align", "left");  //  This CSS is an exception to the rule, as we have converted a number to a string that is really meant as a string . . .
    });
    
    $("#response > table td." + ICO).each(function() {
        $(this).html('<img src="http://openweathermap.org/img/w/' +
            $(this).data(ICO) + '.png" />'); 
    });
}
