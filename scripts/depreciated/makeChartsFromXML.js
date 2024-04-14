document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");

    // Fetch the XML data
    fetch('data.xml')
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        createPieCharts(data);  // Create pie charts
      });
});

function createPieCharts(xmlData) {
    // Initialize data objects
    const filamentRemaining = {};
    const brands = {};
    const materials = {};

    // Collect data from the XML
    const filaments = xmlData.getElementsByTagName('filament');
    for (let i = 0; i < filaments.length; i++) {
        const filament = filaments[i];
        const color = filament.getElementsByTagName('color')[0].textContent;
        const brand = filament.getElementsByTagName('brand')[0].textContent;
        const material = filament.getElementsByTagName('material')[0].textContent;
        const remaining = filament.getElementsByTagName('remaining')[0].textContent;

        filamentRemaining[color] = parseFloat(remaining.replace('g', '')) || 0;
        brands[brand] = (brands[brand] || 0) + 1;
        materials[material] = (materials[material] || 0) + 1;
    }

    // Create pie charts
    createPieChart("filamentRemainingChart", "Filament Remaining", filamentRemaining);
    createPieChart("brandsChart", "Total Spools", brands);
    createPieChart("materialsChart", "Total Materials", materials);
}

function createPieChart(canvasId, label, data) {
    const canvas = document.getElementById(canvasId);
    const mainContainer = document.getElementById("main-container"); // Assuming your main container has an id of "main-container"

    // Create and add a header element
    const header = document.createElement("h3");
    header.className = "chart-header";
    header.textContent = `${label}: ${Object.values(data).reduce((a, b) => a + b, 0)}`;
    mainContainer.appendChild(header);

    // Create the pie chart
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: label,
                data: Object.values(data),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#8A89A6']
            }]
        }
    });
}
