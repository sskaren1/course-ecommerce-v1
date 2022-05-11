// Variables
// Render cursos
const containerCard = document.querySelector(".content-card");

const card = document.querySelector(".card");

// console.log("1", card.childNodes);
// console.log("2", card.children);
// console.log("dbCursos", dbCursos);

// Renderizado
render();
function render() {
  // Renderizado de los cursos en base a dbCursos
  renderCursos();
}

// Listeners
cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"

  // Cuando se elimina un curso del carrito

  // Al Vaciar el carrito
}

function renderCursos() {
  dbCursos.forEach((curso) => {
    const cardContent = document.createElement("div");
    cardContent.classList.add("card");
    // console.log("cursos", curso);

    cardContent.innerHTML = `    
      <img
        src=${curso.imagen}
        class="imagen-curso w-100"
      />
      <div class="info-card">
        <h4>${curso.nombre}</h4>
        <p>${curso.autor}</p>
        <img src="/assets/image/estrellas.png" class="image-stars mb-5" />
        <div class="d-flex justify-content-around align-items-center" >
          <p class="precio">${curso.price}</p>
          <p class="precio-span">${curso.priceSale}</p>
        </div>
        <button
          href="#"
          type="button" class="btn btn-warning agregar-carrito text-light fw-bold w-100 mx-auto"
          data-id="1">
          Agregar Al Carrito
        </button>
      </div>        
    `;

    // Agregar el html creado al containerCard
    containerCard.appendChild(cardContent);
  });
}
