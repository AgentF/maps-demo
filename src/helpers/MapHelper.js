/* global google */
import { guidGenerator } from './functions';

export class MapHelper {
  constructor(
    apikey,
    mapElement,
    center,
    setCenter,
    zoom,
    setZoom,
    addMarker,
    removeMarker,
  ) {
    this.zoom = zoom;
    this.center = center;

    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&callback=initMap`;
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = () => {
      this.map = new google.maps.Map(mapElement, {
        center: this.center,
        zoom: this.zoom,
      });

      this.map.addListener('click', (e) =>
        this.addMarker(e, addMarker, removeMarker, setCenter, setZoom),
      );

      this.distanceMatrixService = new google.maps.DistanceMatrixService();

      setTimeout(() => this.tryGeolocation(setCenter), 2 * 1000);
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    this.internalMarkers = [];
  }

  handleGeolocationError(browserHasGeolocation, infoWindow, position) {
    infoWindow.setPosition(position);
    infoWindow.setContent(
      browserHasGeolocation
        ? 'Error: The Geolocation service failed.'
        : "Error: Your browser doesn't support geolocation.",
    );
    infoWindow.open(this.map);
  }

  tryGeolocation(setCenter) {
    const infoWindow = new google.maps.InfoWindow();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (currentPosition) => {
          const position = {
            lat: currentPosition.coords.latitude,
            lng: currentPosition.coords.longitude,
          };

          infoWindow.setPosition(position);
          infoWindow.setContent('Location found.');
          // infoWindow.open(this.map);
          this.setCenter(position);
          setCenter(position);
        },
        () => {
          this.handleGeolocationError(true, infoWindow, this.map.getCenter());
        },
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleGeolocationError(false, infoWindow, this.map.getCenter());
    }
  }

  addMarker({ latLng }, addMarker, removeMarker, setCenter, setZoom) {
    const internalId = guidGenerator();

    let marker = new google.maps.Marker({
      internalId,
      position: latLng,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', () => {
      const markerLatLng = marker.getPosition();
      const newCenter = { lat: markerLatLng.lat(), lng: markerLatLng.lng() };

      this.setCenter(newCenter);
      setCenter(newCenter);

      const newZoom = 8;
      this.setZoom(newZoom);
      setZoom(newZoom);
    });

    marker.addListener('rightclick', () => {
      marker.setMap(null);
      marker = null;
      const markerIndex = this.internalMarkers.findIndex(
        (possibleMarker) => possibleMarker.internalId === internalId,
      );
      if (markerIndex) {
        this.internalMarkers = [
          ...this.internalMarkers.slice(0, markerIndex),
          ...this.internalMarkers.slice(markerIndex + 1),
        ];
        removeMarker(internalId);
      }
    });

    this.internalMarkers = [...this.internalMarkers, marker];

    const markerLatLng = marker.getPosition();

    addMarker({
      internalId,
      position: { lat: markerLatLng.lat(), lng: markerLatLng.lng() },
    });
  }

  getRoute() {
    const route = this.internalMarkers.map((marker) => marker.getLocation());
    this.distanceMatrixService.getDistanceMatrix(
      {
        origins: route.shift(),
        destinations: route,
      },
      (response, status) => {
        return { response, status };
      },
    );
  }

  setCenter(center) {
    if (this.center !== center) {
      this.center = center;
      this.map.setCenter(center);
    }
  }

  setZoom(zoom) {
    if (this.zoom !== zoom) {
      this.zoom = zoom;
      this.map.setZoom(zoom);
    }
  }
}
