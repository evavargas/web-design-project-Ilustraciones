let lugaresInfo = [];
const getLugares = () => {
    fetch('../internacional.json')
        .then(response => response.json())
        .then(data => {
            data.lugares.forEach(lugar => {
                let lugarInfo = {
                    posicion: { lat: lugar.centroide.lat, lng: lugar.centroide.lon },
                    nombre: lugar.nombre
                }
                lugaresInfo.push(lugarInfo)
            })
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(usuarioUbicacion => {
                    let ubicacion = {
                        lat: usuarioUbicacion.coords.latitude,
                        lng: usuarioUbicacion.coords.longitude
                    }
                    initMap(ubicacion)
                })
            }
        })
}
function initMap(obj){
    let mapa = new google.maps.Map(document.getElementById('map-otros'), {
        center: obj,
        zoom: 2
    })
    let marcadorUsuario = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    })
    marcadorUsuario.setMap(mapa)
    let marcadores = lugaresInfo.map(lugar => {
        return new google.maps.Marker({
            position: lugar.posicion,
            title: lugar.nombre,
            map: mapa
        })
    })
}
getLugares()