rai_data = [];

$(async function() {
    rai_data = await $.getJSON("./db/location.json",(js)=>{return js;});
    initMaps();
    //Reference: https://datatables.net/
    initTable();
});

async function initTable(){
    $("#rai_datatable").html("");
    $.each(rai_data,(i,data)=>{
        html = "";
        html += "<tr data-raiid=" + data.ID + ">";
        html += "<td><img src='img/avatars/avatar_temp.png' width='32' height='32' class='rounded-circle my-n1' alt='Avatar'></td>";
        html += "<td>" + data.title + "</td>";
        html += "<td>" + data.area.toString() + "</td>";
        html += "<td>" + data.muntype + "</td>";
        html += "<td><span class='badge badge-success'>ปกติ</span></td>";
        html += "</tr>";
        $("#rai_datatable").append(html);
    });
    let table = $("#datatables-clients").DataTable({
        responsive: true
    });
    $("#datatables-clients").addClass("clickable");
    $('#datatables-clients tbody').on('click', 'tr',function(){
        item = $(this)[0];
        selectItem($(item).data("raiid"));
    });
}

async function initDetailTable(id=0){
    id = parseInt(id);
    if(id==0){
        rai_detail = rai_data[0];
    }else{
        rai_detail = $.grep(rai_data, (element, index)=>{
            return element.ID==id;
        });
    }
    rai_detail = rai_detail[0];
    $("#rai_detailtable").html("");
    html = "";
    html += "<tr>";
    html += "<th width='30%'>ชื่อ</th>";
    html += "<td>" + rai_detail.title + "</td>";
    html += "<tr>";
    html += "<tr>";
    html += "<th>พื้นที่</th>";
    html += "<td>" + rai_detail.area + "</td>";
    html += "<tr>";
    html += "<tr>";
    html += "<th>ชนิดมัน</th>";
    html += "<td>" + rai_detail.muntype + "</td>";
    html += "<tr>";
    html += "<tr>";
    html += "<th>ชนิดดิน</th>";
    html += "<td>" + rai_detail.soiltype + "</td>";
    html += "<tr>";
    html += "<tr>";
    html += "<th>สถานะ</th>";
    html += "<td><span class='badge badge-success'>ปกติ</span></td>";
    html += "<tr>";
    $("#rai_detailtable").html(html);
}

async function initMaps(){
    rai_location = await $.getJSON("./db/location.json",(js)=>{return js;});
    start_lat = start_lng = 0;
    $.each(rai_location,(idx,val) => {
        start_lat += val.location[0].lat;
        start_lng += val.location[0].lng;
    });
    start_lat /= rai_location.length;
    start_lng /= rai_location.length;
    /*
    map = new google.maps.Map(document.getElementById("hybrid_map"), {
        zoom: 11,
        center: {"lat": start_lat, "lng": start_lng},
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
    });
    */
    let map = $("#hybrid_map").googleMap({
        zoom: 11,
        center: {"lat": start_lat, "lng": start_lng},
        mapTypeId: google.maps.MapTypeId.HYBRID,
        disableDefaultUI: true,
        fullscreenControl: true,
        zoomControl: true
    });
    map.initialize();
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
            position: {"lat":lat, "lng":lng},
            title: val.title,
            label: val.ID.toString()
        });
        marker.addListener('click', ()=>{
            selectItem(val.ID);
        });
    });
}

function selectItem(id){
    id = parseInt(id);
    rai_detail = $.grep(rai_data,(ele,i)=>{
        return ele.ID==id;
    });
    rai_detail = rai_detail[0];
    //Map operations
    let map = $("#hybrid_map");
    let marker = $.grep($("#hybrid_map").data("markers"),(ele,i)=>{
        return ele.label==id.toString();
    });
    marker = marker[0];
    map.data("map").setZoom(15);
    //map.data("map").setCenter(marker.getPosition());
    map.data("map").panTo(marker.getPosition());
    //Data table operations
    $("#datatables-clients tbody tr").removeClass("selected");
    $('#datatables-clients tbody tr[data-raiid="'+id+'"]').addClass('selected');
    initDetailTable(id);
    $("#btn_openDronePic").removeAttr("disabled");
    /*
    let infoWindow = new google.maps.InfoWindow;
    let content = rai_detail.title;
    infoWindow.setContent(content);
    infoWindow.setPosition(e.latLng);
    infoWindow.open(_map);
    _map.setZoom(15);
    _map.setCenter(marker.getPosition());
    //Data table operations
    $("#datatables-clients tbody tr").removeClass("selected");
    $('#datatables-clients tbody tr[data-raiid="'+id+'"]').addClass('selected');
    initDetailTable(id);
    */
}