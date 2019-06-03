let req, divStatus, contenido, statusName, statusCode, headers;

function getRequest(e) {
  // Reset estados
  statusName = '';
  divStatus = document.getElementById('estados');
  divStatus.innerHTML = '';
  // Reset content
  contenido = document.getElementById('contenidos');
  contenido.innerHTML = '';
  // Reset status code
  statusCode = document.getElementById('codigo');
  statusCode.innerHTML = '';
  // Reset Response Headers Content
  headers = document.getElementById('cabeceras');
  headers.innerHTML = '';
  req = new XMLHttpRequest();
  // Managing request status
  req.onreadystatechange = onReadyState;
  // Setting request
  let url = document.getElementById('recurso').value;
  let method = 'GET';
  req.open(method, url, true);
  req.send();
}

addEventListener('load', function() {
  showDefaultURL();
  // Starts listener onclick button
  document.getElementById('enviar').addEventListener('click', getRequest);
});

function showDefaultURL() {
  document.getElementById('recurso').value = document.URL;
}

function onReadyState() {
  let state = req.readyState;
  if (state == 0) {
    statusName += 'status : UNSENT => ' + state + ' <br>';
  } else if (state == 1) {
    statusName += 'status : OPENED => ' + state + ' <br>';
  } else if (state == 2) {
    statusName += 'status : HEADERS_RECEIVED => ' + state + ' <br>';
  } else if (state == 3) {
    statusName += 'status : LOADING => ' + state + ' <br>';
  } else if (state == 4) {
    statusName += 'status : DONE => ' + state + ' <br>';
    //console.log(req.responseText);
    showContent();
    showServerAnswer();
    showAllResponseHeaders();
  }

  divStatus.innerHTML = statusName;
}

function showServerAnswer() {
  statusCode.innerHTML = req.status + ' - ' + req.statusText;
}

function showAllResponseHeaders() {
    headers.innerHTML = req.getAllResponseHeaders();
}

function showContent() {
  contenido.innerHTML = req.responseText;
}
