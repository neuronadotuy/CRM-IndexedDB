/** @format */

(function () {
  let DB;
  const formulario = document.querySelector("#formulario");

  document.addEventListener("DOMContentLoaded", () => {
    conectarDB();

    formulario.addEventListener("submit", validarCliente);
  });

  function validarCliente(e) {
    e.preventDefault();

    // Leer inputs
    const nombre = document.querySelector("#nombre").value;
    const email = document.querySelector("#email").value;
    const telefono = document.querySelector("#telefono").value;
    const empresa = document.querySelector("#empresa").value;

    if (nombre === "" || email === "" || telefono === "" || empresa === "") {
      imprimirAlerta("Todos los campos son obligatorios", "error");
      return;
    }

    // Crear un objeto con la información

    const cliente = {
      // Como llave y valor son lo mismo, ej: nombre: nombre, simplificamos:
      nombre,
      email,
      telefono,
      empresa,
      id: Date.now(),
    };

    crearNuevocliente(cliente);

    // Crear nuevo cliente
    function crearNuevocliente(cliente) {
      const transaction = DB.transaction(["crm"], "readwrite");
      const objectStore = transaction.objectStore("crm");
      objectStore.add(cliente);

      transaction.onerror = function () {
        imprimirAlerta("Hubo un error", "error");
      };

      transaction.oncomplete = function () {
        imprimirAlerta("Cliente agregado correctamente");

        setTimeout(() => {
          window.location.href = "index.html";
        }, 3000);
      };
    }
  }
})();
