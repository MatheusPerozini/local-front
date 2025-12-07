"use client";
import MapBox, {
  NavigationControl,
  Source,
  Marker,
  Layer,
  LayerProps,
  GeolocateControl,
} from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";

interface Props {
  latitude: number;
  longitude: number;
}

export default function Map({ latitude, longitude }: Props) {
  const [start, setStart] = useState([0, 0]);
  const [coords, setCoords] = useState([0, 0]);
  const GeolocationRef = useRef<React.ElementRef<
    typeof GeolocateControl
  > | null>(null);

  const getRoute = async () => {
    const res = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${latitude},${longitude}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoibWF0aGV1cy1wZXJvemluaSIsImEiOiJjbWl1dWJhajkxODZsM2RvbjUya2prMThoIn0.cp7ejfASByyU6ZxHK76pYg`
    );
    const data = await res.json();
    if (data.routes.length > 0) {
      const cords = data.routes[0].geometry.coordinates;
      setCoords(cords);
    }
  };

  const dataOne = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: [...coords],
    },
  };

  const endPoint = {
    type: "FeatureCollection",
    features: [
      {
        type: "feature",
        geometry: {
          type: "points",
          coordinates: [longitude, latitude],
        },
      },
    ],
  };

  const layerEndpoint: LayerProps = {
    id: "end",
    type: "circle",
    paint: {
      "circle-radius": 10,
      "circle-color": "#f30",
    },
  };

  useEffect(() => {
    getRoute();
    if (GeolocationRef.current?.trigger) {
      GeolocationRef.current?.trigger();
    }
  }, [GeolocationRef, latitude, longitude]);

  return (
    <>
      <MapBox
        mapboxAccessToken="pk.eyJ1IjoibWF0aGV1cy1wZXJvemluaSIsImEiOiJjbWl1dWJhajkxODZsM2RvbjUya2prMThoIn0.cp7ejfASByyU6ZxHK76pYg"
        initialViewState={{
          longitude: +longitude,
          latitude: +latitude,
          zoom: 10,
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Source
          id="polylineLayer"
          type="geojson"
          data={JSON.stringify(dataOne)}
        >
          <Layer
            id="lineLayer"
            type="line"
            source="my-data"
            layout={{
              "line-join": "round",
              "line-cap": "round",
            }}
            paint={{
              "line-color": "rgba(3, 170, 238, 0.5)",
              "line-width": 5,
            }}
          />
        </Source>

        <Source id="endSource" type="geojson" data={JSON.stringify(endPoint)}>
          <Layer {...layerEndpoint} />
        </Source>
        <GeolocateControl
          ref={GeolocationRef}
          showAccuracyCircle={false}
          onGeolocate={(e) => {
            setStart([e.coords.latitude, e.coords.longitude]);
            getRoute();
          }}
        />
        <NavigationControl />
        <Marker longitude={longitude} latitude={latitude} />
      </MapBox>
    </>
  );
}
