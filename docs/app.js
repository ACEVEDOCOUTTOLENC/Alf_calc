console.log("Archivo JS cargado correctamente");

const modal = document.getElementById('myModal');
console.log(modal);


// Obtener todos los botones que abren el modal
const buttons = document.querySelectorAll('.button');

// Obtener el <span> que cierra el modal
const span = document.getElementsByClassName("close")[0];

// Cuando el usuario hace clic en cualquier botón, se abre el modal
buttons.forEach(btn => {
    btn.onclick = function (event) {
        event.preventDefault();  // Evitar el envío del formulario
        modal.style.display = "flex";  // Mostrar el modal
        // Ya no es necesario llamar a actualizarContenidoModal()
    }
});

// Cuando el usuario hace clic en <span> (x), se cierra el modal
span.onclick = function () {
    modal.style.display = "none";
}

// Cuando el usuario hace clic en cualquier parte fuera del modal, también se cierra
window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// Función para cambiar entre formularios
function showForm(formId) {
    const loginContainer = document.querySelector('.login-form-container');

    // Aplicar colapso antes de cambiar el formulario
    loginContainer.classList.add('collapsing');

    setTimeout(() => {
        // Ocultar todos los formularios
        document.querySelectorAll('.form-content').forEach(form => form.classList.remove('active'));

        // Mostrar el nuevo formulario
        document.getElementById(formId).classList.add('active');

        // Expandir nuevamente
        loginContainer.classList.remove('collapsing');
        loginContainer.classList.add('expanding');

        setTimeout(() => {
            loginContainer.classList.remove('expanding'); // Elimina la clase después de la animación
        }, 500);

    }, 500); // Tiempo igual a la duración de la transición

    // Primero, elimina la clase 'active' de todos los botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Agrega la clase 'active' al botón seleccionado
    const selectedButton = document.querySelector(`button[onclick="showForm('${formId}')"]`);
    selectedButton.classList.add('active');
}

function abrirModal(texto, funcionBoton) {
    // Obtener los elementos del DOM
    const modal = document.getElementById("myModal");
    const modalText = document.getElementById("modal-text");
    const modalBtn = document.getElementById("solicitar-btn");

    // Verificar si los elementos existen en el DOM
    if (!modal || !modalText || !modalBtn) {
        console.error("El modal o su contenido no fueron encontrados en el DOM.");
        console.log("modal:", modal);
        console.log("modalText:", modalText);
        console.log("modalBtn:", modalBtn);
        return;
    }

    // Actualizar el texto del modal
    modalText.innerText = texto;

    // Remover cualquier función previa asignada al botón (para evitar ejecuciones acumuladas)
    console.log("Removiendo función anterior del botón.");
    modalBtn.onclick = null;

    // Asignar la nueva función al botón solo si se proporciona
    if (typeof funcionBoton === "function") {
        console.log("Asignando nueva función al botón.");
        modalBtn.onclick = funcionBoton;
    } else {
        console.log("No se proporcionó una función válida para el botón.");
    }

    // Mostrar el modal
    console.log("Mostrando el modal.");
    modal.style.display = "flex";
}


function cerrarModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
        modal.style.display = "none"; // Oculta el modal
    }
}
// Cerrar el modal si se hace clic fuera de él
window.onclick = function (event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        cerrarModal();  // Cierra el modal si se hace clic fuera de él
    }
};



// Función para calcular el interés compuesto
function calcularInteresCompuesto() {
    console.log("Calculando ahorro...");

    // Obtener los valores del formulario
    const nombre = document.getElementById("user").value;
    const edad = document.getElementById("age").value;
    const ahorro = parseFloat(document.getElementById("amount").value);
    const años = parseInt(document.getElementById("years-ahorro").value);
    const enfoque = "seguridad financiera"; // Puedes modificar esto según el contexto

    // Depuración: mostrar los valores que obtenemos del formulario
    console.log("Nombre:", nombre);
    console.log("Edad:", edad);
    console.log("Ahorro:", ahorro);
    console.log("Años de inversión:", años);
    console.log("Enfoque:", enfoque);

    // Verificar que los valores sean válidos
    if (isNaN(ahorro) || ahorro <= 0 || isNaN(años) || años <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    // Definir tasa de interés (por ejemplo, 5% anual)
    const tasaInteres = 0.05;
    const n = 1; // Capitalización anual

    // Depuración: verificar la tasa de interés y la capitalización
    console.log("Tasa de interés:", tasaInteres);
    console.log("Número de períodos (capitalización anual):", n);

    // Calcular el interés compuesto
    const montoFinal = ahorro * Math.pow(1 + tasaInteres / n, n * años);

    // Depuración: mostrar el monto final calculado
    console.log("Monto final calculado:", montoFinal);

    // Crear una frase convincente
    const mensaje = `
        ${nombre}, a tus ${edad} años, imagina que con solo ahorrar $${ahorro.toFixed(2)} hoy, en ${años} años podrías tener $${montoFinal.toFixed(2)}.
        ¡Con una estrategia de ${enfoque}, estás construyendo un futuro financiero más seguro!
    `;

    // Depuración: verificar el mensaje que se va a mostrar
    console.log("Mensaje a mostrar:", mensaje);

    // Llamar a la función abrirModal() para mostrar el mensaje
    abrirModal(mensaje, generarArchivoAhorro);
}

function calcularRetiro() {
    console.log("Calculando retiro...");

    // Obtener los valores ingresados por el usuario
    const nombre = document.getElementById("user-retiro").value;
    const telefono = document.getElementById("phone").value;
    const correo = document.getElementById("email").value;
    const añosRetiro = document.getElementById("years-retiro").value;

    // Verificación de datos ingresados
    if (!nombre || !telefono || !correo || !añosRetiro) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Mensaje de prueba con los datos ingresados
    const mensaje = `Nombre: ${nombre}, Teléfono: ${telefono}, Correo: ${correo}, Años para el retiro: ${añosRetiro}`;

    abrirModal(mensaje, generarArchivoRetiro);
}

function calcularInversion() {
    console.log("Calculando inversión...");

    // Obtener los valores del formulario
    const monto = parseFloat(document.getElementById("investment").value);
    const años = parseInt(document.getElementById("years-inversion").value);

    // Verificación de datos ingresados
    if (isNaN(monto) || monto <= 0 || isNaN(años) || años <= 0) {
        alert("Por favor, ingresa valores válidos.");
        return;
    }

    // Mensaje de prueba
    const mensaje = `Has ingresado una inversión de $${monto.toFixed(2)} para un periodo de ${años} años.`;

    abrirModal(mensaje, generarArchivoInversion);
}

function generarArchivoAhorro() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar texto predeterminado
    doc.setFontSize(16);
    doc.text("Reporte de Ahorro e Interés Compuesto", 20, 20);
    doc.setFontSize(12);
    doc.text("Este documento muestra un cálculo de prueba de interés compuesto.", 20, 30);

    // Realizar cálculos básicos
    const ahorroInicial = 1000; // Valor de prueba
    const tasaInteres = 0.05; // 5% anual
    const años = 5;
    const montoFinal = ahorroInicial * Math.pow(1 + tasaInteres, años);

    doc.text(`Ahorro inicial: $${ahorroInicial}`, 20, 50);
    doc.text(`Tasa de interés: ${tasaInteres * 100}% anual`, 20, 60);
    doc.text(`Años de inversión: ${años}`, 20, 70);
    doc.text(`Monto final estimado: $${montoFinal.toFixed(2)}`, 20, 80);

    // Convertir el PDF a un Blob
    const pdfBlob = doc.output("blob");

    // Crear una URL del archivo en memoria
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // *** ABRIR EL PDF EN EL NAVEGADOR ***
    window.open(pdfUrl, "_blank");

    // *** ENVIAR MENSAJES EN SEGUNDO PLANO ***
    setTimeout(() => {
        compartirPorWhatsApp(pdfUrl);
        compartirPorEmail(pdfUrl);
    }, 3000); // Se espera 3 segundos para que el usuario vea el PDF antes de enviar
}

function generarArchivoInversion() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar texto predeterminado
    doc.setFontSize(16);
    doc.text("Reporte de Ahorro e Interés Compuesto", 20, 20);
    doc.setFontSize(12);
    doc.text("Este documento muestra un cálculo de prueba de interés compuesto.", 20, 30);

    // Realizar cálculos básicos
    const ahorroInicial = 1000; // Valor de prueba
    const tasaInteres = 0.05; // 5% anual
    const años = 5;
    const montoFinal = ahorroInicial * Math.pow(1 + tasaInteres, años);

    doc.text(`Ahorro inicial: $${ahorroInicial}`, 20, 50);
    doc.text(`Tasa de interés: ${tasaInteres * 100}% anual`, 20, 60);
    doc.text(`Años de inversión: ${años}`, 20, 70);
    doc.text(`Monto final estimado: $${montoFinal.toFixed(2)}`, 20, 80);

    // Convertir el PDF a un Blob
    const pdfBlob = doc.output("blob");

    // Crear una URL del archivo en memoria
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // *** ABRIR EL PDF EN EL NAVEGADOR ***
    window.open(pdfUrl, "_blank");

    // *** ENVIAR MENSAJES EN SEGUNDO PLANO ***
    setTimeout(() => {
        compartirPorWhatsApp(pdfUrl);
        compartirPorEmail(pdfUrl);
    }, 3000); // Se espera 3 segundos para que el usuario vea el PDF antes de enviar
}


function generarArchivoRetiro() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar texto predeterminado
    doc.setFontSize(16);
    doc.text("Reporte de Ahorro e Interés Compuesto", 20, 20);
    doc.setFontSize(12);
    doc.text("Este documento muestra un cálculo de prueba de interés compuesto.", 20, 30);

    // Realizar cálculos básicos
    const ahorroInicial = 1000; // Valor de prueba
    const tasaInteres = 0.05; // 5% anual
    const años = 5;
    const montoFinal = ahorroInicial * Math.pow(1 + tasaInteres, años);

    doc.text(`Ahorro inicial: $${ahorroInicial}`, 20, 50);
    doc.text(`Tasa de interés: ${tasaInteres * 100}% anual`, 20, 60);
    doc.text(`Años de inversión: ${años}`, 20, 70);
    doc.text(`Monto final estimado: $${montoFinal.toFixed(2)}`, 20, 80);

    // Convertir el PDF a un Blob
    const pdfBlob = doc.output("blob");

    // Crear una URL del archivo en memoria
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // *** ABRIR EL PDF EN EL NAVEGADOR ***
    window.open(pdfUrl, "_blank");

    // *** ENVIAR MENSAJES EN SEGUNDO PLANO ***
    setTimeout(() => {
        compartirPorWhatsApp(pdfUrl);
        compartirPorEmail(pdfUrl);
    }, 3000); // Se espera 3 segundos para que el usuario vea el PDF antes de enviar
}


// Función para compartir por WhatsApp
function compartirPorWhatsApp() {
    console.log("archivo enviado por WhtatsApp");
}

// Función para compartir por Email
function compartirPorEmail() {
    console.log("archivo enviado por email");

}

// Función para abrir un nuevo modal con un formulario básico
function abrirFormularioModal() {
    console.log("archivo enviado por Email");
}




