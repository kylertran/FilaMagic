// Assuming the addData and other related functions are already defined...

function addDataFromCSV() {
    // Fetch the CSV data
    fetch('data/random.csv')
        .then(response => response.text())
        .then(csvData => {
            // Split the CSV data into lines
            const lines = csvData.trim().split('\n');
            
            // Skip the header line and loop through the rest
            for (let i = 1; i < lines.length; i++) {
                // Split each line into its columns
                const columns = lines[i].split(',');

                // Call the addData method with the parsed values
                addData(columns[0], columns[1], columns[2], columns[3], columns[4], columns[5]);
            }
        });
}