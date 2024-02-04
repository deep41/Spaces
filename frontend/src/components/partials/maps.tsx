import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, OverlayView } from "@react-google-maps/api";

type Library = "places";

const libraries: Library[] = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "calc(100vh - 55px)",
};

interface MapsProps {
  coordinates?: { latitude: number; longitude: number }[];
}

const defaultCenter = {
  lat: 35.773245, // Default latitude
  lng: -78.67461, // Default longitude
};

const Maps: React.FC<MapsProps> = ({ coordinates = [] }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyBprJC4VwGTWaT9a7rI5reRU17jqXSuAIY", // Replace with your actual API key
    libraries,
  });

  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or some loading indicator while waiting for geolocation
  }

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={currentLocation.lat !== 0 ? currentLocation : defaultCenter}
      >
        {/* Render static markers */}
        {coordinates.map((marker, index) => (
          <OverlayView
            key={index}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            mapPaneName={OverlayView.OVERLAY_LAYER}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="https://source.unsplash.com/random/40x40"
                alt="Custom Marker"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "3px solid #FFF",
                }}
              />
              <span  style={{
              marginTop: "50px",
              fontWeight: "bold", // Make text bolder
              color: "#000", // Set text color to white
            }} >HELLOO</span>
            </div>
          </OverlayView>
        ))}

        {/* Render current location marker */}
        <OverlayView
          position={currentLocation}
          mapPaneName={OverlayView.OVERLAY_LAYER}
          getPixelPositionOffset={(width, height) => ({
            x: -(width / 2),
            y: -(height / 2),
          })}
        >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img
                src="https://source.unsplash.com/random/40x40"
                alt="Custom Marker"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "3px solid #FFF",
                }}
              />
              <span  style={{
              marginTop: "50px",
              fontWeight: "bold", // Make text bolder
              color: "#000", // Set text color to white
            }}>HELLOO</span>
            </div>
        </OverlayView>
      </GoogleMap>
    </div>
  );
};

export default Maps;
