const listaMascotas = document.getElementById("listas_mascotas");
const nombre = document.getElementById("nombre");
const dueno = document.getElementById("dueno");
const tipo = document.getElementById("tipo");
const form = document.getElementById("form");
const btnGuardar = document.getElementById("btnGuardar");

let mascotas = [
  {
    nombre: "manchas",
    dueno: "esteban",
    tipo: "Gato",
  },
];

function listarMascotas() {
  // Generar el HTML de cada fila
  const htmlMascotas = mascotas
    .map(
      (mascota, index) => `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${mascota.nombre}</td>
        <td>${mascota.dueno}</td>
        <td>${mascota.tipo}</td>
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
  listaMascotas.innerHTML = htmlMascotas;

  // Asignar eventos a los botones de eliminar
  Array.from(document.getElementsByClassName("eliminar")).forEach(
    (botonEliminar) => {
      botonEliminar.onclick = function () {
        const index = botonEliminar.getAttribute("data-index");
        eliminarMascota(index);
      };
    }
  );

  // Asignar eventos a los botones de editar
  Array.from(document.getElementsByClassName("editar")).forEach(
    (botonEditar) => {
      botonEditar.onclick = function () {
        const index = botonEditar.getAttribute("data-index");
        cargarMascotaEnFormulario(index);
      };
    }
  );
}

function enviarDatos(evento) {
  evento.preventDefault();

  const datos = {
    nombre: nombre.value,
    dueno: dueno.value,
    tipo: tipo.value,
  };

  const index = form.getAttribute("data-index");

  if (index === null) {
    // Agregar nueva mascota
    mascotas.push(datos);
  } else {
    // Actualizar la mascota existente
    mascotas[index] = datos;
    form.removeAttribute("data-index"); // Limpiar índice
    btnGuardar.textContent = "Guardar"; // Cambiar texto del botón
  }

  listarMascotas();
  form.reset(); // Limpiar formulario
}

function eliminarMascota(index) {
  mascotas.splice(index, 1); // Eliminar la mascota del arreglo
  listarMascotas(); // Actualizar la tabla
}

function cargarMascotaEnFormulario(index) {
  // Llenar el formulario con los datos de la mascota seleccionada
  const mascota = mascotas[index];
  nombre.value = mascota.nombre;
  dueno.value = mascota.dueno;
  tipo.value = mascota.tipo;

  form.setAttribute("data-index", index); // Guardar índice en el formulario
  btnGuardar.textContent = "Actualizar"; // Cambiar texto del botón
}

// Llamar a la función para renderizar la tabla
listarMascotas();

form.onsubmit = enviarDatos;
btnGuardar.onclick = enviarDatos;
