/* Bienvenidos a la AstroTienda */

//Carga de datos y creación de listas de la tienda en línea.


let items = [];
let changuito = JSON.parse(localStorage.getItem("changuito")) || [];
const almacenItems = "json/items.json";


fetch(almacenItems)
.then(response => response.json())
.then (data => {
  items = data;
  traerItems (data);
  
})

.catch(error => console.log(error));


const nuestrosItems = document.getElementById("nuestrosItems");

function traerItems(items) {
  items.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-4", "col-md-6", "col-sm-12");
    card.innerHTML =
      `
    <div class ="card rounded-4">
      <img src = "${producto.img}" class = "card-img-top imgProductos" alt="${producto.nombre}">
      <div class="contenedorDescripcion">
        <h2 class="text-center"> ${producto.nombre} </h2>
        <p class="text-center"> $${producto.precio} </p>
        <button class="btn botonCards" id="boton${producto.id}"> Agregar al Carrito </button>
      </div>
    </div>
    `
    nuestrosItems.appendChild(card);
    //4) 
    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlChango(producto.id);
      Toastify({
        text: "¡Producto agregado! 😊",
        duration: 1000,
        gravity: "bottom",
        position: "right",
        style: {
          background: "linear-gradient(to right, #8360c3, #2ebf91)",
          color: "white"
        }
      }).showToast();
    })
  })
}

//Función para agregar un producto al carrito de compras y actualizar su cantidad si ya está en el carrito

const agregarAlChango = (id) => {
  const producto = items.find((producto) => producto.id === id);
  const itemsEnChango= changuito.some((producto) => producto.id === id);

  const agregandoItems = {
    id: producto.id,
    nombre: producto.nombre,
    precio: producto.precio,
    img: producto.img,
    cantidad: producto.cantidad,
  }

  if (itemsEnChango) {
    const index = changuito.findIndex(p => p.id === id)
    changuito[index].cantidad++;
  } else {
    changuito.push(agregandoItems);
  }
  localStorage.setItem("changuito", JSON.stringify(changuito));
  calcularTotal();
}


//Manejando el contenido del carrito de compras y manipulando el DOM.

 
const contenedorChanguito = document.getElementById("contenedorChanguito");
const verChanguito = document.getElementById("verChanguito");

verChanguito.addEventListener("click", () => {
  miChanguito();
});

const miChanguito = () => {
  contenedorChanguito.innerHTML = "";
  changuito.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("col-xl-4", "col-md-6", "col-sm-12");
    card.innerHTML =
      `
      <div class ="card rounded-4 ">
      <img src="${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
      <div class="contenedorDescripcion">
        <h2 class="text-center">${producto.nombre}</h2>
        <p class="text-center">$${producto.precio}</p>
        <div class="d-flex align-items-center justify-content-center">
          <div class="d-flex flex-row">
            <button class="btn botonCards botonSuma" id="sumar${producto.id}">+</button>
            <span class=" numeroCantidad">${producto.cantidad}</span>
            <button class="btn botonCards botonResta" id="restar${producto.id}">-</button>
          </div>
        </div>
        <button class="btn botonCards" id="eliminar${producto.id}">Eliminar</button>
      </div>
    </div>
`    
    contenedorChanguito.appendChild(card);


  //se suman y restan productos con los botonos correspondientes
  const sumar = document.getElementById(`sumar${producto.id}`)
  sumar.addEventListener("click", () => {
    sumarItem(producto.id);
  })

  const restar = document.getElementById(`restar${producto.id}`)
  restar.addEventListener("click", () => {
    restarItem(producto.id);
  })

  const eliminar = document.getElementById(`eliminar${producto.id}`);
  eliminar.addEventListener("click", () => {
    eliminarItem(producto.id);
  })
})
calcularTotal();
}

// funciones que suman y restan

const sumarItem = (id) => {
  const producto = changuito.find((producto) => producto.id === id);
  producto.cantidad++;
  localStorage.setItem("changuito", JSON.stringify(changuito));
  miChanguito();
}

const restarItem = (id) => {
  const producto = changuito.find((producto) => producto.id === id);
  producto.cantidad--;
  if (producto.cantidad === 0) {
    eliminarItem(id);
    producto.cantidad = 1;
  } else {
    localStorage.setItem("changuito", JSON.stringify(changuito));
  }
  miChanguito();
}

const eliminarItem = (id) => {
  const producto = changuito.find(producto => producto.id === id);
  const indice = changuito.indexOf(producto);
  changuito.splice(indice, 1);
  producto.cantidad = 1;
  miChanguito();
  localStorage.setItem("changuito", JSON.stringify(changuito));
}

// Calculando el total de la compra

const total = document.getElementById("total");

const calcularTotal = () => {
  let totalCompra = 0;
  changuito.forEach(producto => {
    totalCompra += producto.precio * producto.cantidad;
  })
  total.innerHTML = `$ ${totalCompra}`;
}

//vaciar carrito
const vaciarChanguito = document.getElementById("vaciarChanguito");

vaciarChanguito.addEventListener("click", () => {
  swal.fire({
    title: "¿Seguro que quiere eliminar estos productos?",
    icon: "warning",
    confirmButtonText: "Si",
    showCancelButton: true,
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarTodoElCarrito();
      swal.fire({
        title: "Su carrito se encuentra vacío 😔",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "black",
        color: "blueviolet",
        backdrop:"linear-gradient(to right, #8360c3, #2ebf91)",
      })
    }
  })
})


const finalizarCompra = document.getElementById("finalizarCompra");

finalizarCompra.addEventListener("click", () => {
  swal.fire({
    title: "Su pedido esta a un paso. ¿Desea confirmar? 🤔 ",
    icon: "question",
    confirmButtonText: "Si, confirmo",
    showCancelButton: true,
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarTodoElCarrito();
      swal.fire({
        title: "¡Sus productos lo esperan en su e-mail, revise su bandeja de entrada! 🎉",
        icon: "success",
        confirmButtonText: "Aceptar",
        background: "black",
        color: "blueviolet",
        backdrop:"linear-gradient(to right, #8360c3, #2ebf91)",

      })
    }
  })
})

const vaciarTodoElCarrito = () => {
  changuito = [];
  localStorage.clear();
  miChanguito();
}


