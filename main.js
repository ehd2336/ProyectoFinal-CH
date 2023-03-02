/**ASTROTIENDA */


class Producto{
    constructor(id, nombre, precio, img){
    this.id= id;
    this.nombre= nombre;
    this.precio= precio;
    this.img= img;
    this.cantidad =1; 
}
}


const carta = new Producto (1, "Carta Online", 3000, "img/carta.png" );
const informe = new Producto (2, "Informe Escrito", 2000, "img/papiro.png" );
const taller = new Producto (3,"Taller de la Luna", 2500, "img/luna.png");
const revolucion = new Producto (4, "Revolución Solar", 1500, "img/astrologia.png");


//creamos el array con el catalogo
const productos = [carta, informe, taller, revolucion];

console.log(productos);

//creamos array vacio para el carrito:

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}


const elementos = document.getElementById ("elementos");



const mostrarProductos= () => {
    productos.forEach (producto =>{
      const card = document.createElement ("div");
      card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
      card.innerHTML = `
        <div class = "card"> 
          <img src = "${producto.img}" class="card-img-top imgProductos" alt="${producto.nombre}">
          <div> 
            <h5>${producto.nombre}</h5>
            <p>$${producto.precio}</p>
            <div>
              <button class="btn colorBoton" id="menos${producto.id}">-</button>
              <p id="cantidad${producto.id}"> ${producto.cantidad}</p>
              <button class="btn colorBoton" id="mas${producto.id}">+</button>
            </div>
            <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar Producto</button>
            <button class="btn colorBoton" id="agregar${producto.id}">Agregar al carrito</button>
          </div>
        </div>
      `;
  
      elementos.appendChild(card);
  
      //agregar productos al carrito:
      const boton = document.getElementById(`agregar${producto.id}`);
      boton.addEventListener("click", () =>{
        agregarAlCarrito(producto.id);
        productoEnCarrito = carrito.find(producto => producto.id === id);
      });
  
      // Eliminar producto del carrito
      const botonEliminar = document.getElementById(`eliminar${producto.id}`);
      botonEliminar.addEventListener("click", () => {
        eliminarDelCarrito(producto.id);
        productoEnCarrito = carrito.find (producto => producto.id ===id);
      });
  
      // Restar cantidad del producto
      const botonMenos = document.getElementById(`menos${producto.id}`);
      botonMenos.addEventListener("click", () => {
        restarProducto(producto.id);
        const cantidad = document.getElementById(`cantidad${producto.id}`);
        productoEnCarrito = carrito.find(producto => producto.id === producto.id);

      });
  
      // Aumentar cantidad del producto
      const botonMas = document.getElementById(`mas${producto.id}`);
      botonMas.addEventListener("click", () => {
        sumarProducto(producto.id);
        const cantidad = document.getElementById(`cantidad${producto.id}`);
        productoEnCarrito = carrito.find(producto => producto.id === id);
   
      });
    });
  };
  
        


mostrarProductos();


//creamos la funcion agregar al carrito


const agregarAlCarrito = (id) =>{
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++ ; //le sumo una unidad
    } else { //lo pusheo
      const producto = productos.find (producto => producto.id === id );
      carrito.push(producto);
    }
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));

}


//mostrar el carrito de compras:

const changuito = document.getElementById("changuito");
const verCarrito = document.getElementById ("verCarrito");


verCarrito.addEventListener("click", () =>{
    mostrarCarrito();
})


const mostrarCarrito = () => {
    changuito.innerHTML = "";
    carrito.forEach(producto =>{
        const card = document.createElement ("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = 
        `
        <div class = "card"> 
           <img src = " ${ producto.img}" class= "card-img-top imgProductos" alt = " ${producto.nombre}" >
           <div> 
           <h3> ${producto.nombre}</h3>
           <p> $${producto.precio}</p>
           <p> ${producto.cantidad}</p>
           <button class = "btn colorBoton" id="eliminar${producto.id}"> Eliminar Producto</button>
           </div>
        </div>
        `

        changuito.appendChild(card);

        //eliminamos productos del carrito
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () =>{
           eliminarDelCarrito(producto.id);
        })
    })
    calcularTotal();
}

//funcion que elimina el producto del carrito:


const eliminarDelCarrito = (id) =>{
    const producto = carrito.find (producto => producto.id === id);
    const indice = carrito.indexOf(producto);
    carrito.splice(indice, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));

}

//mostramos el total de la compra:

const total = document.getElementById("total");

const calcularTotal = () =>{
    let totalCompra = 0;
    carrito.forEach (producto =>{
        totalCompra += producto.precio * producto.cantidad;

    });
    total.innerHTML = `Total: $${totalCompra}`;
}

//vaciar todo el carrito

const vaciarCarrito = document.getElementById ("vaciarCarrito");
vaciarCarrito.addEventListener( "click" , () =>{
    eliminarTodoElCarrito();
})

const eliminarTodoElCarrito= () =>{
    carrito = [];
    mostrarCarrito();

    //localStorage
    localStorage.clear();
}

//finalizamos la compra

const botonFinalizarCompra = document.createElement('button');
botonFinalizarCompra.innerText = 'Finalizar compra';
botonFinalizarCompra.addEventListener('click', function() {
    window.location.href ='paginas/compra.html';
});
document.getElementById('carrito').appendChild(botonFinalizarCompra);
