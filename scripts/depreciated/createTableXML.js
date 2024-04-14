function addData() {
    // Fetch the XML data
    fetch('data.xml')
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => populateTable(data));
    };
  
  function populateTable(xmlData) {
    const tableBody = document.getElementById('filaTable').getElementsByTagName('tbody')[0];
    
    // Loop through each slicer in the XML data
    const filaments = xmlData.getElementsByTagName('filament');
    for (let i = 0; i < filaments.length; i++) {
      const row = tableBody.insertRow();
      
      // Insert cells and populate them
      const cellNames = ['color', 'brand', 'material', 'remaining', 'temperature', 'loaded'];
      for (let j = 0; j < cellNames.length; j++) {
        const cell = row.insertCell();
        const text = filaments[i].getElementsByTagName(cellNames[j])[0].textContent;
        cell.appendChild(document.createTextNode(text));
      }
    }
  }