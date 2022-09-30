const getJSON = "https://japceibal.github.io/japflix_api/movies-data.json";
let listadoPeliculas = [];

function mostrarPeliculas(listadoPeliculas) {
  let peli = "";
  for (let i = 0; i < listadoPeliculas.length; i++) {
    let pelicula = listadoPeliculas[i];

    peli += `<button type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
    <div class= "card p-3 bg-dark col-md-4 w-auto h-auto">
        <div class="d-flex flex-start align-items-center">
            <div class="user d-flex flex-row align-items-center">
            <a><span><medium class="font-weight-bold text-white">${
              pelicula.title
            }</medium><br> 
            <p class="font-weight-bold text-secondary">${
              pelicula.tagline
            }</p></span>
            </div>
        </div>
            <div class="icons position-absolute bottom-0 end-0" id='estrellas'>
                ${puntaje(pelicula.vote_average / 2)}
            </div>
    </div> </button>
    <div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">${
              pelicula.title
            }</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            ${pelicula.overview}
        </div>
        <hr>
            <div class="dropdown">
                <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                    Dropdown button
                </button>
                     <div class="dropdown-menu">
                        <a class="dropdown-item">${pelicula.title}</a>
                          <a class="dropdown-item" href="#"></a>
                             <a class="dropdown-item" href="#">Something else here</a>
                     </div>
            </div>
    
    </div>
`;
  }
  document.getElementById("lista").innerHTML = peli;
}

function puntaje(puntos) {
  let estrellas = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= puntos) {
      estrellas += '<i class="fa fa-star"></i>';
    } else {
      estrellas += '<i class="fa fa-star-o"></i>';
    }
  }
  return estrellas;
}
let obtenerJson = function (url) {
  var result = {};
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = "ok";
      result.data = response;
      return result;
    })
    .catch(function (error) {
      result.status = "error";
      result.data = error;
      return result;
    });
};
function filtro() {
  let peliBuscada = document.getElementById("inputBuscar").value;

  let listafiltrada = listadoPeliculas.filter((movie) => {
    //filter devuelve un nuevo array conteniendo los coincidentes
    return (
      movie.title.toLowerCase().indexOf(peliBuscada.toLowerCase()) > -1 ||
      movie.tagline.toLowerCase().indexOf(peliBuscada.toLowerCase()) > -1 ||
      movie.overview.toLowerCase().indexOf(peliBuscada.toLowerCase()) > -1 ||
      movie.title.toLowerCase().indexOf(peliBuscada.toLowerCase()) > -1
    ); //si lo escrito está en el array devuelve su posición
    //si no lo está devuelve -1
  });
  mostrarPeliculas(listafiltrada); // escribo la lista filtrada
}
document.addEventListener("DOMContentLoaded", function () {
  obtenerJson(getJSON).then(function (resultObj) {
    if (resultObj.status === "ok") {
      listadoPeliculas = resultObj.data;
    }
  });
  document.getElementById("btnBuscar").addEventListener("click", () => {
    filtro();
  });
});
