$(function() {
    //init_map();
    /*
    $("#thailand_map").vectorMap({
        map: "th_mill",
        backgroundColor: "transparent",
        regionStyle: {
            initial: {
                fill: "#e3eaef"
            }
        },
        markerStyle: {
            initial: {
                "r": 9,
                "fill": window.theme.primary,
                "fill-opacity": .9,
                "stroke": "#fff",
                "stroke-width": 7,
                "stroke-opacity": .4
            },
            hover: {
                "stroke": "#fff",
                "fill-opacity": 1,
                "stroke-width": 1.5
            }
        },
        markers: [
            {latLng: [15.082036, 101.566027], name: 'สมเกียรติ'},
            {latLng: [15.085249, 101.556629], name: 'สายยัน'}
        ]
    });
    let mapObj = $('#thailand_map').vectorMap('get', 'mapObject');
    mapObj.setFocus({
        "region": "TH-30",
        "animate": true
    });
    */

    $("#datatables-dashboard-projects").DataTable({
        pageLength: 6,
        lengthChange: false,
        bFilter: false,
        autoWidth: false
    });

    $("#datetimepicker-dashboard").datetimepicker({
        inline: true,
        sideBySide: false,
        format: "L"
    });
});

async function initMaps(){
    rai_location = await $.getJSON("./db/location.json",(js)=>{return js;});
    start_lat = start_lng = 0;
    $.each(rai_location,(idx,val) => {
        start_lat += val.location[0].lat;
        start_lng += val.location[0].lng;
    });
    start_lat /= rai_location.length;
    start_lng /= rai_location.length;
    let map = $("#hybrid_map").googleMap();
    map.initialize({
        zoom: 11,
        center: {"lat": start_lat, "lng": start_lng},
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true
    });
    $.each(rai_location,(idx,val) => {
        map.addPolygon({
            paths: val.location,
            strokeColor: '#d9534f',
            strokeOpacity: 0.9,
            strokeWeight: 2,
            fillColor: '#d9534f',
            fillOpacity: 0.2
        });
        lat = (val.location[0].lat + val.location[1].lat + val.location[2].lat + val.location[3].lat)/4;
        lng = (val.location[0].lng + val.location[1].lng + val.location[2].lng + val.location[3].lng)/4;
        let marker = map.addMarker({
            position: {"lat": lat,"lng": lng},
            title: val.title
        });
        marker.addListener('click', (e)=>{
            let infoWindow = new google.maps.InfoWindow;
            let content = val.title;
            infoWindow.setContent(content);
            infoWindow.setPosition(e.latLng);
            infoWindow.open(map.data("map"));
        });
    });
}