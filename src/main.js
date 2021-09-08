import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

$(document).ready(function() {
  $('#picOfTheDay').click(function() {

    let request = new XMLHttpRequest();
    const url = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;

    request.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        getElements(response);
      }
    };

    request.open("GET", url, true);
    request.send();

  function getElements(response) {
      $('.displayPicture').html(`<img src=" ${response.url}">`);
    }
  });
});