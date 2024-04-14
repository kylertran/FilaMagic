// Try to retrieve filamentData from localStorage or initialize an empty array if not found
let filamentData = JSON.parse(localStorage.getItem('filamentData')) || [];

function addData(color, brand, material, remaining, temperature, loaded) {
  // Add the new data to the filamentData array
  filamentData.push({color, brand, material, remaining, temperature, loaded});
  
  // Clear the table
  populateTable();
  
  // Save the updated filamentData array to localStorage
  localStorage.setItem('filamentData', JSON.stringify(filamentData));
}

function populateTable() {
    const tableBody = document.getElementById('filaTable').getElementsByTagName('tbody')[0];
    
    // Clear the existing rows
    tableBody.innerHTML = '';

    // Loop through the filamentData array and add each item to the table
    for (let i = 0; i < filamentData.length; i++) {
        const row = tableBody.insertRow();

        // Loop through each property of the filament data and add it to the table
        for (let key in filamentData[i]) {
            const cell = row.insertCell();

            // If the property is 'color', set the background color
            if (key === 'color') {
                cell.style.backgroundColor = filamentData[i][key];
            } else {
                cell.appendChild(document.createTextNode(filamentData[i][key]));
            }
        }
    }
}

// Populate the table with data from filamentData when the script is first loaded
populateTable();

function clearData() {
  // Clear the filamentData array
  filamentData = [];

  // Clear the table
  const tableBody = document.getElementById('filaTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = '';

  // Update the localStorage to reflect the empty state
  localStorage.setItem('filamentData', JSON.stringify(filamentData));
}