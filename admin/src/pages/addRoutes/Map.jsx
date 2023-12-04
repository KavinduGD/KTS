import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  Autocomplete,
} from "@react-google-maps/api";
import MapSearch from "./MapSearch";
import PlacesAutocomplete from "./MapSearch";
// ... (existing imports)

function Map() {
  const mapRef = useRef();

  const center = useMemo(
    () => ({ lat: 6.833813409471106, lng: 79.88634319394335 }),
    []
  );
  const options = useMemo(
    () => ({
      mapId: "958725da470cbe5e",
      //disableDefaultUI: true,
      //clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);

  const [startLocation, setStartLocation] = useState(null);

  const [directions, setDirections] = useState(null);
  const [directionsWithWayPoints, setDirectionsWithWayPoints] = useState(null);

  const service = new google.maps.DirectionsService();

  useEffect(() => {
    if (startLocation) {
      service.route(
        {
          origin: startLocation,
          destination: center,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          waypoints: [
            {
              location: new google.maps.LatLng(
                7.066256254932193,
                80.01205094665697
              ),
              stopover: true,
            },
            {
              location: new google.maps.LatLng(
                6.984911366726646,
                79.96610582931704
              ),
              stopover: true,
            },
            {
              location: new google.maps.LatLng(
                6.844217298430227,
                79.97949870794335
              ),
              stopover: true,
            },
          ],
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirectionsWithWayPoints(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );

      service.route(
        {
          origin: startLocation,
          destination: center,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
    }
  }, [startLocation]);

  console.log(directions);

  return (
    <div className="flex">
      <div>
        <PlacesAutocomplete setLocation={setStartLocation} />
      </div>
      <div className="w-[700px] h-[700px] ">
        <GoogleMap
          zoom={10}
          center={center}
          mapContainerClassName="map-container"
          options={options}
          onLoad={onLoad}
          onRightClick={(e) => {
            const latLng = {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
            };
            console.log("Right-clicked location:", latLng);
            // Do something with the right-clicked location, if needed
          }}
        >
          {directions && <DirectionsRenderer directions={directions} />}
          {/* show the route[0]*/}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
                routeIndex: 0,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "red",
                  strokeWeight: 6,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}
          {/* show the route[0]*/}
          {/* {directions && (
            <DirectionsRenderer
              options={{
                directionsWithWayPoints,
                routeIndex: 0,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "black",
                  strokeWeight: 20,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )} */}
          {directions && (
            <DirectionsRenderer
              options={{
                directionsWithWayPoints,
                routeIndex: 0,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "blue",
                  strokeWeight: 10,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
                routeIndex: 1,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "green",
                  strokeWeight: 6,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}
          {directions && (
            <DirectionsRenderer
              options={{
                directions,
                routeIndex: 2,
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: "red",
                  strokeWeight: 6,
                  strokeOpacity: 0.5,
                },
              }}
            />
          )}{" "}
          */}
          {center && (
            <>
              <Marker
                title="sadsadddd"
                position={center}
                label={{ text: `assadas sadsadasdasd`, color: "#fff" }}
              />
              <Circle center={center} radius={10000} options={closeOptions} />
              <Circle center={center} radius={20000} options={middleOptions} />
              <Circle center={center} radius={30000} options={farOptions} />
            </>
          )}
        </GoogleMap>
      </div>
    </div>
  );
}

export default Map;
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
