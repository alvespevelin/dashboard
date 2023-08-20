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
    if(listMenu.length == 0)
    {
        document.getElementById("menu__dinamico__lista").innerText = "";
        document.getElementById("menu__dinamico").style.display = 'none';
    } else {
        document.getElementById("menu__dinamico").style.display = 'block';
        for (let i = 0; i < listMenu.length; i++) {
            incluirItemMenu(listMenu[i], "menu__dinamico__lista");
        }
    }
}

function incluirItemMenu(item, elementoPai) { // Refatorado ok
    var element = document.getElementById(elementoPai); // Elemento que vai ser inserido o item do menu
    var li = document.createElement('li');

    var a = document.createElement('a');
    a.setAttribute("id", item.nivel); 
    a.setAttribute("onclick", "clicado(this)");

    if(item.itens.length > 0) { // Se tiver submenu vai colocar o icon de expansão
        var spanFirst = document.createElement('span');
        spanFirst.classList.add("material-symbols-outlined")
        spanFirst.classList.add("icon__first")
        spanFirst.innerHTML = "chevron_right";
        a.appendChild(spanFirst);
    }    

    if(item.nivel.split('_').length == 1) { // Se for nível 1, vai colocar o ícone do item {não coloca pra submenus}
        var spanSecond = document.createElement('span');
        spanSecond.classList.add("material-symbols-outlined")
        spanSecond.classList.add("icon__second");
        spanSecond.innerHTML = item.icone;
        a.appendChild(spanSecond);
    }

    var spanTitulo = document.createElement('span');
    spanTitulo.innerHTML = item.titulo;
    a.appendChild(spanTitulo);
    
    li.appendChild(a);
    element.appendChild(li);
    
    // Verifica se o item atual tem submenus, se tiver faz a chamada "recursiva" pra incluir os submenus
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



function clicado(itemClicado) {
    var itemEstaExpandido = itemClicado.classList.contains('expandido');
    var itemEstaClicado = itemClicado.classList.contains('clicado');

    var itensClicados = document.getElementsByClassName('clicado');
    var itensExpandidos = itemClicado.getElementsByClassName('expandido');

    // REMOVE A CLASSE CLICADO DE TODOS OS ELEMENTOS
    for (let i = 0; i < itensClicados.length; i++) {
        itensClicados[i].classList.remove('clicado');
    }

    // VERIFICA SE ESTÁ COM A CLASSE EXPANDIDO
    if(itemEstaExpandido) {
        // REMOVE A CLASSE EXPANDIDO DE TODOS OS ELEMENTOS FILHOS (DE BAIXO PARA CIMA), VOLTA O ICONE DE EXPANSAO E OCULTA OS SUBMENUS
        for (let i = itensExpandidos.length - 1; i >= 0 ; i--) {
            itensExpandidos[i].classList.remove('expandido');
            itensExpandidos[i].firstChild.innerText = "chevron_right";
            mostrarOcultarSubMenu("ocultar", itensExpandidos[i]);
        }

        // REMOVE A CLASSE EXPANDIDO DO ELEMENTOCLICADO, VOLTA O ICONE DE EXPANSAO E OCULTA O SUBMENU
        // itemClicado.classList.remove('expandido');
        if(itemClicado.classList.length > 1)
            itemClicado.classList.remove('expandido');
        else
            itemClicado.removeAttribute("class");

        itemClicado.firstChild.innerText = "chevron_right";
        mostrarOcultarSubMenu("ocultar", itemClicado);
    }

    if(!itemEstaClicado && !itemEstaExpandido)
    {
        itemClicado.classList.add('clicado');
        
        if(itemClicado.firstChild.innerText == "chevron_right")
        {
            itemClicado.classList.add('expandido');
            itemClicado.firstChild.innerText = "expand_more";
            mostrarOcultarSubMenu("mostrar", itemClicado);
        }
        
        if(itemClicado.firstChild.innerText != "chevron_right")
        {
            itensExpandidos = document.getElementsByClassName('expandido');
            for (let i = itensExpandidos.length - 1; i >= 0 ; i--) {
                console.log(itemClicado.getAttribute("id"))
                console.log(itemClicado.getAttribute("id"))
                if(!itemClicado.getAttribute("id").includes(itensExpandidos[i].getAttribute("id")))
                {
                    console.log("itensExpandidos[i]: ", itensExpandidos[i])
                
                    itensExpandidos[i].firstChild.innerText = "chevron_right";
                    mostrarOcultarSubMenu("ocultar", itensExpandidos[i]);
                    
                    if(itensExpandidos[i].classList.length > 1)
                        itensExpandidos[i].classList.remove('expandido');
                    else
                        itensExpandidos[i].removeAttribute("class");
                }
            }
        }
    }
}

function mostrarOcultarSubMenu(acao, item) {
    var elementos = item.parentNode.children;

    for (let i = 1; i < elementos.length; i++) {
        elementos[i].style.display = acao == "mostrar" ? 'block' : 'none';
    }
}




/*
function clicado(itemClicado) {
    var itensClicados = document.getElementsByClassName('clicado');
    var itemJaEstaClicado = false;

    for (let i = 0; i < itensClicados.length; i++) {
        const item = itensClicados[i];
        console.log("item: ", item)
        

        itemJaEstaClicado = item.getAttribute("id") == itemClicado.getAttribute("id");
        
        if(item.classList.contains('clicado'))
            item.classList.remove('clicado');

        if(item.firstChild.innerText == "expand_more") {
            item.firstChild.innerText = "chevron_right";
            mostrarOcultarSubMenu("ocultar", item);
        }
    }

    if(!itemJaEstaClicado)
    {
        itemClicado.classList.add("clicado");

        if(itemClicado.firstChild.innerText == "chevron_right")
        {
            itemClicado.firstChild.innerText = "expand_more";
            mostrarOcultarSubMenu("mostrar", itemClicado);
        }
    }
}


*/