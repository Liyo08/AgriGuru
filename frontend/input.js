document.getElementById("agriForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // prevent page reload

  const location = document.getElementById("location").value.trim();
  const soil = document.getElementById("soil").value.trim();
  const season = document.getElementById("season").value.trim();

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        location: location,
        soil: soil,
        season: season
      })
    });

    if (!response.ok) {
      throw new Error("Failed to fetch crop recommendation");
    }

    const data = await response.json();

    document.getElementById("output").innerHTML = `
       🌿Based on your input, we recommend growing: <strong>${data.predicted_crop}</strong><br><br>

      
    `;
  } catch (error) {
    const output = document.getElementById("output");
    output.innerHTML = ` Error getting crop recommendation.<br>${error.message}`;
    console.error(" JavaScript Fetch Error:", error);
  }
});