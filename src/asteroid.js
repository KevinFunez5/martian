import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#submit').click(function() {
    const start = $('#start').val();
    const end = $('#end').val();
    // $('#start').val("");
    // $('#end').val("");
    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${process.env.API_KEY}`;
    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };
    request.open("GET", url, true);
    request.send();
    function getElements(response) {
      $('.results').html(`${response.near_earth_objects}`);
    }
  });
});