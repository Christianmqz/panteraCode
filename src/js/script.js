/* ==========================================
   ESPERAR A QUE CARGUE LA PÁGINA
   ========================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Selecciona el formulario 
    const formulario = document.querySelector('#formulario');

    formulario.addEventListener('submit', validarFormulario);
})

/* 
EXPLICACIÓN PARA ESTUDIANTES:

1. DOMContentLoaded = Espera a que el HTML cargue completamente
2. querySelector = Busca un elemento en el HTML usando selectores CSS
3. addEventListener = Escucha eventos (como clicks, submit, etc.)

Piénsalo como:
- Espera a que la página esté lista
- Encuentra el formulario
- Cuando alguien lo envíe, ejecuta validarFormulario()
*/


/* ==========================================
   FUNCIÓN PRINCIPAL DE VALIDACIÓN
   ========================================== */

    function validarFormulario(e) {
        e.preventDefault();

        // Obtiene los valores de los inputs
        const nombre = document.querySelector('#nombre').value.trim();
        const email = document.querySelector('#email').value.trim();
        const mensaje = document.querySelector('#mensaje').value.trim();

        // Limpiar mensajes anteriores
        limpiarMensajes();

        // Variable para saber si el formulario es válido
        let esValido = true;

        // Validar Nombre
        if (nombre === "") {
            mostrarErrorTemporal('El nombre es obligatorio');
            esValido = false;
        }

        // Validar Email
        if (email === '') {
            mostrarErrorTemporal('El email es obligatorio');
            esValido = false;
        } else if (!esEmailValido(email)) {
            mostrarErrorTemporal('El email no es válido');
            esValido = false;
        }

        // Validar Mensaje
        if (mensaje === "") {
            mostrarErrorTemporal('El mensaje es obligatorio');
            esValido = false;
        }

        // Si todo está bien, mostrar éxito
        if (esValido) {
            mostrarExito();
            document.querySelector('#formulario').reset();
        }
    }

    /* 
    FLUJO DE VALIDACIÓN:

    1. Usuario hace click en "Enviar"
    2. Prevenir recarga de página
    3. Obtener valores de los campos
    4. Limpiar errores viejos
    5. Revisar cada campo:
    - ¿Está vacío? → Mostrar error
    - ¿Email tiene formato correcto? → Si no, mostrar error
    6. Si todo está bien → Mostrar mensaje de éxito y limpiar formulario*/

    // ==========================================
    // VALIDAR FORMATO DE EMAIL
    // ==========================================

    function esEmailValido(email) {
        // Patrón para validar emails
        const patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return patron.test(email);
    }

    /* 
    EXPRESIÓN REGULAR (REGEX) SIMPLIFICADA:

    ^[^\s@]+     = Uno o más caracteres (sin espacios ni @)
    @            = Debe tener un @
    [^\s@]+      = Uno o más caracteres (sin espacios ni @)
    \.           = Debe tener un punto
    [^\s@]+$     = Uno o más caracteres (sin espacios ni @) */


    // ==========================================
    // MOSTRAR MENSAJE DE ERROR
    // ==========================================
    function mostrarErrorTemporal(mensaje) {
        // Crear nuevo elemento div
        const errorDiv = document.createElement('div');
        
        // Agregar clase para CSS
        errorDiv.classList.add('mensaje-error-temporal');
        
        // Agregar contenido con ícono
        errorDiv.textContent = '✗ ' + mensaje;
        
        // Agregar al formulario
        const formulario = document.querySelector('#formulario');
        formulario.appendChild(errorDiv);
        
        /* 
        EXPLICACIÓN:
        
        1. createElement('div') = Crea un nuevo <div>
        2. classList.add() = Agrega una clase para estilos
        3. textContent = Pone el texto (con ✗ como ícono)
        4. appendChild() = Lo agrega al formulario
        
        Resultado HTML:
        <form id="formulario">
            <div class="contacto-input">...</div>
            <div class="mensaje-error-temporal">✗ El nombre es obligatorio</div>
        </form>
        */
        
        // Quitar el mensaje después de 4 segundos
        setTimeout(function() {
            errorDiv.remove();
        }, 4000);
    }

    /* 
    NAVEGACIÓN DEL DOM:

    HTML:
    <div class="contacto-input">          ← parentElement (contenedor)
        <input id="nombre">               ← input (punto de inicio)
        <span class="mensaje-error"></span> ← querySelector('.mensaje-error')
    </div>

    Paso a paso:
    1. Encuentra el input (#nombre)
    2. Sube al padre (.parentElement)
    3. Dentro del padre, busca el span de error
    4. Cambia su texto
    5. Agrega clase 'error' al input (para que CSS lo pinte de rojo)
    */


    // ==========================================
    // LIMPIAR TODOS LOS ERRORES
    // ==========================================
    function limpiarMensajes() {
        // Encontrar todos los mensajes de error temporales
        const errores = document.querySelectorAll('.mensaje-error-temporal');
        
        // Eliminar cada uno
        errores.forEach(error => {
            error.remove();
        });
    }

    /* 
    FOREACH EXPLICADO:

    forEach recorre cada elemento de una lista (como un bucle)

    Sintaxis:
    lista.forEach(function(elemento) {
        // hacer algo con cada elemento
    });

    Ejemplo:
    const frutas = ['manzana', 'pera', 'uva'];
    frutas.forEach(function(fruta) {
        console.log(fruta);
    });

    Resultado:
    manzana
    pera
    uva*/

    // ==========================================
    // MOSTRAR MENSAJE DE EXITO
    // ==========================================
    function mostrarExito() {
        // Crea un nuevo elemento <DIV>
        const exitoDiv = document.createElement('div');

        // Agregar clase para CSS
        exitoDiv.classList.add('mensaje-exito');

        // Agregar texto
        exitoDiv.textContent = '✓ Mensaje enviado correctamente. Te responderemos pronto.';

        // Agregar al formulario 
        const formulario = document.querySelector('#formulario');
        formulario.appendChild(exitoDiv);

        // Quitar el mensaje después de 5 segundos
        setTimeout(function() {
           exitoDiv.remove() 
        }, 5000);
    }

    /* 
    CREAR ELEMENTOS CON JAVASCRIPT:

    1. createElement('div') = Crea un <div> en memoria
    2. classList.add('clase') = Le agrega una clase
    3. textContent = 'texto' = Le pone texto
    4. appendChild(elemento) = Lo agrega al HTML
    5. setTimeout() = Programa algo para después
    6. remove() = Lo elimina del HTML

    Visualización:

    ANTES:
    <form class="contacto-formulario">
        <input>
        <button>
    </form>

    DESPUÉS de appendChild:
    <form class="contacto-formulario">
        <input>
        <button>
        <div class="mensaje-exito">✓ Mensaje enviado...</div>  ← Nuevo!
    </form>

    DESPUÉS de remove() (5 segundos):
    <form class="contacto-formulario">
        <input>
        <button>
    </form>  ← Mensaje desapareció
    */
