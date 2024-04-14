document.addEventListener("DOMContentLoaded", function() {
    // Attach event listener to the "Calculate Cost" button
    const calculateButton = document.getElementById("calculate");
    calculateButton.addEventListener("click", calculateCost);
});

function calculateCost() {
    // Get the selected filament type and model weight from the form
    const filamentCost = parseFloat(document.getElementById("cost").value);
    const modelWeight = parseFloat(document.getElementById("weight").value);

    // Check if either field is empty or not a number
    if (isNaN(filamentCost) || isNaN(modelWeight)) {
        alert("Please fill in all fields with valid numbers.");
        return;
    }

    // Calculate the total cost
    const totalCost = (filamentCost / 1000) * modelWeight;

    // Create or update the result div
    let resultDiv = document.getElementById("result");
    if (!resultDiv) {
        resultDiv = document.createElement("div");
        resultDiv.id = "result";
        document.body.appendChild(resultDiv);
    }
    resultDiv.textContent = `Filament Cost: $${totalCost.toFixed(2)}`;
}
