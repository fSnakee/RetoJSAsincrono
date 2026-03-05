


document.addEventListener('DOMContentLoaded', function () {
  let ultimoCoctel=null;
    function random(){fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => {
            const drink = data.drinks[0];
            ultimoCoctel = drink
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
              const empty = document.getElementById("emptyInfoContainer");
              empty.style.display = "flex"
              console.error('Error fetching data:', error);
            });
          }
    function favorito(){
      if(!ultimoCoctel)return;
      const favContainer = document.querySelector(".favContainer");
      const yaExiste = favContainer.querySelector(`[data-id="${ultimoCoctel.idDrink}"]`);
      if (yaExiste) {
        alert("Este cóctel ya está en tus favoritos");
        return; 
      }
      const emptyMsg = document.querySelector(".emptyFavContainer");
        if (emptyMsg) emptyMsg.style.display = "none";
      const item = document.createElement("div");
        item.classList.add("fav-item");
        item.setAttribute("data-id", ultimoCoctel.idDrink);
        item.innerHTML = `
            <p><strong>${ultimoCoctel.strDrink}</strong></p>
            <p><strong>ID:</strong>${ultimoCoctel.idDrink}</p>
            <button class="removeBtn">X</button>
        `;  
        const botonBorrar = item.querySelector(".removeBtn");
        botonBorrar.addEventListener("click", function() {
        item.remove(); 
        if (favContainer.querySelectorAll(".fav-item").length === 0) {
            if (emptyMsg) emptyMsg.style.display = "block";
        }
    });
        favContainer.appendChild(item);
    }   
random();
const buttonFav = document.getElementById("favBtn");
buttonFav.addEventListener("click", favorito);
const buttonRandom = document.getElementById("randomBtn");
buttonRandom.addEventListener("click", random);
});


