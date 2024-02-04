import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useSpaceStore } from "../../store/SpaceStore";
import { Marker } from "react-google-maps";

const SpaceMap = () => {
  const mapContainerStyle = {
    width: " calc(100vw * .35) - 5px",
    height: "200px",
  };

  const spaceItem = useSpaceStore((store) => store.spaceItem);

  useEffect(() => {
    setCurrentLocation({
      lat: spaceItem?.spaceCoordinate.latitude || 0,
      lng: spaceItem?.spaceCoordinate.longitude || 0,
    });
  }, []);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  return (
    <>
      <div style={{ width: "calc(100vw * .35)" }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={currentLocation}
        >
          <Marker key="test" position={currentLocation} />
        </GoogleMap>
      </div>
    </>
  );
};

export default SpaceMap;
