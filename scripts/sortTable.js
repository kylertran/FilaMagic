let sortDirection = {};  // Object to keep track of sort direction for each column

document.addEventListener("DOMContentLoaded", function() {
  // Add sorting functionality
  const headers = document.querySelectorAll("#filaTable th");
  headers.forEach((header, index) => {
    header.classList.add("sortable");
    header.addEventListener("click", () => {
      sortTable(index);
      updateSortIcon(header, index);
    });
  });
});

function sortTable(columnIndex) {
  const table = document.getElementById("filaTable");
  const rows = Array.from(table.rows).slice(1); // Exclude header

  // Toggle sort direction
  sortDirection[columnIndex] = !sortDirection[columnIndex];

  const sortedRows = rows.sort((a, b) => {
    let cellA = a.cells[columnIndex].textContent.trim();
    let cellB = b.cells[columnIndex].textContent.trim();

    // For numerical sorting
    if (!isNaN(cellA) && !isNaN(cellB)) {
      return (parseFloat(cellA) - parseFloat(cellB)) * (sortDirection[columnIndex] ? 1 : -1);
    }

    // For alphabetical sorting
    return cellA.localeCompare(cellB) * (sortDirection[columnIndex] ? 1 : -1);
  });

  // Clear existing rows
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  // Append sorted rows
  sortedRows.forEach(row => table.appendChild(row));
}

function updateSortIcon(clickedHeader, clickedIndex) {
    const headers = document.querySelectorAll("#filaTable th");
    headers.forEach((header, index) => {
      const img = header.querySelector('.sort-icon');
      header.classList.remove('show-icon');  // Remove the show-icon class from all headers
      if (index === clickedIndex) {
        if (sortDirection[clickedIndex] == null) {
          img.src = 'images/sort-initial.png';
        } else {
          img.src = sortDirection[clickedIndex] ? 'images/sort-up.png' : 'images/sort-down.png';
          header.classList.add('show-icon');  // Add the show-icon class to the clicked header
        }
      } else {
        img.src = 'images/sort-initial.png';
        sortDirection[index] = null;  // Reset sort direction for other columns
        header.classList.add('hover-icon');  // Add the hover-icon class to all other headers
      }
    });
  }
  