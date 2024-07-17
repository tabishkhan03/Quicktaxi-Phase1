import React from "react";
import { Layer, Source } from "react-map-gl";

const Routes = ( props ) => {
  return (
    <Source
    type="geojson"
      data={{
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: props.coordinates,
        },
      }}
    >
      <Layer type="line"
      layout={{'line-join': 'round','line-cap':'round'}}
      paint={{ 'line-color':"black",'line-width':7}}
      
      />
    </Source>
  );
};

export default Routes;
