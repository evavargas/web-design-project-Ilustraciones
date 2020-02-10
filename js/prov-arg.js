//https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.2/download/provincias.json
var contenedor = document.getElementById('contenedor');
let provinciasInfo = [];
const getProvincias = () => {
    fetch('../provincias.json')
        .then(response => response.json())
        .then(data => {
            data.provincias.forEach(provincia => {
                let provInfo = {
                    posicion: { lat: provincia.centroide.lat, lng: provincia.centroide.lon },
                    nombre: provincia.nombre
                }
                provinciasInfo.push(provInfo)
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
            mostrarInfo(provinciasInfo)
        })
}
function initMap(obj) {
    let mapa = new google.maps.Map(document.getElementById('map-arg'), {
        center: obj,
        zoom: 4
    })
    let marcadorUsuario = new google.maps.Marker({
        position: obj,
        title: 'Tu ubicacion'
    })
    marcadorUsuario.setMap(mapa)
    let marcadores = provinciasInfo.map(provincia => {
        return new google.maps.Marker({
            position: provincia.posicion,
            title: provincia.nombre,
            map: mapa
        })
    })
}
function mostrarInfo(provinciasInfo) {
    provinciasInfo.map(provincia => {
        let ubicacion = document.createElement('p');
        ubicacion.innerHTML = (provincia.nombre);
        contenedor.appendChild(ubicacion);
    })
}
getProvincias()
