
function initialize() {
    initMap();
    initAutocomplete();
}

var map;
var geocoder;
var marker;
var icon;

//Placed marker when map is pinned
function placeMarker(location) {
    marker = new google.maps.Marker({
        position: location,
        icon: icon,
        map: map
    });
    map.setCenter(location);
}

// When there is a marker - clear marker 
function clearMarker(marker) {
    if (marker) {
        marker.setMap(null)
    }
}

function initMap() {
    icon = {
        url: "image/pin.png",
        size: new google.maps.Size(150, 150),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(0, 0),
        scaledSize: new google.maps.Size(45, 45)
    };

//Load the map
    geocoder = new google.maps.Geocoder();
    var defaultlatLng = new google.maps.LatLng(42.692151, 23.354187);
    var myOptions = {
        zoom: 8,
        center: defaultlatLng,
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);

//Add click event to map
    google.maps.event.addListener(map, 'click', function (event) {

// Removes the markers from the map
        clearMarker(marker);

// Get possition of marker when map is pin    
        placeMarker(event.latLng);
        var latlng = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }

// Show address in the input
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                address = results[0].formatted_address
                document.getElementById("address").value = address;
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }
        });
    })
}

function initAutocomplete() {

// Create the search box and link it to the UI element.
    var input = document.getElementById('address');
    var searchBox = new google.maps.places.SearchBox(input);

// Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });


// Listen for the event fired when the user selects a prediction and retrieve
// more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

// Clear out the old markers.
        clearMarker(marker)

// For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

// Create a marker for each place.
         placeMarker(place.geometry.location)

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
}






