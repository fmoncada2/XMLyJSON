// Evento Click del boton cargarXML
let btnCargarXML = document.getElementById('cargarXML');

//Programando el evento
btnCargarXML.addEventListener('click', function (){
    let xhr = new XMLHttpRequest(); // Creo la intancia del API XMLHttpRequest

    xhr.onreadystatechange = function (){
        if (this.readyState === 4 && this.status === 200) {
            /// Manipulacion de los objetos
            lista (this);
        }
    };

    xhr.open('GET', 'http://127.0.0.1:5501/datos.xml', true);
    xhr.send();
} );

function lista(xml){
    // Obtengo la respuesta
    let consolas = xml.responseXML;

    let listado = consolas.getElementsByTagName('categorias');
    let article = document.getElementById('listaXML');
    // Valida que no tenga contenido
    article.innerHTML = '';

    for (let i=0; i<listado.length; i++ ){
        let tagNombre = document.createElement('h1');

        tagNombre.innerHTML = listado[i].getElementsByTagName('titulo')[0].textContent;       

        article.appendChild(tagNombre);

        let listaCat = listado[i].getElementsByTagName('categoria');
        // Listado de detalle de consolas
        for (let c=0; c< listaCat.length; c++){
            console.log (listaCat[c]);
            let tagCod = document.createElement('h4');
            let tagNombreC = document.createElement('h5');
            let tagImg  = document.createElement('img');
            let tagParr  = document.createElement('p');

            tagCod.innerHTML = listaCat[c].getElementsByTagName('codigo')[0].textContent;
            tagNombreC.innerHTML = listaCat[c].getElementsByTagName('nombre')[0].textContent;
            tagParr.innerHTML = listaCat[c].getElementsByTagName('parrafo')[0].textContent;
            let imagenN = listaCat[c].getElementsByTagName('imagen')[0].textContent;
            $ (tagImg).attr("src", 'Recursos/Imagenes/'+ imagenN);

            // Agregar el elemento al section
            article.appendChild(tagCod);
            article.appendChild (tagNombreC);
            article.appendChild(tagImg); 
            article.appendChild(tagParr);
            
        }        
    }



}




// Defino el objeto del boton cargarJSON en JavaScript
let btnLoadJson = document.getElementById('cargarJSON');

//Creando la funcion para el evento click del cargarJSON
btnLoadJson.onclick = function (){
    // Creo la instancia del API XMLHttpRequest 
    let jsonReq = new XMLHttpRequest();

    jsonReq.onreadystatechange = function (){
        if (this.readyState === 4 && this.status === 200){
            leerCategorias (this);
        } else
            console.log ('Error al cargar los datos');
    };

    jsonReq.open ('GET', 'http://127.0.0.1:5501/detalles.json', true);
    // Definimos que la respuesta es tipo JSON
    jsonReq.responseType = 'json'; 
    jsonReq.send();
};

// Funcion que leer cada informacion del JSON
function leerCategorias (jsonObj){
    let valoresJson = jsonObj.response;

    //console.log (valoresJson);

    let listaCategorias = valoresJson.categorias;

    let tagListado = document.getElementById ('listaJSON');

    tagListado.innerHTML = '';
    listaCategorias.forEach(element => {
        let tagNombre = document.createElement('h2');
        let tagProducto = document.createElement('h3');
        let tagDisponible = document.createElement('strong');
        let tagTemporada = document.createElement('strong');
        let tagDescripcion = document.createElement('span');

        tagNombre.innerHTML = element.nombres;
        tagProducto.innerHTML = element.Producto;
        tagDisponible.innerHTML = element.Disponible; 
        tagTemporada.innerHTML = element.Temporada; 
        tagDescripcion.innerHTML = element.Descripción;      
              
        tagListado.appendChild(tagNombre);
        tagListado.appendChild(tagProducto);
        tagListado.appendChild(tagDisponible);       
        tagListado.appendChild(tagTemporada);
        tagListado.appendChild(tagDescripcion);
    });
}