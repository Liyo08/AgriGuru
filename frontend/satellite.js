// satellite.js
const apiKey = '4f4333e225e37f4e826ee7ee1d3afc80';


const map = L.map('map').setView([20.5937, 78.9629], 5); // India center

// Base OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '© OpenStreetMap contributors',
maxZoom: 18
}).addTo(map);

// NDVI tile layer via SentinelHub demo (no bbox needed)
const ndviLayer = L.tileLayer(
'https://services.sentinel-hub.com/ogc/wms/1cd15ba8-6c92-4c88-8a6e-486c5df6f168?SERVICE=WMS&REQUEST=GetMap&VERSION=1.1.1&LAYERS=NDVI&STYLES=&FORMAT=image/png&TRANSPARENT=true&SRS=EPSG:3857&BBOX={bbox-epsg-3857}&WIDTH=256&HEIGHT=256',
{
attribution: 'NDVI data © Sentinel Hub (demo)',
opacity: 0.6
}
);

// Rainfall overlay from OpenWeatherMap (needs your API key)
const rainfallLayer = L.tileLayer(
`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${OPENWEATHERMAP_KEY}`,
{
attribution: 'Rainfall © OpenWeatherMap',
opacity: 0.6
}
);

// Set default layer
let currentLayer = ndviLayer;
currentLayer.addTo(map);

// Listen for dropdown changes
const layerSelector = document.getElementById('layerSelector');

layerSelector.addEventListener('change', () => {
if (currentLayer) map.removeLayer(currentLayer);

const selected = layerSelector.value;

if (selected === 'ndvi') {
currentLayer = ndviLayer;
} else if (selected === 'rainfall') {
currentLayer = rainfallLayer;
}

currentLayer.addTo(map);
});