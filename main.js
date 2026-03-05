


document.addEventListener('DOMContentLoaded', function () {
    function random(){fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const coctel = document.getElementsByClassName("cocktailContainer");
            let ingredients = ""

            for (let i = 1; i <= 15; i++) {
              if (data.drinks[0][`strIngredient${i}`]) {
                ingredients += `<li>${data.drinks[0][`strMeasure${i}`] || 'To taste '}${data.drinks[0][`strIngredient${i}`]}</li>`;
              }
            }
            coctel[0].innerHTML = 
              `<div class="title">
              <h2>${data.drinks[0].strDrink} <strong>ID:</strong> ${data.drinks[0].idDrink}</h2>
              </div>
              <div class="image">
              <img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}">
              </div>
              <div class="info">
                <p><strong>Categoria:</strong> ${data.drinks[0].strCategory}</p>
                <p><strong>Ingredients:</strong></p>
                  <ul>
                    ${ingredients}
                  </ul>
              </div>
              <div class="instruction"><p><strong>Instructions:</strong> ${data.drinks[0].strInstructions}</p></div>`;
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
          }
random();
const buttonRandom = document.getElementById("randomBtn");
buttonRandom.addEventListener("click", random);
});


