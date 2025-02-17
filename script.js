// Variables globales
let carrito = [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const carritoContenido = document.querySelector(".carrito-contenido");
  carritoContenido.innerHTML = "";

  if (carrito.length === 0) {
    carritoContenido.innerHTML = "<p>Carrito vacío</p>";
  } else {
    let total = 0;
    carrito.forEach((producto) => {
      const div = document.createElement("div");
      div.classList.add("producto-carrito");
      div.innerHTML = `
                <p>${producto.nombre} - $${producto.precio}</p>
            `;
      carritoContenido.appendChild(div);
      total += producto.precio;
    });

    const totalP = document.createElement("p");
    totalP.innerHTML = `Total: $${total.toFixed(2)}`;
    carritoContenido.appendChild(totalP);
  }
}

// Evento para manejar el botón de agregar al carrito
document.querySelectorAll(".agregar-carrito").forEach((boton) => {
  boton.addEventListener("click", (e) => {
    const producto = {
      nombre: e.target.parentElement.querySelector("h3").textContent,
      precio: parseFloat(
        e.target.parentElement.querySelector("p").textContent.replace("$", "")
      ),
    };
    agregarAlCarrito(producto);
  });
});

// Función para manejar el lector de código de barras
document.getElementById("leerCodigo").addEventListener("click", () => {
  const scannerInput = document.getElementById("barcodeScanner");
  if (scannerInput.files && scannerInput.files[0]) {
    const file = scannerInput.files[0];

    // Utilizamos QuaggaJS para leer el código de barras
    Quagga.decodeSingle(
      {
        src: URL.createObjectURL(file),
        numOfWorkers: 4,
        inputStream: {
          size: 800,
        },
        decoder: {
          readers: ["code_128_reader"], // Puedes agregar más lectores si es necesario
        },
      },
      function (result) {
        if (result && result.codeResult) {
          alert("Código de barras detectado: " + result.codeResult.code);
          // Aquí puedes agregar el producto al carrito basado en el código de barras.
          // Por ejemplo:
          agregarAlCarrito({
            nombre: "Producto " + result.codeResult.code,
            precio: 10.0, // Precio por defecto, puedes obtenerlo según la base de datos.
          });
        } else {
          alert("No se detectó ningún código de barras.");
        }
      }
    );
  }
});
