let comparar = [];
let incorrectos = [];
let correctos = [];
let aciertos = 0;
let intentos = 0;
let trampas = 0;

function empezarJuego(){
    const boton = document.querySelector(".empezar");
    boton.classList.add('bloquear');
    generarContenedor();
    comprobarResultado();
}
function volveraJuegar(){
    cerrarModal();
    comparar = [];
    incorrectos = [];
    correctos = [];
    aciertos = 0;
    intentos = 0;
    trampas = 0;
    incrementarAciertos();
    incrementarIntentos();
    empezarJuego();
}

function generarContenedor(){
    let contenedor = document.querySelector('.contenedor');
    let elementos = [];
    let aux = 0;
    for(let i = 0; i < 2; i ++ ){
        for(let j = 0; j < 6; j ++ ){
            aux++;
            elementos.push(`
            <div class="contenedor__area">
                <div class="contenedor__elemento" id="${aux}" onClick="comprobarSeleccionado(${j},${aux})">
                    <img class="contenedor__elemento--imagen elemento" src="imagenes/${imagenes(j)}.jpg" alt="imagen de ${imagenes(j)}">
                    <div class="contenedor__elemento--posterior elemento"></div>
                </div>
            </div>
        `);
        }
    }
    elementos.sort( () => Math.random() - 0.5)
    contenedor.innerHTML = elementos.join(" ");
}

function comprobarSeleccionado(valor, aux){
    const elemento = document.getElementById(aux);
    if(elemento.style.transform == "rotateY(180deg)" && !correctos.includes(aux)){
        elemento.style.transform = "rotateY(0deg)";
        comparar = [];
        incorrectos = [];
        trampas ++;
    }else if(!correctos.includes(aux)){
        seleccionarElemento(aux); 
        compararElementos(valor, aux);
    }
}

function seleccionarElemento(valor){
    const elemento = document.getElementById(valor);
    if(elemento.style.transform != "rotateY(180deg)"){
        elemento.style.transform = "rotateY(180deg)";
    }
}

function compararElementos(valor, aux){

    if(comparar.length != 2){
        comparar.push(valor);
        incorrectos.push(aux); 
    }

    if(comparar.length == 2 && comparar[0] === comparar[1]){
        console.log('Correcto');
        aciertos++;
        incrementarAciertos();
        incorrectos.forEach(value => {
            correctos.push(value);
        });
        comparar = [];
        incorrectos = [];
    }else if(comparar.length == 2){
        console.log('Incorrecto');
        intentos++;
        incrementarIntentos();
        voltearElementos(incorrectos);
        comparar = [];
        incorrectos =[];
    }
    comprobarResultado();
}


function comprobarResultado(){
    if(aciertos == 6){
        let valor = Math.floor(Math.random() * 6);
        const modal = document.querySelector(".modal");
        modal.classList.add('modal--show');
        const modalContenedor = document.querySelector(".modal__contenedor");
        modalContenedor.innerHTML = `
            <h3 class="modal__contenedor--titulo ganaste">Felicidades Ganaste</h3>
            <p>Muy Bien conseguiste todos los animales. Te dejemos informacion sobre los animales que aparecen en este juego</p>
            <div class="modal__contenedor--informacion">
                <img class="modal__contenedor--imagen" src="imagenes/${imagenes(valor)}.jpg" alt="imagen de ${imagenes(valor)}">
                <p class="modal__contenedor--nombre">${nombre(valor)}</p>
                <p class="modal__contenedor--descripcion">${descripcion(valor)}</p>
                <button class="modal__contenedor--boton ganaste__boton" onClick="volveraJuegar()">Volver a Jugar</button>
            </div>
            
        `;
    }else if(intentos == 3){
        let valor = Math.floor(Math.random() * 6);
        const modal = document.querySelector(".modal");
        modal.classList.add('modal--show');
        const modalContenedor = document.querySelector(".modal__contenedor");
        modalContenedor.innerHTML = `
            <h3 class="modal__contenedor--titulo perdiste">Lo siento, has perdido</h3>
            <p>Buen intento pero llegaste al limite de intentos. Te dejemos informacion sobre los animales que aparecen en este juego</p>
            <div class="modal__contenedor--informacion">
                <img class="modal__contenedor--imagen" src="imagenes/${imagenes(valor)}.jpg" alt="imagen de ${imagenes(valor)}">
                <p class="modal__contenedor--nombre">${nombre(valor)}</p>
                <p class="modal__contenedor--descripcion">${descripcion(valor)}</p>
                <button class="modal__contenedor--boton perdiste__boton" onClick="volveraJuegar()">Volver a Jugar</button>
            </div>
        `;
    }
    else if(trampas == 2){
        let valor = Math.floor(Math.random() * 6);
        const modal = document.querySelector(".modal");
        modal.classList.add('modal--show');
        const modalContenedor = document.querySelector(".modal__contenedor");
        modalContenedor.innerHTML = `
            <h3 class="modal__contenedor--titulo perdiste">Lo siento, Perdiste</h3>
            <p>Intentaste dar muchas vueltas las tarjetas, recuerda que solo puedes hacerlo 2 veces por partida</p>
            <div class="modal__contenedor--informacion">
                <img class="modal__contenedor--imagen" src="imagenes/${imagenes(valor)}.jpg" alt="imagen de ${imagenes(valor)}">
                <p class="modal__contenedor--nombre">${nombre(valor)}</p>
                <p class="modal__contenedor--descripcion">${descripcion(valor)}</p>
                <button class="modal__contenedor--boton perdiste__boton" onClick="volveraJuegar()">Volver a Jugar</button>
            </div>
        `;
    }
}

function voltearElementos(valor){
    setTimeout(() => {
        for(let i = 0; i < 2; i ++ ){
            const elemento = document.getElementById(valor[i]);
            elemento.style.transform = "rotateY(0deg)";
        }
    }, 1000)    
}

function incrementarAciertos(){
    const aciertosHtml = document.querySelector('.puntajes__aciertos');
    aciertosHtml.innerHTML = `
        <p>Aciertos</p>
        <p>${aciertos}</p>
    `;
}

function incrementarIntentos(){
    const intentosHtml = document.querySelector('.puntajes__intentos');
    intentosHtml.innerHTML = `
        <p>Intentos</p>
        <p>${intentos}/3</p>
    `;
}

function cerrarModal(){
    const modal = document.querySelector(".modal");
        modal.classList.remove('modal--show');
}

function imagenes(i){
    const imagenes = ['chimpance','gavial', 'panda', 'tigres','oso_polar', 'guacamayo'];
    return imagenes[i];
}
function nombre(i){
    const nombre = ['Chimpance Comun','Gavial Indio', 'Oso Panda', 'Tigres', 'Oso Polares','Guacamayos Militares' ];
    return nombre[i];
}
function descripcion(i){
    const descripcion = [
        'Se han perdido alrededor de las tres cuartas partes de su población en el último siglo. Esto es debido a que son ampliamente cazados por su carne, que se consume localmente y también se transporta de contrabando al extranjero. La agricultura, la tala de árboles, la extracción de petróleo, la minería y la construcción de carreteras atraviesan los bosques y fragmentan sus comunidades unidas.',
        'En la década de 1940 existían quizá, cerca de 10.000 gaviales, pero hoy, a pesar de los valientes esfuerzos de conservación desde mediados de la década de 1970, las población total de la especie tan solo suma un par de cientos de ejemplares.',
        'A día de hoy solo hay dos mil individuos viviendo en la naturaleza, dispersos en varias poblaciones aisladas. Además, su fuente de alimento, el bambú, es muy sensible a la temperatura, y los bosques de bambú de China pronto serán extensamente dañados por el cambio climático.',
        'En los últimos 100 años, la población mundial de tigres se ha reducido en un 97%, y tres de sus nueve subespecies se han extinguido. Desafortunadamente, las cifras siguen disminuyendo en todo el sudeste asiático, salvando el caso de un santuario en el oeste de Tailandia. Por otro lado Camboya ha declarado extintos a los tigres a nivel nacional, el tigre del sur de China casi ha desaparecido y el tigre de Sumatra -el último de Indonesia- también está en peligro crítico.',
        'Los osos polares dependen del hielo marino para atrapar su presa. Se abalanzan sobre las focas cuando emergen a través de sus respiraderos y las acechan mientras toman el sol al aire libre, pero el hielo se está derritiendo a medida que nuestro clima se calienta. En los trece inviernos que siguen al año 2003 se produjeron las trece extensiones de hielo más pequeñas registradas por los satélites. Las temporadas de caza son cada vez más cortas, y por cada semana de hielo que se pierde en los inviernos del Ártico, los osos polares pierden alrededor 7 kg de grasa.',
        'Los guacamayos militares tienen algunas de las voces más fuertes de los bosques de Sudamérica. No conocen sus llamadas de forma innata, sino que las aprenden de sus padres y compañeros, lo que da lugar a dialectos locales que distinguen a un grupo de otro. Su belleza y buena compañía los pone en gran demanda de la industria de mascotas, pero muchos comerciantes los toman de la naturaleza, en lugar de criarlos en cautiverio.'

    ];
    return descripcion[i];
}