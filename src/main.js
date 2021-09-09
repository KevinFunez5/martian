import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function checkDate(start) {
  if (start <= 0) {
    return new Error("Not a valid Date! You IDIOT!!");
  } else {
    return true;
  }
}

$(document).ready(function() {
  let request = new XMLHttpRequest();
  const img = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;
  request.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      const response = JSON.parse(this.responseText);
      getElements(response);
    }
  };
  request.open("GET", img, true);
  request.send();
  function getElements(response) {
    $('.displayPicture').html(`<img src=" ${response.url}">`);
  }
  let count = 0;
  $('#submit').click(function() {
    count = 0;
    const start = $('#start').val();
    // const end = $('#end').val();
    // $('#start').val("");
    // $('#end').val("");
    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${start}&api_key=${process.env.API_KEY}`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    request.open("GET", url, true);
    request.send();
    function getElements(response) {
      $('.name').html(`Asteroid name: ${response.near_earth_objects[start][count].name}`);
      $('.diameter').html(`Estimated Diameter in Feet: ${Math.floor(response.near_earth_objects[start][count].estimated_diameter.feet.estimated_diameter_max)}`);
      $('.hazard').html(`Is hazardous: ${response.near_earth_objects[start][count].is_potentially_hazardous_asteroid}`);
      $('.velocity').html(`Velocity: ${Math.floor(response.near_earth_objects[start][count].close_approach_data[0].relative_velocity.miles_per_hour)} MPH`);
      $('.link').html(`<a href =" ${response.near_earth_objects[start][count].nasa_jpl_url}">Additional Information</a>`);
    }
    $(".showButton").show();
    try {
      const isDateValid = checkDate(start);
      if (isDateValid instanceof Error){
        console.error(isDateValid.message)
        throw RangeError("Not a valid Date! You IDIOT!!");
      } else {
        console.log("Try was successful, no need to catch. Not an idiot :)");
        // $("#displayDate").text("This is a valid date.");
      }
    } catch(error){
      console.error(`Red alert! There's an error! ${error.message}`);
      $('#displayDate').text("please enter a date >:(");
    }
  });
  $('#next').click(function() {
    count += 1;
    const start2 = $('#start').val();
    let request = new XMLHttpRequest();
    const url2 = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start2}&end_date=${start2}&api_key=${process.env.API_KEY}`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        let total = response.near_earth_objects[start2].length;
        if (total > count){
          count + 1;
        } else {
          count = 0;
        }
        getElements(response);
      }
    };
    request.open("GET", url2, true);
    request.send();
    function getElements(response) {
      $('.name').html(`Asteroid name: ${response.near_earth_objects[start2][count].name}`);
      $('.diameter').html(`Estimated Diameter in Feet: ${Math.floor(response.near_earth_objects[start2][count].estimated_diameter.feet.estimated_diameter_max)}`);
      $('.hazard').html(`Is hazardous: ${response.near_earth_objects[start2][count].is_potentially_hazardous_asteroid}`);
      $('.velocity').html(`Velocity: ${Math.floor(response.near_earth_objects[start2][count].close_approach_data[0].relative_velocity.miles_per_hour)} MPH`);
      $('.link').html(`<a href =" ${response.near_earth_objects[start2][count].nasa_jpl_url}">Additional Information</a>`);
    }
  });
});