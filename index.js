let map = L.map('map').setView([51.505, -0.09], 7);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 26,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
let myIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize:     [34, 50], 
    iconAnchor:   [25, 50],
});
let marker = L.marker([50.8229402, -0.1362672], {icon: myIcon}).addTo(map)
const ipText = document.getElementById('ip-add');
const locationText = document.getElementById('location');
const timeZone = document.getElementById('timezone');
const ispText = document.getElementById('isp');
const inputField = document.getElementById('address');
let ip = null;
const formEl = document.getElementById('enterR')
const api_key = 'at_gGVTgZoMD4nBI6nmt56sgiyi9ZYKQ';

async function userIP(){
    let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
    const response = await fetch('https://www.cloudflare.com/cdn-cgi/trace');
    const parResult = await response.text();
    ip = parResult.match(ipRegex)[0];
    return ip
}

window.addEventListener('load', ()=>{
    getAddress(ip)
})

async function getAddress(url){
    const result = await fetch(`https://geo.ipify.org/api/v2/country?apiKey=${api_key}&ipAddress=${inputField.value}`);
    const parseResult = await result.json();
    ipText.textContent = parseResult.ip;
    locationText.textContent = `${parseResult.location.region}, ${parseResult.as.name} ${parseResult.as.asn}`;
    ispText.textContent = parseResult.isp;
    timeZone.textContent = parseResult.location.timezone;
}


formEl.addEventListener('click', getAddress)