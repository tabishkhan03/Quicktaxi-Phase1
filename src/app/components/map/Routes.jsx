import React from "react";
import { Layer, Source } from "react-map-gl";

const Routes = ({ coordinates }) => {
  if (!coordinates || coordinates.length === 0) {
    return null; // Return null or handle empty coordinates case
  }

  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: coordinates,
        },
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "round" }}
        paint={{ "line-color": "black", "line-width": 2 }}
      />
    </Source>
  );
};

export default Routes;
