function downloadCSV() {
    // Convert the filamentData array to CSV format
    let csvContent = "color,brand,material,remaining,temperature,loaded\n"; // Header

    filamentData.forEach(item => {
        csvContent += 
            `${item.color},${item.brand},${item.material},${item.remaining},${item.temperature},${item.loaded}\n`;
    });

    // Create a Blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    // Create a download link and trigger the download
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "filament_data.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}