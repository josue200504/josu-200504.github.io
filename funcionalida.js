let formulario = document.getElementById("formulario");
let respuesta = document.getElementById("re");
let boton = document.getElementById("enviar");
let contador = 0;
let primer_valor = "";
let resultados = document.getElementById("resultados");

// Función para cargar las notas desde localStorage y mostrarlas
function cargarNotas() {
    let notasGuardadas = JSON.parse(window.localStorage.getItem('notas')) || [];
    resultados.innerHTML = "";
    notasGuardadas.forEach((nota, index) => {
        let p = document.createElement('p');
        p.textContent = nota;
        p.className="p";

        // Crear botón de eliminar
        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = "Eliminar";
        botonEliminar.className = "boton_eleminar";
        botonEliminar.addEventListener('click', () => {
            eliminarNota(index);
        });

        p.appendChild(botonEliminar);
        resultados.appendChild(p);
    });


    
}

// Función para manejar la conversación y guardar notas
function conversacion(){
    let valor = formulario.value.trim();
    if(valor !== ""){
        let texto_1 = document.createElement('p');
        respuesta.appendChild(texto_1);
        texto_1.textContent = valor;
        formulario.value = "";
        if(contador === 1){
            primer_valor = valor;
        }
        let resultado = document.createElement('p');
        respuesta.appendChild(resultado);
        setTimeout(() => {
            resultado.textContent = "¿En qué categoría prefieres guardar esta nota, como importante o menos importante?";
        },500);
        if(valor.toLowerCase() === "importante" || valor.toLowerCase() === "Importante"){
            setTimeout(() => {
                resultado.textContent= "¡Excelente! Tu nota ha sido guardada en la categoría de 'Importante'.";
            },500);
            setTimeout(() =>{
                location.reload();
            },2000);
            guardarNota(primer_valor, valor); 
           
            contador = 0;
        }
        else if(valor.toLowerCase() === "menos importante" || valor.toLowerCase() === "Menos importante"){
            setTimeout(() => {
                resultado.textContent= "¡Excelente! Tu nota ha sido guardada en la categoría de 'Menos Importante'";
                    
            },500);
            setTimeout(() =>{
                location.reload();
            },2000);
            guardarNota(primer_valor, valor);
            contador = 0;
        }
        else if(contador >= 2 && valor.toLowerCase() !== "importante" && valor.toLowerCase() !== "menos importante"){
            setTimeout(() => {
                resultado.textContent= "No entiendo lo que escribiste.";
            },500);
        }
        console.log(primer_valor);
        console.log(valor);
        console.log(contador);
    }
}

function guardarNota(nota, categoria){
    let notasGuardadas = JSON.parse(window.localStorage.getItem('notas')) || [];
    notasGuardadas.push(`${nota} - Categoría: ${categoria}`);
    window.localStorage.setItem('notas', JSON.stringify(notasGuardadas));
}
function eliminarNota(index) {
    let notasGuardadas = JSON.parse(window.localStorage.getItem('notas')) || [];
    notasGuardadas.splice(index, 1); // Elimina la nota en el índice especificado
    window.localStorage.setItem('notas', JSON.stringify(notasGuardadas));
    cargarNotas();r
}

boton.addEventListener("click",function(){
    contador += 1;
    conversacion();
});

cargarNotas();
