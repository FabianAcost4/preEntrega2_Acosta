
let productos = [];

let carrito = [];



    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        })



function mostrarProductos() {
    const contenedorProductos = document.getElementById('productos');
    contenedorProductos.innerHTML = ''; // Limpiar el contenedor antes de agregar los productos

    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('producto');
        divProducto.innerHTML = `
            <p>${producto.nombre}</p>
            <div><img src="${producto.img}"  class="imagen-producto"></div>
            <p>Precio: ${producto.precio} USD</p>
            <button class="agregar-carrito" data-id="${producto.id}">Agregar al Carrito</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
}


function agregarAlCarrito(id) {
    const producto = productos.find(producto => producto.id === id);

    if (producto) {
        carrito.push(producto);
        mostrarCarrito();
    }
}


function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    let totalCarrito = 0;

    carrito.forEach(producto => {
        const li = document.createElement('li');
        li.innerHTML = `${producto.nombre} - Precio: ${producto.precio} USD`;
        listaCarrito.appendChild(li);

        totalCarrito += producto.precio;
    });

    document.getElementById('total-carrito').textContent = totalCarrito;
}


function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}


document.addEventListener('click', e => {
    if (e.target.classList.contains('agregar-carrito')) {
        const idProducto = parseInt(e.target.getAttribute('data-id'));
        agregarAlCarrito(idProducto);
    }
});


document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

