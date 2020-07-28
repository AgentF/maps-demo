/* global google */
import { guidGenerator } from './functions';

export class MapHelper {
  constructor(apikey, mapElement, center, zoom) {
    // Create the script tag, set the appropriate attributes
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apikey}&callback=initMap`;
    script.defer = true;
    script.async = true;

    // Attach your callback function to the `window` object
    window.initMap = () => {
      this.map = new google.maps.Map(mapElement, {
        center,
        zoom,
      });

      this.map.addListener('click', (e) => this.addMarker(e));

      this.distanceMatrixService = new google.maps.DistanceMatrixService();

      setTimeout(() => this.tryGeolocation(this.map), 5 * 1000);
    };

    // Append the 'script' element to 'head'
    document.head.appendChild(script);

    this.markers = [];
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

  tryGeolocation() {
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
          this.map.setCenter(position);
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

  addMarker({ latLng }) {
    const internalId = guidGenerator();

    let marker = new google.maps.Marker({
      internalId,
      position: latLng,
      map: this.map,
      draggable: true,
      animation: google.maps.Animation.DROP,
    });

    marker.addListener('click', () => {
      this.map.setZoom(8);
      this.map.setCenter(marker.getPosition());
    });

    marker.addListener('rightclick', () => {
      marker.setMap(null);
      marker = null;
      const markerIndex = this.markers.findIndex(
        (possibleMarker) => possibleMarker.internalId === internalId,
      );
      if (markerIndex) {
        this.markers = [
          ...this.markers.slice(0, markerIndex),
          ...this.markers.slice(markerIndex + 1),
        ];
      }
    });

    if (this.markers.length > 4) {
      this.getRoute();
    }
  }

  getRoute() {
    const route = this.markers.map((marker) => marker.getLocation());
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
}
