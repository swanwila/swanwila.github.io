$.fn.googleMap = function(options) {
    let _this = this;
    let settings = options;
    let markers = [];
    let polygons = [];

    this.initialize = ()=>{
        let map = new google.maps.Map(_this.get(0), settings);
        _this.data('map', map);
        return _this;
    };
    this.addPolygon = (options)=>{
        map = _this.data("map");
        let polygon = new google.maps.Polygon(options);
        polygon.setMap(map);
        polygons.push(polygon);
        _this.data('polygons', polygons);
        return polygon;
    }
    this.addMarker = (options)=>{
        let setting = $.extend({},{
            map: _this.data("map")
        }, options);
        let marker = new google.maps.Marker(setting);
        markers.push(marker);
        _this.data('markers', markers);
        return marker;
    };

    return this;
};