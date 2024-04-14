function addData() {
  // Fetch the CSV data
  fetch('data.csv')
    .then(response => response.text())
    .then(data => populateTable(data));
};

function populateTable(csvData) {
  const tableBody = document.getElementById('filaTable').getElementsByTagName('tbody')[0];

  // Split the CSV data into lines
  const lines = csvData.trim().split('\n');
  // Skip the header line
  for (let i = 1; i < lines.length; i++) {
      const row = tableBody.insertRow();

      // Split each line into its columns
      const columns = lines[i].split(',');

      // Loop through each column and add it to the table
      for (let j = 0; j < columns.length; j++) {
          const cell = row.insertCell();

          // If it's the first column (color), set the background color
          if (j === 0) {
              cell.style.backgroundColor = columns[j];
          } else {
              cell.appendChild(document.createTextNode(columns[j]));
          }
      }
  }
}