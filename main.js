


document.addEventListener('DOMContentLoaded', function () {
    fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const coctel = document.getElementsByClassName("infoContainer");
            coctel[0].innerHTML = `<h2>${data.drinks[0].strDrink}</h2>`;
            coctel[0].innerHTML += `<img src="${data.drinks[0].strDrinkThumb}" alt="${data.drinks[0].strDrink}">`;
            coctel[0].innerHTML += `<p><strong>Instructions:</strong> ${data.drinks[0].strInstructions}</p>`;
            coctel[0].innerHTML += `<p><strong>Ingredients:</strong></p>`;
            for (let i = 1; i <= 15; i++) {
                if (data.drinks[0][`strIngredient${i}`]) {
                    coctel[0].innerHTML += `<p>${data.drinks[0][`strMeasure${i}`] || 'To taste '}${data.drinks[0][`strIngredient${i}`]}</p>`;
                
                }
            }

            coctel[0].innerHTML += `<p><strong>ID:</strong> ${data.drinks[0].idDrink}</p>`;
            coctel[0].innerHTML += `<p><strong>Categoria:</strong> ${data.drinks[0].strCategory}</p>`;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});


