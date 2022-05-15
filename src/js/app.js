// Variables
// Render cursos
const containerCard = document.querySelector(".content-card");
// Render carrito
const basketContainer = document.querySelector('#lista-carrito tbody');
const emptyBasket = document.querySelector('#vaciar-carrito'); 
let coursesInBasket = [];
// Icon cart
const iconCart = document.querySelector('#icon-cart');
// console.log("dbCursos", dbCursos);

// Evento para la navegación fija
window.addEventListener("scroll", function(){
  navegacionFija()
});
// Función para la navegación fija
function navegacionFija() {
  const header = document.querySelector("header");
  header.classList.toggle('fijo', window.scrollY > 0);
}

// Renderizado
render();
function render() {
  // Renderizado de los cursos en base a dbCursos
  renderCursos();
  // Cart Full
  cartFull();
}

// Listeners
cargarEventListeners();
function cargarEventListeners() {
  // Dispara cuando se presiona "Agregar Carrito"
  containerCard.addEventListener("click", agregarCurso);
  // Cuando se elimina un curso del carrito
  carrito.addEventListener('click', removeCourse);
  // Al Vaciar el carrito
  emptyBasket.addEventListener('click', removeBasket);  
}

// Funciones
// Función que renderiza los cursos
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
          data-id=${curso.id}>
          Agregar Al Carrito
        </button>
      </div>        
    `;

    // Agregar el html creado al containerCard
    containerCard.appendChild(cardContent);
  });
}

// Función 
function cartFull() {
  // console.log('total cursos', coursesInBasket.length);

  if(coursesInBasket.length>0){
    iconCart.classList.add('icon-cart-full');
  } else{
    iconCart.classList.remove('icon-cart-full');
    // Limpiar el html
    basketContainer.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML = `
         <td colspan="4" class="text-center pt-5">  
              <p class="fs-2 ">Carrito Vacío<p/>
         </td>
    `;
    // Agrega el html del carrito en el body
    basketContainer.appendChild(row);
  }
}

// Función que añade el curso al carrito
function agregarCurso(e) {
  e.preventDefault();
  // console.log(e.target);

  // Delegation para agregar-carrito
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    // Enviamos el curso seleccionado para tomar sus datos
    //  console.log(cursoSeleccionado);
    leerDatosCurso(cursoSeleccionado);
  }
}

// Función para leer los datos del curso
// Lee el contenido del card al que le dimos click y extrae la información del curso
function leerDatosCurso(curso) {
  // Crear un objeto con el contenido del curso seleccionado
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio-span").textContent,
    id: curso.querySelector("button").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  if (coursesInBasket.some((curso) => curso.id === infoCurso.id)) {
    const cursos = coursesInBasket.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    coursesInBasket = [...cursos];
  } else {
    coursesInBasket = [...coursesInBasket, infoCurso];
  }

  // console.log(coursesInBasket)
  renderBasket();
}

// Función que muestra el curso seleccionado en el Carrito
function renderBasket() {
  // Limpiar el html
  basketContainer.innerHTML = '';

  // Recorrer el carrito y renderizar el html
  coursesInBasket.forEach(curso => {
    const { imagen, titulo, precio, cantidad, id} = curso;
    const row = document.createElement('tr');
    row.innerHTML = `
         <td>  
              <img src="${curso.imagen}" width=100>
         </td>
         <td>${curso.titulo}</td>
         <td class="text-center">${curso.precio}</td>
         <td class="text-center">${curso.cantidad} </td>
         <td class="text-center">
              <button  type="button" class="btn btn-danger rounded-circle borrar-curso" data-id="${curso.id}">X</button>
         </td>
    `;

    // Agrega el html del carrito en el body
    basketContainer.appendChild(row);
  });

  // Cart full
  cartFull();

}

// Función para eliminar el curso seleccionado del carrito en el DOM
function removeCourse(e) {
  e.preventDefault();

  if(e.target.classList.contains('borrar-curso') ) {
    // e.target.parentElement.parentElement.remove();
    const cursoId = e.target.getAttribute('data-id')
     
    // Eliminar del arreglo coursesInBasket
    coursesInBasket = coursesInBasket.filter(curso => curso.id !== cursoId);

    renderBasket();
  }

  // Cart full
  cartFull();
}

// Función para eliminar todos los cursos del carrito en el DOM
function removeBasket() {
  // forma lenta
  // basketContainer.innerHTML = '';

  // forma rapida 
  while(basketContainer.firstChild) {
       basketContainer.removeChild(basketContainer.firstChild);
  }

  coursesInBasket = []

  // Cart full
  cartFull();
}
