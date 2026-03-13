//Carregar el google chart
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(afegirTreure);

//El numero d'entrants, pizzes i postres;
let numEntrants=0;
let numPizzes=0;
let numPostres=0;

//Agafem els entrants, pizzes i postres del document.
const articleEntrant = document.querySelectorAll("#entrants li");
const articlePizza = document.querySelectorAll("#pizzes li");
const articlePostre = document.querySelectorAll("#postres li");
const grafic = document.getElementById("piechart");

//Funció per sumar o restar el numero d'articles

//Quan cliquem l'article mirem si té la classe selected i actualitzem la variable. Finalment cridem a drawChart()
function afegirTreure() {

    //Entrants
    articleEntrant.forEach(article => {
        article.addEventListener("click", () => {
            const selected = article.classList.toggle("selected");
            if (selected) {
                numEntrants += 1;
            } else {
                numEntrants -= 1;
            }
            drawChart();
        });
    });

    //Pizzes
    articlePizza.forEach(article => {
        article.addEventListener("click", () => {
            const selected = article.classList.toggle("selected");
            if (selected) {
                numPizzes += 1;
            } else {
                numPizzes -= 1;
            }
            drawChart();
        });
    });

    //Postres
    articlePostre.forEach(article => {
        article.addEventListener("click", () => {
            const selected = article.classList.toggle("selected");
            if (selected) {
                numPostres += 1;
            } else {
                numPostres -= 1;
            }
            drawChart();
        });
    });

    drawChart();
}

//Funció per dibuixar el pie chart
function drawChart() {

    if (numEntrants + numPizzes + numPostres === 0) {
        grafic.style.display = "none"; //Si no tenim cap article seleccionat, amaguem el grafic.
    } else {
        grafic.style.display = "block"; //Si tenim algun article, el mostrem.
    }
   
    //Les dades del chart
    var data = google.visualization.arrayToDataTable([
        ['TipusArticle', 'Quantitat'],
        ['ENTRANTS',     numEntrants],
        ['PIZZES',      numPizzes],
        ['POSTRES',  numPostres]
    ]);

    //L'estil del chart
    var options = {
        backgroundColor: 'transparent',
        color: 'black',
        chartArea: { left: 20, top: 50, width: '90%', height: '75%' },
        title: 'TIPUS D\'ARTICLES',
        pieHole: 0.2,
        slices: {
        0: { color: '#5a7d4f' },
        1: { color: '#c97f2f' },
        2: { color: '#a23a4f' }
        },
        pieSliceTextStyle: {
        color: 'black',
        fontSize: 14,
        bold: true
        }
    };

    //Guardem el pie chart en una variable
    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    //Dibuixem el pie chart amb les dades i opcions
    chart.draw(data, options);
};