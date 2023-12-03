// Cambiar de página
let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');
const btnBuscar = document.getElementById('btnBuscar');

btnSiguiente.addEventListener('click', () => {
    if (pagina < 1000) {
        pagina += 1;
        cargarPeliculas();
    }
});

btnAnterior.addEventListener('click', () => {
    if (pagina > 1) {
        pagina -= 1;
        cargarPeliculas();
    }
});

btnBuscar.addEventListener('click', () => {
    cargarPeliculas(); // Realiza la búsqueda al hacer clic en el botón
});

// Enlazar con una API
const cargarPeliculas = async () => {
    try {
        const inputBusqueda = document.getElementById('inputBusqueda');
        const busqueda = inputBusqueda.value.trim();

        let url;
        if (busqueda !== '') {
            // Si hay una búsqueda, utiliza la URL de búsqueda
            url = `https://api.themoviedb.org/3/search/movie?api_key=77a64b14d4be6cfbc73ca802ea334186&language=es-ES&query=${busqueda}&page=${pagina}`;
        } else {
            // Si no hay búsqueda, utiliza la URL de películas populares
            url = `https://api.themoviedb.org/3/movie/popular?api_key=77a64b14d4be6cfbc73ca802ea334186&language=es-ES&page=${pagina}`;
        }

        const respuesta = await fetch(url);

        if (respuesta.status === 200) {
            const datos = await respuesta.json();
            let peliculas = '';

            datos.results.forEach(pelicula => {
                peliculas += `
                    <div class="peliculas">
                        <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                        <h3 class="titulo">${pelicula.title}</h3>
                    </div>
                `;
            });
            // En caso de Error
            document.getElementById('contenedor').innerHTML = peliculas;
        } else if (respuesta.status === 401) {
            console.log('Llave mal');
        } else if (respuesta.status === 404) {
            console.log('La película no existe');
        } else {
            console.log('Error inesperado');
        }
    } catch (error) {
        console.log(error);
    }
};

// Cargar las películas al cargar la página
cargarPeliculas();
