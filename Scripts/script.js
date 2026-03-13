//#region Obtenció d'elements del DOM globals
const botons = document.querySelectorAll(".botons a"); //Botons de Reserva
const botonsEnviar = document.querySelectorAll(".botoEnviar"); //Botons enviar formulari
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
const hamburgers = document.querySelectorAll(".navHamburger"); //Icona hamburger
const navOverlay = document.querySelector(".navOverlay"); //Overlay menú navegador
const navLinks = navOverlay.querySelectorAll("a"); //Links de l'overlay
const botoTencar = navOverlay.querySelectorAll(".botoX"); //Botó de tencar de l'overlay
const botoEnrera = document.querySelectorAll(".botoTornar"); //Botó de tornar enrera
const articleCarta = document.querySelectorAll(".laCarta li"); //Tots els articles de la carta
const formulari = document.querySelector('.formulariGrups'); //Formularis 
const gracies = document.querySelector(".graciesOverlay"); //Body de la pàgina gracies.html
const planolRestaurant = document.getElementById("planolRestaurant"); //Planol del restaurant
const selectPersones = document.getElementById("persones"); //Select del numero de persones
//#endregion

//#region Variables let globals
let indexActual = 0; //Per saber a quin index de imatge de la galeria ens trobem
let autoSlide; //Creem l'AutoSlide per poder usarlo quan cliquem les imatges
let preuTotal = 0; //Variable que obté el preu total dels articles seleccionats
//#endregion

//#region Esdeveniments
//Esdeveniments per quan fem hover a un boto de reserves
botons.forEach(boto => { //Fem un foreach per recorrer tota la coleccio
    //Quan el mouse entra al boto
    boto.addEventListener("mouseenter", () =>{
        escalarContingut(boto,1.1);
        boto.style.color="#f2e8cf";
    });
    //Quan surt del boto
    boto.addEventListener("mouseleave", () =>{
        escalarContingut(boto,1);
        boto.style.color="black";
    });
});
//Esdeveniments per quan fem hover a un boto d'enviar formulari
botonsEnviar.forEach(boto => { //Fem un foreach per recorrer tota la coleccio
    //Quan el mouse entra al boto
    boto.addEventListener("mouseenter", () =>{
        escalarContingut(boto,1.05);
        boto.style.backgroundColor="#5a7d4f";
    });
    //Quan surt del boto
    boto.addEventListener("mouseleave", () =>{
        escalarContingut(boto,1);
        boto.style.backgroundColor="#8b2e2e";
    });
});
articleCarta.forEach(article => { //Fem un foreach per recorrer tota la coleccio
    //Escalar l'article
    article.addEventListener("mouseenter", () =>{
        escalarContingut(article,1.05);
    });
    article.addEventListener("mouseleave", () =>{
        escalarContingut(article,1);
    });

    //Sumar o restar el preu de l'article
    article.addEventListener("click", () =>{
        sumaPreu(article);
    });
});
//Esdeveniment per quan fem hover a una seccio
seccionsInformacio.forEach(seccio => { //Fem un foreach per recorrer tota la coleccio
    //Escalar la secció
    seccio.addEventListener("mouseenter", () =>{
        escalarContingut(seccio,1.1);
    });
    seccio.addEventListener("mouseleave", () =>{
        escalarContingut(seccio,1);
    });
});
//Esdeveniments per diferents accions de la galeria
imatges.forEach((imatge, index) => { //Fem un foreach per recorrer tota la coleccio
    //Escalar l'imatge
    imatge.addEventListener("mouseenter", () =>{
        escalarContingut(imatge,1.03);
    });
    imatge.addEventListener("mouseleave", () =>{
        escalarContingut(imatge,1);
    });

    //Obrim la imatge en mode gran
    imatge.addEventListener("click", function(){
        emplenaLightbox(index);
    });
});
//Esdeveniment per tancar el lightbox al fer-li clic si existeix a la pàgina
if (lightbox){
    lightbox.addEventListener("click", function(e) {
        if (e.target===lightbox){ 
            esborraLightbox();
        }
    });
}
//Esdeveniment per tancar el lightbox al clicar Escape si existeix a la pàgina
if (lightbox){
    document.addEventListener("keydown", function(e) {
        if (lightbox.style.display==="flex"&&e.key==="Escape"){ 
            esborraLightbox();
        }
    });
}
//Quan carreguem la pàgina comprovar si teniem el lightbox obert
document.addEventListener("DOMContentLoaded", function(){

    const guardada = localStorage.getItem("pizzaActual");
    const lightboxObert = localStorage.getItem("lightboxObert");

    if(guardada !== null){ 
        indexActual = parseInt(guardada); //Guardem l'index de la pizza guardada
    }

    if(lightboxObert === "true"){ //"Recuperem" l'estat guardat del lightbox
        //L'emplenem amb l'index de la pizza guardada
        emplenaLightbox(indexActual);
    }

});
//Esdeveniment fer clic al hamburger i obrir el menu
hamburgers.forEach(hamburger => {

    hamburger.addEventListener("click", () => { //Clic al hamburger
        toggleMenu();
    });

    //Canviar el color al fer hover
    hamburger.addEventListener("mouseenter", ()=>{
        const barres = document.querySelectorAll(".navHamburger span");
        for (let i=0;i<barres.length;i++){
            barres[i].style.background="#c9a227";
        }
    });

    hamburger.addEventListener("mouseleave", ()=>{
        const barres = document.querySelectorAll(".navHamburger span");
        for (let i=0;i<barres.length;i++){
            barres[i].style.background="black";
        }
    });
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
document.addEventListener("keydown", function(e) {
    //Si l'overlay està actiu i la tecla entrada es l'escape el tanquem
    if (navOverlay.classList.contains("actiu") && e.key === "Escape") {
        toggleMenu();
    }
});
//Esdeveniment quan fem clic al boto, tornem una pagina enrera a l'historial. Ús del BOM
botoEnrera.forEach(boto =>{
    boto.addEventListener("click", ()=>{
        //Si la pagina anterior era la de enviament formulari, anem 2 enrera
        if(sessionStorage.getItem("paginaAnterior").includes("Gracies")){
            history.go(-2);
        }
        //Si no ho era comportament normal
        else{
            history.go(-1);
            sessionStorage.setItem("paginaAnterior", window.location.href);
        }
    });
});
//Esdeveniment per comprovar si formulari està validat. Aquest esdeveniment s'activa quan cliquem el button "Enviar" que fa el submit
if (formulari){
    formulari.addEventListener('submit', function(e) {
        //Per defecte no enviem el formulari i esperem a validarlo
        e.preventDefault(); 
        validarFormulari();
    });
}
//Esdeveniment per comprovar si estem a la pàgina de gracies.html i redirigir a inici.html depres de 5 segons
if(gracies){
    document.addEventListener("DOMContentLoaded", function () {

        //Guardem al sessionStorage el link de la pàgina per tal d'evitar poder accedir-hi amb el boto de tornar enrera
        sessionStorage.setItem("paginaAnterior", window.location.href);
        //Esperar 10 segons per executar la instrucció
        setTimeout(function () {
            window.location.href = "Inici.html";
        }, 10000);
    });
}
//Esdeveniment que carrega el planol, obté totes les taules i crida a les funcions. Només s'executa si existeix a la pàgina actual. Sino peta
if (planolRestaurant){
    planolRestaurant.addEventListener("load", () => {
        const planolSVG = planolRestaurant.contentDocument; //.contentDocument obre l'object i permet accedir a les dades del SVG

        const taulesQuadrades = planolSVG.querySelectorAll(".taulaQuadrada"); //Array taules quadrades
        const taulesRodones = planolSVG.querySelectorAll(".taulaRodona"); //Array taules rodones
        const taulesRectangulars = planolSVG.querySelectorAll(".taulaRectangular"); //Array taules rectangulars

        // Assignar rang a cada tipus de taula i crida la funció click taula
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
}    
//Funció que emplena el lightbox dinàmicament
function emplenaLightbox(index){

    //Ens guardem l'index de la pizza per poder modificar-lo
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
        seguentPizza(); //Anem a la seguent pizza
        carrusel(); //Reset al timer del carrusel
    });

    fletxaEsq.addEventListener("click", function(e){
        anteriorPizza(); //Anem a l'anterior pizza
        carrusel(); //Reset timer del carrusel
    });

    //Control accions teclat (fletxetes)
    document.addEventListener("keydown", controlTeclat);

    //Autoslide de les imatges
    carrusel();

    //guardar estat del lightbox a obert
    localStorage.setItem("lightboxObert","true");

}
//Funció per esborrar el lightbox
function esborraLightbox(){

    //Esborrem les imatges
    const img = lightbox.querySelector("img");
    lightbox.removeChild(img);

    //Esborrem les fletxes
    const fletxes = lightbox.querySelectorAll("span");

    fletxes.forEach(fletxa => {
        lightbox.removeChild(fletxa);
    });

    //Ocultem el lightbox
    lightbox.style.display = "none";

    //Reset del timer
    clearInterval(autoSlide);

    //Esborrem l'event listener 
    document.removeEventListener("keydown", controlTeclat);

    //Guardem l'estat del lightbox a tancat
    localStorage.setItem("lightboxObert","false");
}

//Funció que mostra la imatge de la pizza depenent de l'index entrat
function mostrarPizza(index) {
    indexActual = index;
    const imgGran = lightbox.querySelector("img");

    //Accedim a l'array d'imatges grans
    imgGran.src = pizzes[indexActual].src; //Ubicació de la imatge
    imgGran.alt = pizzes[indexActual].alt; //Nom per si no carrega
    
    //Guardem l'index actual al local storage
    localStorage.setItem("pizzaActual", indexActual); //Guardem l'index al localStorage
}

//Funció de moure carrusel amb les fletxes del teclat
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
    if(indexActual >= pizzes.length) indexActual = 0; //Si arribem a l'ultima pizza, la seguent serà la primera
    mostrarPizza(indexActual);
}

//Funció que mostra la imatge anterior
function anteriorPizza() {
    indexActual--;
    if(indexActual < 0) indexActual = pizzes.length - 1; //Si arribem a la primera pizza, la seguent sera l'ultima
    mostrarPizza(indexActual);
}

//Funció per resetejar el timer de l'AutoSlide i iniciar-lo
function carrusel() {
    clearInterval(autoSlide);
    //Canviem de pizza cada 3 segons
    autoSlide = setInterval(() => {seguentPizza();}, 3000);
}

//Funció que mostra o oculta el menú navegador overlay
function toggleMenu() {
    //Toggle
    navOverlay.classList.toggle("actiu"); //Aquesta classe fa un display:flex
}

//Funció que mostra el preu total dels articles de la carta seleccionats
function sumaPreu(element) {
    //Mirem si la classe està afegida o no i guardem l'estat. Si la tenim=true, si no=false
    let afegit = element.classList.toggle("preuAfegit");
    //El text de l'article ex: 12,90 €
    let preuPlatEuro = element.getElementsByClassName("preuPlat")[0].textContent;
    //Eliminar " €" i canviar "," per "." pqerque es pugui fer un parseFloat
    preuPlatEuro=preuPlatEuro.slice(0,-2).replace(",",".");
    let preuPLat=parseFloat(preuPlatEuro);
    
    //Si tenim la classe sumem el preu de l'article al preu total
    //Si no tenim la classe, restem el preu al total
    switch (afegit){
        case true:
            preuTotal+=preuPLat;
            break;
        case false:
            preuTotal-=preuPLat;
            break;
    }

    //El contenidor on mostrarem el preu total dels articles seleccionats
    const contenidorPreu = document.getElementById("preuArticles");
    //Si es negatiu o entre 0 i 0.1 no escriurem res.
    if (0.1>preuTotal && preuTotal>=0 || preuTotal<0){
        contenidorPreu.innerHTML="";
    }
    //Si el preu total es mes gran que 0.1 mostrem el missatge
    else {
        contenidorPreu.innerHTML=`<h3>PREU TOTAL: ${preuTotal.toFixed(2).replace(".",",")} €</h3>`;
    }
}

//Funció per validar el formulari
function validarFormulari (){

    //Agafem tots els div error i els deixem en blanc
    document.querySelectorAll('.error').forEach(div => div.textContent = '');

    let valid = true;

    //Agafem els select i input per poder validar-los
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

    // Validar Email. Si retorna false: error
    if (!validarEmail(email)) {
        document.getElementById('error-email').textContent = 'Introdueix un email vàlid.';
        valid = false;
    }

    // Validar Telèfon. Si retorna false: error
    if (!validarTelefon(telefon)) {
        document.getElementById('error-telefon').textContent = 'Introdueix un telèfon vàlid (mínim 6 dígits).';
        valid = false;
    }

    // Validar Hora
    if (hora === '') {
        document.getElementById('error-hora').textContent = 'Selecciona una hora.';
        valid = false;
    }

    // Validar Data, si no esta seleccionada: error
    if (data === '') {
        document.getElementById('error-calendari').textContent = 'Selecciona una data.';
        valid = false;
    } 
    //Mirem si la data seleccionada es anterior a avui, si ho es: error
    else {
        const avui = new Date();
        const dataSeleccionada = new Date(data);
        avui.setHours(0,0,0,0);
        if (dataSeleccionada < avui) {
            document.getElementById('error-calendari').textContent = 'La data no pot ser anterior a avui.';
            valid = false;
        }
    }

    // Si tot es vàlid s'envia el formulari. Simulem que s'envia redirigint-nos a pagina de gracies
    if (valid) {
        //formulari.submit(); Si tenim base de dades l'enviariem
        window.location.href = "Gracies.html";
    }
}

// Funció per validar email usant regex per validar correu. Fem un return booleà 
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Funció per validar telefon usant regex (mínim 6 números). Fem un return booleà 
function validarTelefon(telefon) {
    const regex = /^\d{6,}$/;
    return regex.test(telefon);
}

//Funció que habilita les opcions depenent del numero de comensals
function habilitarOpcions(rang) {
    //Funció per recorrer l'array del selectPersones i deshabilitar o habilitar opcions
    Array.from(selectPersones.options).forEach(opcio => {
        const valor = parseInt(opcio.value);

        //Deshabilitem les mes petites que el minim i les mes grans que el maxim
        opcio.disabled = valor < rang[0] || valor > rang[1];
    });
    selectPersones.value = ""; // reset al seleccionar taula
}

//Funció que habilita totes les opcions quan no tenim taula seleccionada 
function resetOpcions() {
    Array.from(selectPersones.options).forEach(opt => opt.disabled = false);
    selectPersones.value = "";
}

//Funció que al clicar la taula aquesta es torna vermella i crida a les funcions de control d'opcions. 
//En aquest cas la funció és cridada per tots 3 tipus de taula quan es carrega el SVG.
function clickTaula(taula, rangPersones, planolSVG) {

    //Executem la funció quan es fa clic a una taula
    taula.addEventListener("click", () => {
        // Comprovar si la taula ja estaba seleccionada
        const estavaSeleccionada = taula.getAttribute("data-selected") === "true";

        // Deselecciona totes les taules, tornar a color original i marcar com no seleccionada
        const totesLesTaules = planolSVG.querySelectorAll(".taulaQuadrada, .taulaRodona, .taulaRectangular");
        totesLesTaules.forEach(taula => {
            taula.setAttribute("fill", "#f2e8cf"); 
            taula.setAttribute("data-selected", "false"); // marcar com no seleccionada
        });

        // Si la taula no estava seleccionada, la seleccionem, li posem color i habilitem opcions
        if (!estavaSeleccionada) {
            taula.setAttribute("fill", "#8b2e2e");
            taula.setAttribute("data-selected", "true");

            // Habilitar les opcions de número de persones segons la capacitat d'aquesta taula
            habilitarOpcions(rangPersones);
        } 
        // Si la taula estava seleccionada, deseleccionem la taula i habilitem les opcions
        else {
            resetOpcions();
        }
    });
}
//#endregion