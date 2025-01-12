const listaVeterinarios = document.getElementById("listas_veterinarios");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");

const form = document.getElementById("form");
const btnGuardar = document.getElementById("btnGuardar");

let veterinarios = [
  {
    nombre: "manchas",
    apellido: "esteban",
  },
];

function listarV() {
  // Generar el HTML de cada fila
  const htmlVeterinarios = veterinarios
    .map(
      (veterinario, index) => `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${veterinario.nombre}</td>
        <td>${veterinario.apellido}</td>
      
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
  listaVeterinarios.innerHTML = htmlVeterinarios;

  // Asignar eventos a los botones de eliminar
  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar) => {
      botonEliminar.onclick = function () {
        const index = botonEliminar.getAttribute("data-index");
        eliminarVeterinario(index);
      };
    }
  );

  // Asignar eventos a los botones de editar
  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar) => {
      botonEditar.onclick = function () {
        const index = botonEditar.getAttribute("data-index");
        cargarVeterinarioEnFormulario(index);
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
    // Agregar nuevo veterinario
    veterinarios.push(datos);
  } else {
    // Actualizar el veterinario existente
    veterinarios[index] = datos;
    form.removeAttribute("data-index"); // Limpiar índice
    btnGuardar.textContent = "Guardar"; // Cambiar texto del botón
  }

  listarV();
  form.reset(); // Limpiar formulario
}

function eliminarVeterinario(index) {
  veterinarios.splice(index, 1); // Eliminar el veterinario del arreglo
  listarV(); // Actualizar la tabla
}

function cargarVeterinarioEnFormulario(index) {
  // Llenar el formulario con los datos del veterinario seleccionado
  const veterinario = veterinarios[index];
  nombre.value = veterinario.nombre;
  apellido.value = veterinario.apellido;

  form.setAttribute("data-index", index); // Guardar índice en el formulario
  btnGuardar.textContent = "Actualizar"; // Cambiar texto del botón
}

// Llamar a la función para renderizar la tabla
listarV();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
