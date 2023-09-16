import { GeoJsonLayer, IconLayer } from "@deck.gl/layers/typed";
import DeckGL from "@deck.gl/react/typed";
import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useState } from "react";
import {
  AttributionControl,
  FullscreenControl,
  Map,
  NavigationControl,
  ScaleControl,
} from "react-map-gl";
import "./RouteMapDirections.css";

export type Stop = {
  location: string;
  location_metadata: {
    supplied_coordinate: [number, number];
    snapped_coordinate: [number, number];
  };
  eta: string;
  type: "pickup" | "dropoff";
  duration: number;
  pickups?: string[];
  dropoffs?: string[];
  odometer: number;
  wait: number;
};

export type Route = {
  duration: number;
  distance: number;
  weight_name: string;
  weight: number;
  duration_typical: number;
  weight_typical: number;
  geometry: object;
  legs: object[];
  voiceLocale: string;
  waypoints: object[];
};

function svgToDataURL(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const accessToken =
  "pk.eyJ1IjoibWljaGFlbGJldXRsZXIiLCJhIjoiY2xrMmliYjZwMGN1djNxbXF6bGU5ejQ1aSJ9.HyTfjoA0G5o3m5_EM4qdVw";

const RouteMapDirections = ({ stops }: { stops: Stop[] }) => {
  const [layers, setLayers] = useState<any>([]);
  useEffect(() => {
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${stops
        .map((s) => s.location_metadata.snapped_coordinate.join(","))
        .join(
          ";"
        )}?overview=full&geometries=geojson&access_token=${accessToken}`
    )
      .then((res) => res.json())
      .then((data) => {
        setLayers(
          data.routes.map(
            (r: Route, i: number) =>
              new GeoJsonLayer({
                id: "route" + i,
                data: r.geometry,
                opacity: 1,
                stroked: true,
                filled: true,
                lineWidthMinPixels: 5,
                extruded: true,
                wireframe: true,
                getLineColor: [0, 128, 255],
                getFillColor: [0, 128, 255],
                pickable: true,
              })
          )
        );
      });
  }, []);

  return (
    <DeckGL
      layers={[
        ...layers,
        new IconLayer({
          id: "icon-layer",
          data: stops.map((s, i) => ({
            coordinates: s.location_metadata.snapped_coordinate,
            index: i,
            type: s.type,
          })),
          getIcon: (d) => ({
            url: svgToDataURL(`<svg width="100" height="100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" fill="#fff" stroke="#0080ff" stroke-width="2"/>
            <text text-anchor="middle" alignment-baseline="central" fill="#0080ff" class="marker" font-size="0.75em">
              <tspan x="12" dy="16">${
                d.type === "pickup" ? "🏭" : d.index + 1
              }</tspan>
            </text>
          </svg>`),
            width: 100,
            height: 100,
          }),
          sizeScale: 8,
          getPosition: (d) => d.coordinates,
          getSize: (d) => 5,
          getColor: (d) => [Math.sqrt(d.exits), 140, 0],
        }),
      ]}
      width={1000}
      height={500}
      initialViewState={{
        longitude: stops[0].location_metadata.snapped_coordinate[0],
        latitude: stops[0].location_metadata.snapped_coordinate[1],
        zoom: 8,
        pitch: 0,
      }}
      controller
    >
      <Map
        attributionControl={false}
        reuseMaps
        mapboxAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
        <AttributionControl position="bottom-right" />
        <ScaleControl position="bottom-right" />
      </Map>
    </DeckGL>
  );
};

export default RouteMapDirections;
