const $formulario = document.querySelector('#formulario');
const $contenedorProductos = document.querySelector('#contenedorProductos');

$formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = e.target.nombre.value;
    const precio = e.target.precio.value;
    const img = e.target.img.value;

    agregarProducto({
        id: numeroRandom(),
        nombre,
        precio,
        img
    })
})

const numeroRandom = () => Math.floor(Math.random() * 1000)

const agregarProducto = (producto) => {
    fetch('http://localhost:3001/productos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
    })
}

const obternerProductos = async () => {
    const respuesta = await fetch('http://localhost:3001/productos');
    const productos = await respuesta.json()

    return productos
}

const mostrarProductos = (productos) => {
    productos.forEach(producto => { 
        console.log(producto)
        const plantilla = `
        <article class="product">
        <img src="${producto.img}"
        alt="cerel chocapic">
        <h4>${producto.nombre}</h4>
        <div>
        <p>$${producto.precio}</p>
        <i class="fa-solid fa-trash-can"></i>
        </div>
        </article>
        `
        $contenedorProductos.innerHTML += plantilla;
        console.log(plantilla)
    })
}

document.addEventListener('DOMContentLoaded', async () => {
    const productos = await obternerProductos();
    mostrarProductos(productos);
})