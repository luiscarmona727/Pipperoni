google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(afegirTreure);

let numEntrants=0;
let numPizzes=0;
let numPostres=0;
const articleEntrant = document.querySelectorAll("#entrants li");
const articlePizza = document.querySelectorAll("#pizzes li");
const articlePostre = document.querySelectorAll("#postres li");
const grafic = document.getElementById("piechart");

function afegirTreure() {
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


function drawChart() {

     if (numEntrants + numPizzes + numPostres === 0) {
        grafic.style.display = "none"; // ocultar
        return; // salir de la función, no dibujar gráfico
    } else {
        grafic.style.display = "block"; // mostrar
    }
   
    var data = google.visualization.arrayToDataTable([
        ['TipusArticle', 'Quantitat'],
        ['ENTRANTS',     numEntrants],
        ['PIZZES',      numPizzes],
        ['POSTRES',  numPostres]
    ]);

    var options = {
        backgroundColor: 'transparent',
        color: 'black',
        chartArea: { left: 20, top: 50, width: '90%', height: '75%' },
        title: 'TIPUS D\'ARTICLES',
        pieHole: 0.3,
        slices: {
        0: { color: '#5a7d4f' },
        1: { color: '#c97f2f' },
        2: { color: '#a23a4f' }
        },
        pieSliceTextStyle: {
        color: 'black',
        fontSize: 14,
        bold: true
    },
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
}