document.addEventListener('DOMContentLoaded', function () {
    let ultimoCoctel = null;
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    function buscarID(id) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then(response => response.json())
            .then(data => {
                const loadContainer = document.getElementById("loadContainer")
                loadContainer.style.display = "none"
                const drink = data.drinks[0];
                ultimoCoctel = drink;
                const coctelContainer = document.getElementById("cocktailContainer");
                coctelContainer.style.display = "grid"
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
    function random() {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
            .then(response => response.json())
            .then(data => {
                buscarID(data.drinks[0].idDrink);
                const coctelContainer = document.getElementById("cocktailContainer");
                coctelContainer.style.display = "none"
                const loadContainer = document.getElementById("loadContainer")
                loadContainer.style.display = "flex"
            })
            .catch(error => {
                const empty = document.getElementById("emptyInfoContainer");
                empty.style.display = "flex"
                console.error('Error fetching data:', error);
            });
    }

    function guardarFavoritos() {
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
    function favorito() {
        
        const loadFavContainer = document.getElementById("loadFavContainer");
        loadFavContainer.style.display = "block"

        if (!ultimoCoctel) return;
        
        const yaGuardado = favoritos.find(f => f.id === ultimoCoctel.idDrink);
        
        if (yaGuardado) {
            document.getElementById("alreadyFavPopup").style.display = "flex";
            loadFavContainer.style.display = "none"
            return;
        }

        favoritos.push({
            id: ultimoCoctel.idDrink,
            nombre: ultimoCoctel.strDrink
        });

        guardarFavoritos();

        cargarFavoritos();
    }

    function cargarFavoritos() {

        const favContainer = document.getElementById("favItemContainer");
        favContainer.innerHTML = "";

        const loadFavContainer = document.getElementById("loadFavContainer");
        const emptyFavContainer = document.getElementById("emptyFavContainer");
        
        const emptyMsg = document.querySelector(".emptyFavContainer");
        if (favoritos.length === 0) {
            emptyMsg.style.display = "block "
            loadFavContainer.style.display = "none"
            return;
        }
        if (emptyMsg) emptyMsg.style.display = "none";


        favoritos.forEach(fav => {

            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${fav.id}`)
                .then(response => response.json())
                .then(data => {

                    loadFavContainer.style.display = "none"

                    const drink = data.drinks[0];

                    const item = document.createElement("div");
                    item.classList.add("fav-item");
                    item.setAttribute("data-id", drink.idDrink);

                    item.innerHTML = `
            <div class="itemFav">
                <img src="${drink.strDrinkThumb}" class="favImg">
                <strong class="cocktailName">${drink.strDrink}</strong> 
                <div class="idRemoveBtn">
                    <span class="fav-itemId"><strong>ID:</strong> ${drink.idDrink}</span>
                    <button class="removeBtn">X</button>
                </div>
            </div>
            `;

                    item.addEventListener("click", function () {
                        buscarID(drink.idDrink);
                    });

                    const botonBorrar = item.querySelector(".removeBtn");

                    botonBorrar.addEventListener("click", function (e) {
                        e.stopPropagation();

                        const loadFavContainer = document.getElementById("loadFavContainer");
                        loadFavContainer.style.display = "block"

                        favoritos = favoritos.filter(f => f.id !== drink.idDrink);
                        guardarFavoritos();

                        cargarFavoritos();
                    });

                    favContainer.appendChild(item);

                });

        });
    }

    cargarFavoritos();
    random();
    const buttonFav = document.getElementById("favBtn");
    buttonFav.addEventListener("click", favorito);
    const buttonRandom = document.getElementById("randomBtn");
    buttonRandom.addEventListener("click", random);

    const popupCloseBtn = document.getElementById("popupCloseBtn");
    popupCloseBtn.addEventListener("click", function () {
        document.getElementById("alreadyFavPopup").style.display = "none";
    });
    document.getElementById("alreadyFavPopup").addEventListener("click", function (e) {
        if (e.target === this) this.style.display = "none";
    });
});


