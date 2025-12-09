/*   cartelera proxi  Candy Bar  */

/* Obtiene los botones de las pestañas por su ID */
const tabCartelera = document.getElementById("btnCartelera");
const tabProximamente = document.getElementById("btnProximos");
const tabCandy = document.getElementById("btnSnacks");

/* Obtiene las secciones de contenido por su ID */
const carteleraSection = document.getElementById("seccionCartelera");
const proximamenteSection = document.getElementById("seccionProximos");
const candySection = document.getElementById("seccionSnacks");

/* Muestra la seccion cartelera cuando se hace clic en el boton */
tabCartelera.addEventListener("click", function() {
  tabCartelera.classList.add("activa");
  tabProximamente.classList.remove("activa");
  tabCandy.classList.remove("activa");

  carteleraSection.classList.remove("oculto");
  proximamenteSection.classList.add("oculto");
  candySection.classList.add("oculto");
});

/* Muestra la seccion proximamente cuando se hace clic en el boton */
tabProximamente.addEventListener("click", function() {
  tabProximamente.classList.add("activa");
  tabCartelera.classList.remove("activa");
  tabCandy.classList.remove("activa");

  proximamenteSection.classList.remove("oculto");
  carteleraSection.classList.add("oculto");
  candySection.classList.add("oculto");
});

/* Muestra la seccion candy bar cuando se hace clic en el boton */
tabCandy.addEventListener("click", function() {
  tabCandy.classList.add("activa");
  tabCartelera.classList.remove("activa");
  tabProximamente.classList.remove("activa");

  candySection.classList.remove("oculto");
  carteleraSection.classList.add("oculto");
  proximamenteSection.classList.add("oculto");
});

/*  Modal Login y Registro  */
/* obtiene el modal de login y los botones de abrir y cerrar */
const authModal = document.getElementById("ventanaLogin");
const openBtn = document.querySelector(".boton-principal");
const closeX = document.getElementById("cerrarModal");
const closeLogin = document.getElementById("cerrarIngresar");
const closeRegister = document.getElementById("cerrarRegistrar");

/* abre el modal cuando se hace clic en el boton iniciar sesion */
openBtn.addEventListener("click", function() {
  authModal.style.display = "flex";
});

/* funcion para cerrar el modal */
function closeModal() {
  authModal.style.display = "none";
}

/* asigna la funcion cerrar a los botones de cerrar */
closeX.addEventListener("click", closeModal);
closeLogin.addEventListener("click", closeModal);
closeRegister.addEventListener("click", closeModal);

/* cierra el modal con la tecla Escape */
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    closeModal();
  }
});

/*  cambiar entre login y registro  */
/* obtiene las pestañas y formularios de login y registro */
const tabLogin = document.getElementById("pestanaIngresar");
const tabRegister = document.getElementById("pestanaRegistrar");
const loginForm = document.getElementById("formIngresar");
const registerForm = document.getElementById("formRegistrar");

/* muestra el formulario de login y oculta el de registro */
tabLogin.addEventListener("click", function() {
  tabLogin.classList.add("activa");
  tabRegister.classList.remove("activa");

  loginForm.style.display = "flex";
  registerForm.style.display = "none";
});

/* muestra el formulario de registro y oculta el de login */
tabRegister.addEventListener("click", function() {
  tabRegister.classList.add("activa");
  tabLogin.classList.remove("activa");

  loginForm.style.display = "none";
  registerForm.style.display = "flex";
});

/* registro usuario */
registerForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = registerForm.querySelector("input[type='text']").value;
  const email = registerForm.querySelector("input[type='email']").value;
  const pass = registerForm.querySelectorAll("input[type='password']")[0].value;
  const pass2 = registerForm.querySelectorAll("input[type='password']")[1].value;

  if (pass !== pass2) {
    alert("las contraseñas no coinciden");
    return;
  }

  // guardar usuario en localStorage
  const userData = {
    nombre: nombre,
    email: email,
    pass: pass
  };

  localStorage.setItem("usuarioRegistrado", JSON.stringify(userData));

  alert("Cuenta creada correctamente");

  // cerrar modal
  closeModal();
});


/* inciar secion */
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const email = loginForm.querySelector("input[type='email']").value;
  const pass = loginForm.querySelector("input[type='password']").value;

  const storedUser = JSON.parse(localStorage.getItem("usuarioRegistrado"));

  if (!storedUser) {
    alert("no hay ninguna cuenta registrada.");
    return;
  }

  if (email === storedUser.email && pass === storedUser.pass) {
    alert("sesion iniciada correctamente Bienvenido " + storedUser.nombre);
    closeModal();
  } else {
    alert("Datos incorrectos");
  }
});

/*  funciones para detalles de peliculas */

/* funcion para mostrar el detalle de una pelicula especifica */
function mostrarDetallePelicula(pelicula) {
  /* ocultar todas las secciones principales primero */
  document.getElementById("seccionCartelera").classList.add("oculto");
  document.getElementById("seccionProximos").classList.add("oculto");
  document.getElementById("seccionSnacks").classList.add("oculto");
  
  /* mostrar el detalle especifico de la pelicula */
  const detalleId = "detalle-" + pelicula.toLowerCase();
  document.getElementById(detalleId).classList.remove("oculto");
  
  /* mostrar el modal especifico */
  const modalId = "modal-" + pelicula.toLowerCase();
  document.getElementById(modalId).classList.remove("modal-oculto");
}

/*  volver a cartelera  */
/* funcion para volver a la vista de cartelera desde el detalle de pelicula */
function volverCartelera() {
  
  /* ocultar todos los detalles de peliculas */
  const detalles = document.querySelectorAll(".detalle-pelicula");
  detalles.forEach(detalle => detalle.classList.add("oculto"));
  
  /* ocultar todos los modales */
  const modales = document.querySelectorAll(".modal-pelicula");
  modales.forEach(modal => modal.classList.add("modal-oculto"));
  
  /* mostrar solo la cartelera principal */
  document.getElementById("seccionCartelera").classList.remove("oculto");
  document.getElementById("seccionProximos").classList.add("oculto");
  document.getElementById("seccionSnacks").classList.add("oculto");
  
  /* resetear pestañas */
  document.getElementById("btnCartelera").classList.add("activa");
  document.getElementById("btnProximos").classList.remove("activa");
  document.getElementById("btnSnacks").classList.remove("activa");
}

/* mostrar formulario de compra dentro del modal de pelicula */
function mostrarFormulario(idFormulario) {
  document.getElementById(idFormulario).classList.remove("modal-oculto");
}





/*  CANDY BAR  */
/* array vectorsito para almacenar los productos del carrito */
let carrito = [];

/* funcion para agregar un producto al carrito */
function agregarCarrito(producto) {
    carrito.push(producto);
    alert(producto + " agregado al carrito. Total: " + carrito.length + " items.");
    console.log("Carrito:", carrito);
}

/* funcion para comprar un snack y mostrar el formulario de pago */
function comprarSnack(producto) {
    /* ocultar candy y mostrar formulario */
    document.getElementById('seccionSnacks').classList.add('oculto');
    document.getElementById('formularioPago').classList.remove('oculto');

    /* colocar el nombre del producto en el formulario */
    document.getElementById('productoElegido').textContent = producto;

    /* guardar el producto seleccionado en un atributo del formulario */
    document.getElementById('formPago').dataset.producto = producto;
}

/* funcion para volver a la seccion de candy desde el formulario de pago */
function volverSnacks() {
    document.getElementById('formularioPago').classList.add('oculto');
    document.getElementById('seccionSnacks').classList.remove('oculto');
}

/* manejar envio del formulario de compra */
document.getElementById('formPago').addEventListener('submit', function(e) {
    e.preventDefault();

    const producto = e.target.dataset.producto;
    const nombre = e.target.querySelector('input[type="text"]').value;
    const correo = e.target.querySelector('input[type="email"]').value;

    alert(`Gracias ${nombre} Compraste: ${producto}. Confirmacion enviada a ${correo}.`);

    /* limpiar formulario */
    e.target.reset();

    /* volver al candy */
    volverSnacks();
});

/*  BUSQUEDA DE PELICULAS  */
const searchInput = document.querySelector('.buscador');

/* filtra las peliculas cuando se escribe en el campo de busqueda */
searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const movies = document.querySelectorAll('#seccionCartelera .tarjeta-pelicula');
    
    movies.forEach(movie => {
        const title = movie.querySelector('h3').textContent.toLowerCase();
        const genre = movie.querySelector('.etiqueta-genero').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || genre.includes(searchTerm)) {
            movie.style.display = 'block';
        } else {
            movie.style.display = 'none';
        }
    });
});



// funcion para cambiar de ciudad al seleccionar una opcion
function cambiarCiudad() {
  const selector = document.getElementById('selectorCiudad');
  const pagina = selector.value; // obtiene el valor de la opcion seleccionada
  
  // manda a la página correspondiente
  window.location.href = pagina;
}

// fncion para marcar la opcion correcta según la pagina actual
function marcarCiudadActual() {
  const paginaActual = window.location.pathname.split('/').pop(); // obtiene el nombre del archivo actual
  
  const selector = document.getElementById('selectorCiudad');
  
  // Busca la opcion cuyo valor coincida con la pagina actual
  for (let i = 0; i < selector.options.length; i++) {
    if (selector.options[i].value == paginaActual) {
      selector.selectedIndex = i; // selecciona esa opcion
      break;
    }
  }
}

// al cargar la pagina marca la ciudad actual
document.addEventListener('DOMContentLoaded', marcarCiudadActual);




/*  botno HAMBURGUESA */
const hamburguesaBtn = document.getElementById('hamburguesa');
const navegacionPestanas = document.getElementById('navegacion-pestanas');

if (hamburguesaBtn && navegacionPestanas) {
    let menuAbierto = false;
    
    function esMovil() {
        return window.innerWidth <= 768;
    }
    
    // abre y cerrar menu
    hamburguesaBtn.addEventListener('click', function() {
        if (esMovil()) {
            if (!menuAbierto) {
                // abrir
                navegacionPestanas.classList.add('mostrar');
                this.textContent = '✕';
                menuAbierto = true;
                document.body.style.overflow = 'hidden';
            } else {
                // cerrar
                navegacionPestanas.classList.remove('mostrar');
                this.textContent = '☰';
                menuAbierto = false;
                document.body.style.overflow = '';
            }
        }
    });
    
    // cerrar al hacer clic en una opcion
    document.querySelectorAll('.navegacion-pestanas button').forEach(boton => {
        boton.addEventListener('click', function() {
            if (esMovil() && menuAbierto) {
                navegacionPestanas.classList.remove('mostrar');
                hamburguesaBtn.textContent = '☰';
                menuAbierto = false;
                document.body.style.overflow = '';
            }
        });
    });
}