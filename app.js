let intentos = 0; // Contador de intentos
let bloqueado = false; // Bandera para bloqueo

// Restricción para el campo de nombre (solo letras y espacios)
document.getElementById('nombre').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
});

// Restricción para los campos de notas (solo números entre 1 y 10)
['nota1', 'nota2', 'nota3'].forEach(id => {
    document.getElementById(id).addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9]/g, ''); // Elimina cualquier carácter que no sea número
        
        // Comando para limitar el numero maximo:

        // if (this.value > 10) {
        //     this.value = 10; // Limita el valor máximo a 10
        //     alert("Las notas no pueden ser mayores a 10.");
        // }


        if (this.value < 1 && this.value !== '') {
            this.value = 1; // Limita el valor mínimo a 1
            alert("Las notas no pueden ser menores a 1.");
        }
    });
});

// Evento para el botón de calcular
document.getElementById('calcularBtn').addEventListener('click', function () {
    if (bloqueado) {
        alert("El formulario está bloqueado. Espera 1 minuto para volver a intentarlo.");
        return;
    }

    // Capturar valores de los inputs
    const nombre = document.getElementById('nombre').value.trim();
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    // Validar si las notas están en el rango correcto (1 - 10) y nombre no vacío
    if (!nombre) {
        alert("Error: El nombre no puede estar vacío y solo debe contener letras.");
        return;
    }

    if (isNaN(nota1) || nota1 < 1 || nota1 > 10 ||
        isNaN(nota2) || nota2 < 1 || nota2 > 10 ||
        isNaN(nota3) || nota3 < 1 || nota3 > 10) {
        intentos++;
        alert(`Error: Las notas deben estar entre 1 y 10. Intento ${intentos} de 3.`);

        if (intentos >= 3) {
            bloquearFormulario(); // Llamar a la función de bloqueo
        }
        return;
    }

    // Si las notas son correctas, reiniciar intentos
    intentos = 0;

    // Calcular promedio
    const promedio = ((nota1 + nota2 + nota3) / 3).toFixed(2);


    // Mensaje de felicitación o advertencia
    let mensajeFinal;
    if (promedio >= 7) {
        mensajeFinal = `🎉 ¡Felicitaciones ${nombre}, pasaste el curso!`;
    } else {
        mensajeFinal = `⚠️ Sigue estudiando ${nombre}, puedes mejorar.`;
    }

    // Mostrar el resultado
    const fechaActual = new Date().toLocaleDateString();
    const resultado = `
        <h2>Resultado</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Fecha:</strong> ${fechaActual}</p>
        <p><strong>Nota Primer Corte:</strong> ${nota1}</p>
        <p><strong>Nota Segundo Corte:</strong> ${nota2}</p>
        <p><strong>Nota Tercer Corte:</strong> ${nota3}</p>
        <p><strong>Promedio:</strong> ${promedio}</p>
        <p>${mensajeFinal}</p>
    `;
    document.getElementById('resultado').innerHTML = resultado;
});

// Función para bloquear el formulario
function bloquearFormulario() {
    bloqueado = true;

    alert("Has superado los 3 intentos. El formulario se bloqueará por 1 minuto.");

    // Deshabilitar los campos y botón
    document.getElementById('nombre').disabled = true;
    document.getElementById('nota1').disabled = true;
    document.getElementById('nota2').disabled = true;
    document.getElementById('nota3').disabled = true;
    document.getElementById('calcularBtn').disabled = true;

    // Temporizador para desbloquear después de 1 minuto
    setTimeout(desbloquearFormulario, 60000);
}

function desbloquearFormulario() {
    bloqueado = false;
    intentos = 0; // Reiniciar intentos

    // Habilitar los campos y botón
    document.getElementById('nombre').disabled = false;
    document.getElementById('nota1').disabled = false;
    document.getElementById('nota2').disabled = false;
    document.getElementById('nota3').disabled = false;
    document.getElementById('calcularBtn').disabled = false;

    alert("El formulario ha sido desbloqueado. Puedes intentarlo de nuevo.");
}

