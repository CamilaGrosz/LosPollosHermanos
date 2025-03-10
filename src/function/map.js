function initMap() {
    const location = { lat: 40.41892317143922, lng: -3.689120003462982 }; 
    const map = new google.maps.Map(document.getElementById("map"), {
        center: location,
        zoom: 17,
        mapId: "e3fbc1a88715e2e0", 
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: "Los Pollos Hermanos - Madrid",
    });
}

window.initMap = initMap; 
initMap()
