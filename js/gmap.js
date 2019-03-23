$.fn.googleMap = function() {
    let markers = [];
    let polygons = [];
    let centroid;

    this.initialize = (options)=>{
        let map = new google.maps.Map(this.get(0), options);
        this.data('map', map);
        this.centroid = options.center;
        this.data('googleMap',this);
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
    }
    this.setCenter = ()=>{
        map = this.data("map");
        map.setZoom(11);
        map.panTo(this.centroid);
    }

    return this;
}