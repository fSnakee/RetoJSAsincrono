document.addEventListener('DOMContentLoaded', function() {

    innertext = document.getElementsByClassName('infoContainer');
    innertext[0].innerHTML = "Hello World";

});


fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });