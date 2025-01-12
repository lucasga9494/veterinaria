const listaDuenos = document.getElementById("listas_duenos");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");

const form = document.getElementById("form");
const btnGuardar = document.getElementById("btnGuardar");

let duenos = [
  {
    nombre: "manchas",
    apellido: "esteban",
  },
];

function listarD() {
  // Generar el HTML de cada fila
  const htmlDuenos = duenos
    .map(
      (dueno, index) => `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${dueno.nombre}</td>
        <td>${dueno.apellido}</td>
      
        <td>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" class="btn btn-danger eliminar" data-index="${index}">Eliminar</button>
            <button type="button" class="btn btn-success editar" data-index="${index}" data-bs-toggle="modal"
              data-bs-target="#exampleModal">Editar</button>
          </div>
        </td>
      </tr>
    `
    )
    .join("");
  listaDuenos.innerHTML = htmlDuenos;

  // Asignar eventos a los botones de eliminar
  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar) => {
      botonEliminar.onclick = function () {
        const index = botonEliminar.getAttribute("data-index");
        eliminarDueno(index);
      };
    }
  );

  // Asignar eventos a los botones de editar
  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar) => {
      botonEditar.onclick = function () {
        const index = botonEditar.getAttribute("data-index");
        cargarDuenoEnFormulario(index);
      };
    }
  );
}

function enviarDatos(evento) {
  evento.preventDefault();

  const datos = {
    nombre: nombre.value,
    apellido: apellido.value,
  };

  const index = form.getAttribute("data-index");

  if (index === null) {
    // Agregar nuevo dueno
    duenos.push(datos);
  } else {
    // Actualizar el dueno existente
    duenos[index] = datos;
    form.removeAttribute("data-index"); // Limpiar índice
    btnGuardar.textContent = "Guardar"; // Cambiar texto del botón
  }

  listarD();
  form.reset(); // Limpiar formulario
}

function eliminarDueno(index) {
  duenos.splice(index, 1); // Eliminar el dueno del arreglo
  listarD(); // Actualizar la tabla
}

function cargarDuenoEnFormulario(index) {
  // Llenar el formulario con los datos del dueno seleccionado
  const dueno = duenos[index];
  nombre.value = dueno.nombre;
  apellido.value = dueno.apellido;

  form.setAttribute("data-index", index); // Guardar índice en el formulario
  btnGuardar.textContent = "Actualizar"; // Cambiar texto del botón
}

// Llamar a la función para renderizar la tabla
listarD();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
