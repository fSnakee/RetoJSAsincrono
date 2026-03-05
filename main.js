document.addEventListener('DOMContentLoaded', function () {
  let ultimoCoctel=null;
  function buscarID(id) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
                const drink = data.drinks[0];
                ultimoCoctel = drink;
                const coctelContainer = document.querySelector(".cocktailContainer");
                let ingredients = "";
                for (let i = 1; i <= 15; i++) {
                    if (drink[`strIngredient${i}`]) {
                        ingredients += `<li>${drink[`strMeasure${i}`] || 'To taste '} ${drink[`strIngredient${i}`]}</li>`;
                    }
                  }
                coctelContainer.innerHTML = `
                    <div class="title"><h2>${drink.strDrink}<span class="titleId"><strong> ID: </strong>${drink.idDrink}</span></h2></div>
                    <div class="image"><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></div>
                    <div class="info">
                        <p><strong>Category: </strong>${drink.strCategory}</p>
                        <p><strong>Ingredients:</strong></p>
                        <ul>${ingredients}</ul>
                    </div>
                    <div class="instruction"><p><strong>Instructions: </strong>${drink.strInstructions}</p></div>`;
            });
    }
function random()
  {fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    .then(response => response.json())
    .then(data => {
        buscarID(data.drinks[0].idDrink); 
        })
        .catch(error => {
          const empty = document.getElementById("emptyInfoContainer");
          empty.style.display = "flex"
          console.error('Error fetching data:', error);
        });
      }
function favorito() {
    if (!ultimoCoctel) return;
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
    const idParaBuscar = ultimoCoctel.idDrink;
    item.innerHTML = `
        <p>
            <img src="${ultimoCoctel.strDrinkThumb}" class="favImg">
            <strong>${ultimoCoctel.strDrink}</strong> 
            <span class="fav-itemId"><strong>ID:</strong> ${ultimoCoctel.idDrink}</span>
            <button class="removeBtn">X</button>
        </p>
    `;
    item.addEventListener("click", function () {
        buscarID(idParaBuscar);
    });
    const botonBorrar = item.querySelector(".removeBtn");
    botonBorrar.addEventListener("click", function (e) {
        e.stopPropagation();
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


