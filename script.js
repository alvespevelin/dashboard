var count = 0;
var listMenu =  [
    { // Deashboard
        titulo: "Deashboard",
        nivel: "menu",
        icone: "dashboard",
        visivel: true,
        itens: []
    },
    { // Products
        titulo: "Products",
        nivel: "menu",
        icone: "shopping_bag",
        visivel: true,
        itens: [
            {
                titulo: "Products A",
                nivel: "item__final",
                icone: "",
                visivel: true,
                itens: []
            },
            {
                titulo: "Products B",
                nivel: "item__final",
                icone: "",
                visivel: true,
                itens: []
            }
         ]
    },
    { // Messages
        titulo: "Messages",
        nivel: "menu",
        icone: "mail",
        visivel: true,
        itens: [
            {
                titulo: "Messages A",
                nivel: "menu",
                icone: "",
                visivel: true,
                itens: [
                    {
                        titulo: "Messages A 1",
                        nivel: "item__final",
                        icone: "",
                        visivel: true,
                        itens: []
                    },
                    {
                        titulo: "Messages A 2",
                        nivel: "item__final",
                        icone: "",
                        visivel: true,
                        itens: []
                    },
                ]
            },
            {
                titulo: "Messages B",
                nivel: "item__final",
                icone: "",
                visivel: true,
                itens: []
            }
         ]
    },
    { // Calendar
        titulo: "Calendar",
        nivel: "menu",
        icone: "calendar_month",
        visivel: true,
        itens: []
    },
    { // Activity
        titulo: "Activity",
        nivel: "menu",
        icone: "trending_up",
        visivel: true,
        itens: []
    },
    { // Statistics
        titulo: "Statistics",
        nivel: "menu",
        icone: "bar_chart",
        visivel: true,
        itens: []
    },
]

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

function carregarSideBar() {
    if(listMenu.length == 0)
    {
        document.getElementById("menu__dinamico__lista").innerText = "";
        document.getElementById("menu__dinamico").style.display = 'none';
    }
    else {
        document.getElementById("menu__dinamico").style.display = 'block';
        for (let i = 0; i < listMenu.length; i++) {
            incluirItemMenu(listMenu[i], "menu__dinamico__lista");
        }
    }
}

function incluirItemMenu(item, elementoPai) {
    var element = document.getElementById(elementoPai);
    var li = document.createElement('li');
    var a = document.createElement('a');

    if(item.nivel == "menu") {
        if(item.itens.length > 0) {
            var spanFirst = document.createElement('span');
            spanFirst.classList.add("material-symbols-outlined")
            spanFirst.classList.add("icon__first")
            spanFirst.innerHTML = "chevron_right";
            a.appendChild(spanFirst);
        }
        var spanSecond = document.createElement('span');
        spanSecond.classList.add("material-symbols-outlined")
        spanSecond.classList.add("icon__second")
        spanSecond.innerHTML = item.icone;
        a.appendChild(spanSecond);
    }

    var spanTitulo = document.createElement('span');
    spanTitulo.innerHTML = item.titulo;
    a.appendChild(spanTitulo);
    a.setAttribute("id", item.titulo.replaceAll(" ", "")); 
    a.setAttribute("onclick", "clicado(this)");
    
    
    li.appendChild(a);
    // li.setAttribute("id", item.titulo.replaceAll(" ", ""));
    // li.setAttribute("onclick", "clicado(this)");
    element.appendChild(li);
    
    count++;
    for (let i = 0; i < item.itens.length; i++) {
        elementoPai = "menu__dinamico__lista__item__" + item.itens[i].titulo.replaceAll(" ", "");

        if(element.getAttribute("id") != elementoPai) {
            var ul = document.createElement('ul');
            ul.setAttribute("id", elementoPai)
    
            li.appendChild(ul)
            ul.style.display = 'none';
        }
        incluirItemMenu(item.itens[i], elementoPai);
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    carregarSideBar();
});