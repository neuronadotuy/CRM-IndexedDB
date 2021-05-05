/** @format */

function conectarDB() {
  const abrirConexion = window.indexedDB.open("crm", 1);

  abrirConexion.onerror = function () {
    console.log("Hubo un error");
  };

  abrirConexion.onsuccess = function () {
    DB = abrirConexion.result;
  };
}

function imprimirAlerta(mensaje, tipo) {
  const noRepeatError = document.querySelector(".no--repeat--error");

  // Prevent multiple error messages
  if (!noRepeatError) {
    const divMensaje = document.createElement("div");
    divMensaje.classList.add(
      "px-4",
      "py-3",
      "rounded",
      "max-w-lg",
      "mx-auto",
      "mt-6",
      "text-center",
      "border",
      "no--repeat--error"
    );

    if (tipo === "error") {
      divMensaje.classList.add("red-100", "border-red-400", "text-red-700");
    } else {
      divMensaje.classList.add(
        "bg-green-100",
        "border-green-400",
        "text-green-700"
      );
    }

    divMensaje.textContent = mensaje;
    formulario.appendChild(divMensaje);

    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }
}
