var count = 0;
var listMenu =  [
    { // Deashboard
        titulo: "Dashboard",
        nivel: "Dashboard",
        icone: "dashboard",
        visivel: true,
        itens: []
    },
    { // Products
        titulo: "Products",
        nivel: "Products",
        icone: "shopping_bag",
        visivel: true,
        itens: [
            {
                titulo: "Products A",
                nivel: "Products_ProductsA",
                icone: "",
                visivel: true,
                itens: []
            },
            {
                titulo: "Products B",
                nivel: "Products_ProductsB",
                icone: "",
                visivel: true,
                itens: []
            }
         ]
    },
    { // Messages
        titulo: "Messages",
        nivel: "Messages",
        icone: "mail",
        visivel: true,
        itens: [
            {
                titulo: "Messages A",
                nivel: "Messages_MessagesA",
                icone: "",
                visivel: true,
                itens: [
                    {
                        titulo: "Messages A 1",
                        nivel: "Messages_MessagesA_MessagesA1",
                        icone: "",
                        visivel: true,
                        itens: [
                            {
                                titulo: "Messages A 1 1",
                                nivel: "Messages_MessagesA_MessagesA11",
                                icone: "",
                                visivel: true,
                                itens: []
                            },
                        ]
                    },
                    {
                        titulo: "Messages A 2",
                        nivel: "Messages_MessagesA_MessagesA2",
                        icone: "",
                        visivel: true,
                        itens: []
                    },
                ]
            },
            {
                titulo: "Messages B",
                nivel: "Messages_MessagesB",
                icone: "",
                visivel: true,
                itens: []
            }
         ]
    },
    { // Calendar
        titulo: "Calendar",
        nivel: "Calendar",
        icone: "calendar_month",
        visivel: true,
        itens: []
    },
    { // Activity
        titulo: "Activity",
        nivel: "Activity",
        icone: "trending_up",
        visivel: true,
        itens: []
    },
    { // Statistics
        titulo: "Statistics",
        nivel: "Statistics",
        icone: "bar_chart",
        visivel: true,
        itens: []
    },
]

document.addEventListener("DOMContentLoaded", function(e) {
    carregarSideBar();
});

function carregarSideBar() {
    if(listMenu.length == 0) {
        document.getElementById("menu__dinamico__lista").innerText = "";
        document.getElementById("menu__dinamico").style.display = 'none';
    } else {
        document.getElementById("menu__dinamico").style.display = 'block';
        for (let i = 0; i < listMenu.length; i++) {
            incluirItemMenu(listMenu[i], "menu__dinamico__lista");
        }
    }
}

function incluirItemMenu(item, elementoPai) {
    var element = document.getElementById(elementoPai);
    var li = document.createElement('li');
    li.classList.add("item__" + item.nivel);

    var a = document.createElement('a');
    a.setAttribute("id", item.nivel); 
    a.classList.add("sidebar__item__link"); 
    a.setAttribute("onclick", "clicado(this)");

    if(item.itens.length > 0) {
        var spanFirst = document.createElement('span');
        spanFirst.classList.add("material-symbols-outlined")
        spanFirst.classList.add("sidebar__item__link__icon__first")
        spanFirst.innerHTML = "chevron_right";
        a.appendChild(spanFirst);
    }    
    else {
        a.classList.add("nivel__" +item.nivel.split('_').length);
    }

    if(item.nivel.split('_').length == 1) {
        var spanSecond = document.createElement('span');
        spanSecond.classList.add("material-symbols-outlined")
        spanSecond.classList.add("sidebar__item__link__icon__second");
        spanSecond.innerHTML = item.icone;
        a.appendChild(spanSecond);
    } else {
        a.classList.add("itens");
    }


    var spanTitulo = document.createElement('span');
    spanTitulo.innerHTML = item.titulo;
    a.appendChild(spanTitulo);
    
    li.appendChild(a);
    element.appendChild(li);
    
    for (let i = 0; i < item.itens.length; i++) {
        elementoPai = "subMenu_" + item.itens[i].nivel;

        if(element.getAttribute("id") != elementoPai) {
            var ul = document.createElement('ul');
            ul.setAttribute("id", elementoPai)

            li.appendChild(ul)
            ul.style.display = 'none';
        }
        incluirItemMenu(item.itens[i], elementoPai);
    }
}

function removerClasse(elemento, classe) {
    if(elemento.classList.length > 1)
        elemento.classList.remove(classe);
    else
        elemento.removeAttribute("class");
}

function incluirClasse(elemento, classe) {
    if(!elemento.classList.contains(classe))
        elemento.classList.add(classe);
}

function clicado(itemClicado) {
    var itemEstaExpandido = itemClicado.classList.contains('expandido');
    var itemEstaClicado = itemClicado.classList.contains('clicado');

    var itensClicados = document.getElementsByClassName('clicado');
    var itensExpandidos = itemClicado.getElementsByClassName('expandido');

    for (let i = 0; i < itensClicados.length; i++) {
        removerClasse(itensClicados[i], 'clicado');
    }

    if(itemEstaExpandido) {
        for (let i = itensExpandidos.length - 1; i >= 0 ; i--) {
            removerClasse(itensExpandidos[i], 'expandido');
            itensExpandidos[i].firstChild.innerText = "chevron_right";
            mostrarOcultarSubMenu("ocultar", itensExpandidos[i]);
        }
        removerClasse(itemClicado, 'expandido');
        itemClicado.firstChild.innerText = "chevron_right";
        mostrarOcultarSubMenu("ocultar", itemClicado);
    }

    if(!itemEstaClicado && !itemEstaExpandido) {
        incluirClasse(itemClicado, 'clicado')
        if(itemClicado.firstChild.innerText == "chevron_right") {
            incluirClasse(itemClicado, 'expandido');
            itemClicado.firstChild.innerText = "expand_more";
            mostrarOcultarSubMenu("mostrar", itemClicado);
        }
        if(itemClicado.firstChild.innerText != "chevron_right") {
            itensExpandidos = document.getElementsByClassName('expandido');
            for (let i = itensExpandidos.length - 1; i >= 0 ; i--) {
                if(!itemClicado.getAttribute("id").includes(itensExpandidos[i].getAttribute("id"))) {
                    itensExpandidos[i].firstChild.innerText = "chevron_right";
                    mostrarOcultarSubMenu("ocultar", itensExpandidos[i]);
                    removerClasse(itensExpandidos[i], 'expandido');
                }
            }
        }
    }
}

function mostrarOcultarSubMenu(acao, item) {
    var elementos = item.parentNode.children;
    debugger;

    for (let i = 1; i < elementos.length; i++) {
        console.log(elementos[i])
        console.log(elementos[i].firstChild)
        if("mostrar" == acao) {
            elementos[i].style.display = 'block';
            incluirClasse(elementos[i].firstChild, 'display__expandido')
        } else {
            elementos[i].style.display = 'none';
            removerClasse(elementos[i].firstChild, 'display__expandido')        
        }
        
        
    }
}