// Try to retrieve filamentData from localStorage or initialize an empty array if not found
let filamentData = JSON.parse(localStorage.getItem('filamentData')) || [];

document.getElementById('add-filament-form').addEventListener('submit', function(event) {
    // Prevent the form from submitting the traditional way
    event.preventDefault();

    // Retrieve the values from the form
    const color = document.getElementById('color').value;
    const brand = document.getElementById('brand').value;
    const material = document.getElementById('material').value;
    const remaining = document.getElementById('remaining').value + 'g'; // Append 'g' for grams
    const temperature = document.getElementById('temperature').value + 'c'; // Append 'c' for Celsius
    const loaded = document.getElementById('loaded').checked ? "Yes" : "No";

    filamentData.push({color, brand, material, remaining, temperature, loaded});
    localStorage.setItem('filamentData', JSON.stringify(filamentData));

    // Redirect the user to /filaments.html
    window.location.href = "/kylert2/filaments.html";
});