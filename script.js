function fleerURL() {
        req = new XMLHttpRequest();

        req.open('GET',document.querySelector('#recurso').value,true);
        req.send(null); // aqui vendrian los parámetros
    
        // La asociacion del evento puede estar realizado al principio si quieres.
        // 1ª generacion de AJAX, quedate pendiente de un cambio en el estado de la petición
        // req.onreadystatechange = fnCallback;
        // 2ª generación de AJAX, hasta que se termine el evento
        //req.setRequestHeader('allow-acces-origin:*');

        req.onloadstart = loadStartResource;
        req.onloadend = loadEndResource;
        req.onprogress = checkProgress;
        /*
        req.addEventListener('loadstart', loadStartResource);
        req.addEventListener('loadend', loadEndResource);
        req.addEventListener('progress',checkProgress);
        */

        req.onload = fnCallback;
}

function loadStartResource() {
        progressBar.value = 0;
}

function loadEndResource(e) {
        progressBar.value = e.loaded;
}

function checkProgress(e) {
        if(e.lengthComputable) {
                progressBar.max = e.total;
                progressBar.value = e.loaded;
                display.innerHTML = Math.floor((e.loaded/e.total)*100) + '%';
        }
}

function fnCallback() {
        // Se puede utilizar querySelector o querySelectorAll
        let fichero = req.responseText;
        let cab = req.getAllResponseHeaders();
        document.querySelector("#cabeceras").innerText = cab;
        document.querySelector("#contenidos").innerText = fichero;
        document.querySelector("#estados").innerText = req.readyState;
        document.querySelector("#codigo").innerText = req.status;
}

let req;
let url = window.location;
let progressBar = document.querySelector('#progress-bar');
document.querySelector('#recurso').value = url;

window.addEventListener('click', fleerURL);