$.fn.googleMap = function(options) {
    let settings = options;
    let markers = [];
    let polygons = [];
    let centroid;

    this.initialize = ()=>{
        let map = new google.maps.Map(this.get(0), settings);
        this.data('map', map);
        centroid = settings.center;
        return this;
    };
    this.addPolygon = (options)=>{
        map = this.data("map");
        let polygon = new google.maps.Polygon(options);
        polygon.setMap(map);
        polygons.push(polygon);
        this.data('polygons', polygons);
        return polygon;
    }
    this.addMarker = (options)=>{
        let setting = $.extend({},{
            map: this.data("map")
        }, options);
        let marker = new google.maps.Marker(setting);
        markers.push(marker);
        this.data('markers', markers);
        return marker;
    };
    this.setCenter = ()=>{
        map = this.data("map");
        map.setZoom(11);
        map.panTo(centroid);
    }

    return this;
};