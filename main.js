


document.addEventListener('DOMContentLoaded', function () {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const coctel = document.getElementsByClassName("infoContainer");
            coctel[0].innerHTML = `<div class="title"><h2>${data.drinks[0].strDrink} <strong>ID:</strong> ${data.drinks[0].idDrink}</h2></div>`;
            coctel[0].innerHTML += `<div class="image"><img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}"></div>`;
            coctel[0].innerHTML += `<div class="info"><p><strong>Categoria:</strong> ${data.drinks[0].strCategory}</p>`;
            coctel[0].innerHTML += `<p><strong>Ingredients:</strong></p>`;
            for (let i = 1; i <= 15; i++) {
              if (data.drinks[0][`strIngredient${i}`]) {
                coctel[0].innerHTML += `${data.drinks[0][`strMeasure${i}`] || 'To taste '}${data.drinks[0][`strIngredient${i}`]}`;
              }
            }
            coctel[0].innerHTML += `<div class="instruction"><p><strong>Instructions:</strong> ${data.drinks[0].strInstructions}</p></div>`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


