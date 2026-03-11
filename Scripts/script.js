//#region Obtenció d'elements del DOM globals
const botons = document.querySelectorAll(".botons a"); //Botons de Reserva
const seccionsInformacio = document.querySelectorAll(".sobreNosaltres section"); //Seccions informació del main
const imatges = document.querySelectorAll("#galeria img"); //Imatges de la galeria
const lightbox = document.getElementById("lightbox"); //Div per posar imatge gran
const pizzes = [ //Array que guarda les pizzes grans
  { src: "/Recursos/Imatges/pizza1big.avif", alt: "margheritaGran" },
  { src: "/Recursos/Imatges/pizza2big.avif", alt: "cappriciosaGran" },
  { src: "/Recursos/Imatges/pizza3big.avif", alt: "prosciuttoEFunghiGran" },
  { src: "/Recursos/Imatges/pizza4big.avif", alt: "diavolaGran" },
  { src: "/Recursos/Imatges/pizza5big.avif", alt: "napoliGran" },
  { src: "/Recursos/Imatges/pizza6big.avif", alt: "budfalinaGran" },
  { src: "/Recursos/Imatges/pizza7big.avif", alt: "ibericaGran" },
  { src: "/Recursos/Imatges/pizza8big.avif", alt: "vegetarianaGran" }
];
const hamburgers = document.querySelectorAll(".navHamburger");
const navOverlay = document.querySelector(".navOverlay");
const navLinks = navOverlay.querySelectorAll("a");
const botoTencar = navOverlay.querySelectorAll(".botoX");
const botoEnrera = document.querySelectorAll(".botoTornar");
const articleCarta = document.querySelectorAll(".laCarta li");
const formulari = document.querySelector('.formulariGrups');
const planolRestaurant = document.getElementById("planolRestaurant");
const selectPersones = document.getElementById("persones");
//#endregion

//#region Variables let globals
let indexActual = 0; //Per saber a quin index de imatge de la galeria ens trobem
let autoSlide; //Creem l'AutoSlide per poder usarlo quan cliquem les imatges
let preuTotal = 0; //Variable que obté el preu total dels articles seleccionats
//#endregion

//#region Esdeveniments
//Esdeveniments per quan fem hover a un boto de reserves
botons.forEach(boto => { //Fem un foreach per recorrer tota la coleccio
    boto.addEventListener("mouseenter", () =>{
        escalarContingut(boto,1.1);
        boto.style.color="#f2e8cf";
    });
    boto.addEventListener("mouseleave", () =>{
        escalarContingut(boto,1);
        boto.style.color="black";
    });
});
articleCarta.forEach(article => { //Fem un foreach per recorrer tota la coleccio
    article.addEventListener("mouseenter", () =>{
        escalarContingut(article,1.05);
    });
    article.addEventListener("mouseleave", () =>{
        escalarContingut(article,1);
    });

    article.addEventListener("click", () =>{
        sumaPreu(article);
    })
});
//Esdeveniment per quan fem hover a una seccio
seccionsInformacio.forEach(seccio => { //Fem un foreach per recorrer tota la coleccio
    seccio.addEventListener("mouseenter", () =>{
        escalarContingut(seccio,1.1);
    });
    seccio.addEventListener("mouseleave", () =>{
        escalarContingut(seccio,1);
    });
});
//Esdeveniments per diferents accions de la galeria
imatges.forEach((imatge, index) => { //Fem un foreach per recorrer tota la coleccio
    imatge.addEventListener("mouseenter", () =>{
        escalarContingut(imatge,1.03);
    });
    imatge.addEventListener("mouseleave", () =>{
        escalarContingut(imatge,1);
    });
    imatge.addEventListener("click", function(){
        emplenaLightbox(index);
    });
});
//Esdeveniment per tancar el lightbox al fer-li clic
if (lightbox){
    lightbox.addEventListener("click", function(e) {
        if (e.target===lightbox){ 
            esborraLightbox();
        };
    });
}
//Esdeveniment per tancar el lightbox al clicar Escape
if (lightbox){
    document.addEventListener("keydown", function(e) {
        if (lightbox.style.display==="flex"&&e.key==="Escape"){ 
            esborraLightbox();
        };
    });
}
//Quan carreguem la pàgina comprovar si teniem el lightbox obert
document.addEventListener("DOMContentLoaded", function(){

    const guardada = localStorage.getItem("pizzaActual");
    const lightboxObert = localStorage.getItem("lightboxObert");

    if(guardada !== null){ 
        indexActual = parseInt(guardada);
    }

    if(lightboxObert === "true"){ //"Recuperem" l'estat guardat del lightbox
        emplenaLightbox(indexActual)
    }

});
//Esdeveniment fer clic al hamburger i obrir el menu
hamburgers.forEach(hamburger => {

    hamburger.addEventListener("click", () => { //Clic hamburger
        toggleMenu();
    });

    hamburger.addEventListener("mouseenter", ()=>{
        const barres = document.querySelectorAll(".navHamburger span")
        for (let i=0;i<barres.length;i++){
            barres[i].style.background="#c9a227"
        }
    })

    hamburger.addEventListener("mouseleave", ()=>{
        const barres = document.querySelectorAll(".navHamburger span")
        for (let i=0;i<barres.length;i++){
            barres[i].style.background="black"
        }
    })
});
//Esdeveniment fer clic al link i tencar el menu
navLinks.forEach(link => { //Clic link
    link.addEventListener("click", () => {
        toggleMenu();
    });
});
//Esdeveniment fer clic a la X i tencar el menu
botoTencar.forEach(botoX => { //Clic boto tencar
    botoX.addEventListener("click", () => {
        toggleMenu();
    });
});
//Esdeveniment fer clic a l'overlay i tencar el menu
navOverlay.addEventListener("click", function(e) { //CLic fora 
    if (e.target === navOverlay) {
        toggleMenu();
    }
});
//Esdeveniment pulsar tecla Escape i tencar el menu
document.addEventListener("keydown", function(e) { //CLic fora 
    if (navOverlay.classList.contains("actiu") && e.key === "Escape") {
        toggleMenu();
    }
});
//Esdeveniment quan fem clic al boto, tornem una pagina enrera a l'historial
botoEnrera.forEach(boto =>{
    boto.addEventListener("click", ()=>{
        history.go(-1);
    })
})
//Esdeveniment per comprovar si formulari està validat
if (formulari){
    formulari.addEventListener('submit', function(e) {
        e.preventDefault(); 
        validarFormulari();
    });
}
//Esdeveniment que carrega el planol, obté totes les taules i crida a les funcions
if (planolRestaurant){
    planolRestaurant.addEventListener("load", () => {
        const planolSVG = planolRestaurant.contentDocument;

        const taulesQuadrades = planolSVG.querySelectorAll(".taulaQuadrada");
        const taulesRodones = planolSVG.querySelectorAll(".taulaRodona");
        const taulesRectangulars = planolSVG.querySelectorAll(".taulaRectangular");

        // Assignar rang a cada tipous de taula
        taulesQuadrades.forEach(t => clickTaula(t, [1, 3], planolSVG));
        taulesRodones.forEach(t => clickTaula(t, [4, 5], planolSVG));
        taulesRectangulars.forEach(t => clickTaula(t, [6, 8], planolSVG));
    });
}
//#endregion

//#region Funcions declaratives
//Aquesta funció escala l'element depenent de quin element i l'escala entrades
function escalarContingut (element, escala) { 
    element.style.transform = `scale(${escala})`;
};    
//Funció que emplena el lightbox
function emplenaLightbox(index){

    indexActual = index;

    //crear imatge
    const imgGran = document.createElement("img");

    //crear fletxes
    const fletxaEsq = document.createElement("span");
    fletxaEsq.innerHTML = "&#10094;";
    fletxaEsq.classList.add("fletxa","esquerra");

    const fletxaDreta = document.createElement("span");
    fletxaDreta.innerHTML = "&#10095;";
    fletxaDreta.classList.add("fletxa","dreta");

    //Afegir al lightbox
    lightbox.appendChild(imgGran);
    lightbox.appendChild(fletxaEsq);
    lightbox.appendChild(fletxaDreta);

    //mostrar lightbox
    lightbox.style.display = "flex";

    //mostrar pizza inicial
    mostrarPizza(indexActual);

    //hover fletxes
    const fletxes = [fletxaEsq, fletxaDreta];

    fletxes.forEach(fletxa => {

        fletxa.addEventListener("mouseenter", function(){
            escalarContingut(this,1.3);
            this.style.color="#8b2e2e";
        });

        fletxa.addEventListener("mouseleave", function(){
            escalarContingut(this,1);
            this.style.color="#f2e8cf";
        });

    });

    //events fletxes
    fletxaDreta.addEventListener("click", function(e){
        e.stopPropagation();
        seguentPizza();
        carrusel();
    });

    fletxaEsq.addEventListener("click", function(e){
        e.stopPropagation();
        anteriorPizza();
        carrusel();
    });

    //teclat
    document.addEventListener("keydown", controlTeclat);

    //autoslide
    carrusel();

    //guardar estat
    localStorage.setItem("lightboxObert","true");

}
//Funció per esborrar el lightbox
function esborraLightbox(){

    const img = lightbox.querySelector("img");
    lightbox.removeChild(img);

    const fletxes = lightbox.querySelectorAll("span");

    fletxes.forEach(fletxa => {
        lightbox.removeChild(fletxa);
    });

    lightbox.style.display = "none";

    clearInterval(autoSlide);

    document.removeEventListener("keydown", controlTeclat);

    localStorage.setItem("lightboxObert","false");

}

//Funció que mostra la imatge de la pizza depenent de l'index entrat
function mostrarPizza(index) {
    indexActual = index;
    const imgGran = lightbox.querySelector("img");

    imgGran.src = pizzes[indexActual].src;
    imgGran.alt = pizzes[indexActual].alt;
    
    localStorage.setItem("pizzaActual", indexActual); //Guardem l'index al localStorage
}

//Funció de moure carrusel amb el teclat
function controlTeclat(e){
    if(e.key === "ArrowRight"){
        seguentPizza();
        carrusel();
    }
    if(e.key === "ArrowLeft"){
        anteriorPizza();
        carrusel();
    }
}

//Funció que mostra la imatge seguent
function seguentPizza() {
    indexActual++;
    if(indexActual >= pizzes.length) indexActual = 0;
    mostrarPizza(indexActual);
}

//Funció que mostra la imatge anterior
function anteriorPizza() {
    indexActual--;
    if(indexActual < 0) indexActual = pizzes.length - 1;
    mostrarPizza(indexActual);
}

//Funció per resetejar el timer de l'AutoSlide i iniciar-lo
function carrusel() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {seguentPizza();}, 3000);
}

//Funció que mostra o ocula el menú navegador overlay
function toggleMenu() {
    navOverlay.classList.toggle("actiu");
}

//Funció que mostra el preu total dels articles de la carta seleccionats
function sumaPreu(element) {
    let afegit = element.classList.toggle("preuAfegit");
    let preuPlatEuro = element.getElementsByClassName("preuPlat")[0].textContent;
    preuPlatEuro=preuPlatEuro.slice(0,-2).replace(",",".");
    let preuPLat=parseFloat(preuPlatEuro);
    
    switch (afegit){
        case true:
            preuTotal+=preuPLat;
            break;
        case false:
            preuTotal-=preuPLat;
            break;
    }

    const contenidorPreu = document.getElementById("preuArticles");
    if (0.1>preuTotal && preuTotal>=0 || preuTotal<0){
        contenidorPreu.innerHTML="";
    }
    else {
        contenidorPreu.innerHTML=`<h3>PREU TOTAL: ${preuTotal.toFixed(2).replace(".",",")} €</h3>`;
    }
}

//Funció per validar el formulari
function validarFormulari (){
    document.querySelectorAll('.error').forEach(div => div.textContent = '');

    let valid = true;

    const nom = document.getElementById('nom').value.trim();
    const cognom = document.getElementById('cognom').value.trim();
    const persones = document.getElementById('persones').value;
    const email = document.getElementById('email').value.trim();
    const telefon = document.getElementById('telefon').value.trim();
    const hora = document.getElementById('hora').value;
    const data = document.getElementById('calendari').value;

    // Validar Nom
    if (nom === '') {
        document.getElementById('error-nom').textContent = 'El nom és obligatori.';
        valid = false;
    }

    // Validar Cognom
    if (cognom === '') {
        document.getElementById('error-cognom').textContent = 'El cognom és obligatori.';
        valid = false;
    }

    // Validar Nº Persones
    if (persones === '') {
        document.getElementById('error-persones').textContent = 'Selecciona el número de persones.';
        valid = false;
    }

    // Validar Email
    if (!validarEmail(email)) {
        document.getElementById('error-email').textContent = 'Introdueix un email vàlid.';
        valid = false;
    }

    // Validar Telèfon
    if (!validarTelefon(telefon)) {
        document.getElementById('error-telefon').textContent = 'Introdueix un telèfon vàlid (mínim 6 dígits).';
        valid = false;
    }

    // Validar Hora
    if (hora === '') {
        document.getElementById('error-hora').textContent = 'Selecciona una hora.';
        valid = false;
    }

    // Validar Data
    if (data === '') {
        document.getElementById('error-calendari').textContent = 'Selecciona una data.';
        valid = false;
    } else {
        const avui = new Date();
        const dataSeleccionada = new Date(data);
        avui.setHours(0,0,0,0);
        if (dataSeleccionada < avui) {
            document.getElementById('error-calendari').textContent = 'La data no pot ser anterior a avui.';
            valid = false;
        }
    }

    // Si tot es vàlid s'envia
    if (valid) {
        formulari.submit();
    }
}

// Funció auxiliar per validar email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Funció auxiliar per validar telefon (mínim 6 números)
function validarTelefon(telefon) {
    const regex = /^\d{6,}$/;
    return regex.test(telefon);
}

//Funció que habilita les opcions depenent del numero de comensals
function habilitarOpcions(rang) {
    Array.from(selectPersones.options).forEach(opt => {
        const val = parseInt(opt.value);
        if (!isNaN(val)) {
            opt.disabled = val < rang[0] || val > rang[1];
        }
    });
    selectPersones.value = ""; // reset al seleccionar taula
}

//Funció que habilita totes les opcions quan no tenim taula seleccionada 
function resetOpcions() {
    Array.from(selectPersones.options).forEach(opt => opt.disabled = false);
    selectPersones.value = "";
}

//Funció que al clicar la taula aquesta es torna vermella i crida a les funcions de control d'opcions
function clickTaula(taula, rangPersones, planolSVG) {

    taula.addEventListener("click", () => {
        // Comprovar si la taula ja estaba seleccionada
        const estavaSeleccionada = taula.getAttribute("data-selected") === "true";

        // Deselecciona totes les taules, tornar a color original i marcar com no seleccionada
        const totesLesTaules = planolSVG.querySelectorAll(".taulaQuadrada, .taulaRodona, .taulaRectangular");
        totesLesTaules.forEach(taula => {
            taula.setAttribute("fill", "#f2e8cf"); 
            taula.setAttribute("data-selected", "false"); // marcar com no seleccionada
        });

        if (!estavaSeleccionada) {
            // Si la taula no estava seleccionada, la seleccionem
            taula.setAttribute("fill", "#8b2e2e");
            taula.setAttribute("data-selected", "true");

            // Habilitar less opcions de número de persones segons la capacitat d'aquesta taula
            habilitarOpcions(rangPersones);
        } else {
            // Si la taula estava seleccionada, deseleccionem tot i habilitem les opcions
            resetOpcions();
        }
    });
}
//#endregion