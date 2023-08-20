function clicado(item) {
    var itensClicado = document.getElementsByClassName('clicado');
    var itemJaClicado = false;
    
    for (let i = 0; i < itensClicado.length; i++) {
        const element = itensClicado[i];
        element.classList.remove('clicado');
        itemJaClicado = element.getAttribute("id") == item.getAttribute("id");
    }
    if(!itemJaClicado)
        item.classList.add("clicado");
}