document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM loaded");

    // Retrieve filamentData from localStorage or initialize an empty array if not found
    const filamentData = JSON.parse(localStorage.getItem('filamentData')) || [];

    // Create pie charts using the filamentData array
    createPieCharts(filamentData);
});

function createPieCharts(dataArray) {
    // Initialize data objects
    const filamentRemaining = {};
    const brands = {};
    const materials = {};

    // Collect data from the filamentData array
    dataArray.forEach(filament => {
        const color = filament.color;
        const brand = filament.brand;
        const material = filament.material;
        const remaining = filament.remaining;

        filamentRemaining[color] = parseFloat(remaining.replace('g', '')) || 0;
        brands[brand] = (brands[brand] || 0) + 1;
        materials[material] = (materials[material] || 0) + 1;  // Counting occurrences of each material
    });

    // Create pie charts
    createPieChart("filamentRemainingChart", "Filament Remaining", filamentRemaining, dataArray);
    createPieChart("brandsChart", "Total Spools", brands, dataArray);
    createPieChart("materialsChart", "Total Materials", materials, dataArray);
}

function createPieChart(canvasId, label, data, dataArray) {
    const canvas = document.getElementById(canvasId);
    const parentContainer = canvas.parentElement; // Get the parent container of the canvas

    // Create and add a header element
    const header = document.createElement("h3");
    header.className = "chart-header";
    
    let backgroundColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#8A89A6']; // Default colors

    if (canvasId === "filamentRemainingChart") {
        const totalWeight = Object.values(data).reduce((a, b) => a + b, 0);
        const weightText = totalWeight > 1000 ? `${(totalWeight / 1000).toFixed(2)}kg` : `${totalWeight}g`;
        header.textContent = `${label}: ${weightText}`;

        // Set the backgroundColor array to the filament colors
        backgroundColors = Object.keys(data);
    } else if (canvasId === "brandsChart") {
        header.textContent = `${label}: ${dataArray.length}`;  // Total number of filaments
    } else if (canvasId === "materialsChart") {
        header.textContent = `${label}: ${Object.keys(data).length}`; // Total unique materials
    }

    // Insert the header before the canvas in its parent container
    parentContainer.insertBefore(header, canvas);

    // Create the pie chart
    new Chart(canvas, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                label: label,
                data: Object.values(data),
                backgroundColor: backgroundColors
            }]
        }
    });
}