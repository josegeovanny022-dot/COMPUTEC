/* =====================================
   COMPUTEC - JAVASCRIPT
===================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==============================
       MODO OSCURO
    ============================== */

    const modoBtn =
        document.getElementById("modoBtn");

    const modoGuardado =
        localStorage.getItem("modoOscuro");

    if (modoGuardado === "activado") {

        document.body.classList.add("oscuro");

        modoBtn.textContent = "Modo claro";
    }


    modoBtn.addEventListener("click", function () {

        document.body.classList.toggle("oscuro");

        if (
            document.body.classList.contains("oscuro")
        ) {

            localStorage.setItem(
                "modoOscuro",
                "activado"
            );

            modoBtn.textContent =
                "Modo claro";

        } else {

            localStorage.setItem(
                "modoOscuro",
                "desactivado"
            );

            modoBtn.textContent =
                "Modo oscuro";
        }
    });


    /* ==============================
       LEER MÁS
    ============================== */

    const botonesLeer =
        document.querySelectorAll(".leer");


    botonesLeer.forEach(function (boton) {

        boton.addEventListener("click", function () {

            const contenido =
                boton.previousElementSibling;

            contenido.classList.toggle(
                "mostrar"
            );

            if (
                contenido.classList.contains(
                    "mostrar"
                )
            ) {

                boton.textContent =
                    "Leer menos";

            } else {

                boton.textContent =
                    "Leer más";
            }
        });
    });


    /* ==============================
       CARRUSEL - 4 IMÁGENES
    ============================== */

    const imagenes = [

        "img/compu.jpg",

        "img/computadora1.webp",

        "img/computadora2.png",

        "img/computadora3.webp"

    ];


    let indice = 0;


    const imagenCarrusel =
        document.getElementById(
            "imagenCarrusel"
        );


    const puntos =
        document.querySelectorAll(".punto");


    function mostrarImagen() {

        imagenCarrusel.src =
            imagenes[indice];


        puntos.forEach(
            function (punto, posicion) {

                punto.classList.toggle(
                    "activo",
                    posicion === indice
                );

            }
        );
    }


    window.siguiente = function () {

        indice++;

        if (
            indice >= imagenes.length
        ) {

            indice = 0;
        }

        mostrarImagen();
    };


    window.anterior = function () {

        indice--;

        if (indice < 0) {

            indice =
                imagenes.length - 1;
        }

        mostrarImagen();
    };


    /* Permite hacer clic en cada punto */

    window.irAImagen = function (numero) {

        indice = numero;

        mostrarImagen();
    };


    /* Cambio automático cada 5 segundos */

    setInterval(function () {

        siguiente();

    }, 5000);


    /* ==============================
       TAREAS
    ============================== */

    let tareas =
        JSON.parse(
            localStorage.getItem(
                "tareasComputec"
            )
        ) || [];


    window.mostrarTareas = function () {

        const lista =
            document.getElementById(
                "listaTareas"
            );

        lista.innerHTML = "";


        tareas.forEach(
            function (tarea, indice) {

                const li =
                    document.createElement("li");


                const texto =
                    document.createElement("span");

                texto.textContent = tarea;


                const boton =
                    document.createElement(
                        "button"
                    );

                boton.textContent =
                    "Eliminar";

                boton.classList.add(
                    "boton-eliminar"
                );


                boton.addEventListener(
                    "click",
                    function () {

                        eliminarTarea(indice);

                    }
                );


                li.appendChild(texto);

                li.appendChild(boton);

                lista.appendChild(li);
            }
        );
    };


    window.agregarTarea = function () {

        const input =
            document.getElementById(
                "nuevaTarea"
            );


        const tarea =
            input.value.trim();


        if (tarea === "") {

            alert(
                "Escribe una tarea."
            );

            return;
        }


        tareas.push(tarea);


        localStorage.setItem(
            "tareasComputec",
            JSON.stringify(tareas)
        );


        input.value = "";


        mostrarTareas();
    };


    window.eliminarTarea = function (
        indice
    ) {

        tareas.splice(indice, 1);


        localStorage.setItem(
            "tareasComputec",
            JSON.stringify(tareas)
        );


        mostrarTareas();
    };


    window.borrarTareas = function () {

        if (tareas.length === 0) {

            return;
        }


        const confirmar =
            confirm(
                "¿Quieres borrar todas las tareas?"
            );


        if (!confirmar) {

            return;
        }


        tareas = [];


        localStorage.removeItem(
            "tareasComputec"
        );


        mostrarTareas();
    };


    mostrarTareas();


    /* ==============================
       BUSCADOR
    ============================== */

    const buscador =
        document.getElementById(
            "buscador"
        );


    const resultados =
        document.getElementById(
            "resultados"
        );


    buscador.addEventListener(
        "input",
        function () {

            const texto =
                buscador.value
                    .trim()
                    .toLowerCase();


            resultados.innerHTML = "";


            if (texto === "") {

                return;
            }


            const secciones =
                document.querySelectorAll(
                    "main section"
                );


            let encontrados = 0;


            secciones.forEach(
                function (seccion) {

                    const contenido =
                        seccion.innerText
                            .toLowerCase();


                    if (
                        contenido.includes(
                            texto
                        )
                    ) {

                        encontrados++;


                        const boton =
                            document.createElement(
                                "button"
                            );


                        boton.classList.add(
                            "resultado-busqueda"
                        );


                        const titulo =
                            seccion.querySelector(
                                "h1, h2, h3"
                            );


                        boton.textContent =
                            titulo
                                ? titulo.innerText
                                : "Sección encontrada";


                        boton.addEventListener(
                            "click",
                            function () {

                                seccion.scrollIntoView(
                                    {
                                        behavior:
                                            "smooth"
                                    }
                                );


                                seccion.classList.add(
                                    "resaltar-busqueda"
                                );


                                setTimeout(
                                    function () {

                                        seccion.classList.remove(
                                            "resaltar-busqueda"
                                        );

                                    },
                                    1500
                                );
                            }
                        );


                        resultados.appendChild(
                            boton
                        );
                    }
                }
            );


            if (encontrados === 0) {

                const mensaje =
                    document.createElement(
                        "p"
                    );


                mensaje.textContent =
                    "No se encontró información con esa palabra.";


                resultados.appendChild(
                    mensaje
                );
            }

        }
    );


    /* ==============================
       FORMULARIO DE CONTACTO
    ============================== */

    const formContacto =
        document.getElementById(
            "formContacto"
        );


    formContacto.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const nombre =
                document
                    .getElementById(
                        "nombre"
                    )
                    .value
                    .trim();


            const correo =
                document
                    .getElementById(
                        "correo"
                    )
                    .value
                    .trim();


            const tema =
                document.getElementById(
                    "tema"
                ).value;


            const mensaje =
                document
                    .getElementById(
                        "mensaje"
                    )
                    .value
                    .trim();


            const mensajeForm =
                document.getElementById(
                    "mensajeForm"
                );


            if (
                nombre === "" ||
                correo === "" ||
                mensaje === ""
            ) {

                mensajeForm.textContent =
                    "Completa todos los campos obligatorios.";

                mensajeForm.style.color =
                    "#dc3545";

                return;
            }


            mensajeForm.textContent =
                "¡Mensaje enviado correctamente!";


            mensajeForm.style.color =
                "#198754";


            console.log({

                nombre,
                correo,
                tema,
                mensaje

            });


            formContacto.reset();
        }
    );


    /* ==============================
       REGISTRO DE ESTUDIANTES
    ============================== */

    let estudiantes =
        JSON.parse(
            localStorage.getItem(
                "estudiantes"
            )
        ) || [];


    const formRegistro =
        document.getElementById(
            "formRegistro"
        );


    function mostrarRegistros() {

        const tabla =
            document.getElementById(
                "tablaEstudiantes"
            );


        tabla.innerHTML = "";


        estudiantes.forEach(
            function (
                estudiante,
                indice
            ) {

                const fila =
                    document.createElement(
                        "tr"
                    );


                const datos = [

                    estudiante.nombre,

                    estudiante.nie,

                    estudiante.edad,

                    estudiante.genero,

                    estudiante.telefono,

                    estudiante.correo,

                    estudiante.direccion

                ];


                datos.forEach(
                    function (dato) {

                        const celda =
                            document.createElement(
                                "td"
                            );


                        celda.textContent =
                            dato;


                        fila.appendChild(
                            celda
                        );
                    }
                );


                const celdaAccion =
                    document.createElement(
                        "td"
                    );


                const boton =
                    document.createElement(
                        "button"
                    );


                boton.textContent =
                    "Eliminar";


                boton.classList.add(
                    "eliminar-registro"
                );


                boton.addEventListener(
                    "click",
                    function () {

                        eliminarRegistro(
                            indice
                        );

                    }
                );


                celdaAccion.appendChild(
                    boton
                );


                fila.appendChild(
                    celdaAccion
                );


                tabla.appendChild(
                    fila
                );
            }
        );
    }


    formRegistro.addEventListener(
        "submit",
        function (evento) {

            evento.preventDefault();


            const estudiante = {

                nombre:
                    document
                        .getElementById(
                            "registroNombre"
                        )
                        .value
                        .trim(),


                nie:
                    document
                        .getElementById(
                            "registroNIE"
                        )
                        .value
                        .trim(),


                edad:
                    document
                        .getElementById(
                            "registroEdad"
                        )
                        .value,


                genero:
                    document
                        .getElementById(
                            "registroGenero"
                        )
                        .value,


                telefono:
                    document
                        .getElementById(
                            "registroTelefono"
                        )
                        .value
                        .trim(),


                correo:
                    document
                        .getElementById(
                            "registroCorreo"
                        )
                        .value
                        .trim(),


                direccion:
                    document
                        .getElementById(
                            "registroDireccion"
                        )
                        .value
                        .trim()
            };


            estudiantes.push(
                estudiante
            );


            localStorage.setItem(
                "estudiantes",
                JSON.stringify(
                    estudiantes
                )
            );


            const mensajeRegistro =
                document.getElementById(
                    "mensajeRegistro"
                );


            mensajeRegistro.textContent =
                "Estudiante registrado correctamente.";


            mensajeRegistro.style.color =
                "#198754";


            formRegistro.reset();


            mostrarRegistros();
        }
    );


    window.eliminarRegistro =
        function (indice) {

            const confirmar =
                confirm(
                    "¿Quieres eliminar este estudiante?"
                );


            if (!confirmar) {

                return;
            }


            estudiantes.splice(
                indice,
                1
            );


            localStorage.setItem(
                "estudiantes",
                JSON.stringify(
                    estudiantes
                )
            );


            mostrarRegistros();
        };


    window.borrarRegistros =
        function () {

            if (
                estudiantes.length === 0
            ) {

                alert(
                    "No hay registros para borrar."
                );

                return;
            }


            const confirmar =
                confirm(
                    "¿Quieres eliminar todos los registros?"
                );


            if (!confirmar) {

                return;
            }


            estudiantes = [];


            localStorage.removeItem(
                "estudiantes"
            );


            mostrarRegistros();


            const mensajeRegistro =
                document.getElementById(
                    "mensajeRegistro"
                );


            mensajeRegistro.textContent =
                "Todos los registros fueron eliminados.";


            mensajeRegistro.style.color =
                "#dc3545";
        };


    /* ==============================
       EXPORTAR A EXCEL
    ============================== */

    window.exportarExcel =
        function () {

            if (
                estudiantes.length === 0
            ) {

                alert(
                    "No hay estudiantes registrados."
                );

                return;
            }


            let csv =
                "\uFEFFsep=,\n";


            csv +=
                "Nombre,NIE,Edad,Género,Teléfono,Correo,Dirección\n";


            estudiantes.forEach(
                function (estudiante) {

                    const fila = [

                        estudiante.nombre,

                        estudiante.nie,

                        estudiante.edad,

                        estudiante.genero,

                        estudiante.telefono,

                        estudiante.correo,

                        estudiante.direccion

                    ].map(
                        function (dato) {

                            return `"${String(dato)
                                .replace(
                                    /"/g,
                                    '""'
                                )}"`;

                        }
                    ).join(",");


                    csv +=
                        fila + "\n";
                }
            );


            const archivo =
                new Blob(
                    [csv],
                    {
                        type:
                            "text/csv;charset=utf-8;"
                    }
                );


            const enlace =
                document.createElement(
                    "a"
                );


            enlace.href =
                URL.createObjectURL(
                    archivo
                );


            enlace.download =
                "estudiantes.csv";


            enlace.click();


            URL.revokeObjectURL(
                enlace.href
            );
        };


    /* ==============================
       IMPRIMIR / PDF
    ============================== */

    window.imprimirRegistro =
        function () {

            window.print();

        };


    mostrarRegistros();


    /* ==============================
       BOTÓN VOLVER ARRIBA
    ============================== */

    const botonArriba =
        document.getElementById(
            "arriba"
        );


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 300
            ) {

                botonArriba.style.display =
                    "block";

            } else {

                botonArriba.style.display =
                    "none";
            }
        }
    );


    window.subirArriba =
        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });
        };

});