import React, { useState, useEffect, useMemo } from "react";
import {
  TileLayer,
  MapContainer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import {
  apiGetFooterInfo,
  apiPostUpdateFooterInfo,
} from "../../../../firebase/firestore/queries";
import { Button } from "reactstrap";

function LocationMarker({ location, setLocation }) {
  useMapEvents({
    click(e) {
      setLocation(e.latlng);
    },
  });

  return location === null ? null : (
    <Marker position={location}>
      <Popup>Just rent a car</Popup>
    </Marker>
  );
}

export const LocationTab = () => {
  const [existingLocation, setExistingLocation] = useState(null);
  const [location, setLocation] = useState(null);

  const handleGetLocation = async () => {
    const response = await apiGetFooterInfo("address");
    if (response) {
      setLocation(response.location);
      setExistingLocation(response.location);
    }
  };

  const handleSaveChanges = async () => {
    await apiPostUpdateFooterInfo(
      { location: { lat: location.lat, lng: location.lng } },
      "address"
    );
	setExistingLocation(location);
  };

  const handleCancel = () => {
    setLocation(existingLocation);
  };

  const isSaveEnabled = useMemo(() => {
    if (JSON.stringify(location) !== JSON.stringify(existingLocation)) {
      return true;
    }
    return false;
  }, [location, existingLocation]);

  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <>
      {location && (
        <MapContainer
          center={location}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: 400, width: 400 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker location={location} setLocation={setLocation} />
        </MapContainer>
      )}

      <div className="d-flex gap-2">
        <Button
          color="danger"
          className="mt-4"
          disabled={!isSaveEnabled}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button
          color="secondary"
          className="mt-4"
          disabled={!isSaveEnabled}
          onClick={handleSaveChanges}
        >
          Save
        </Button>
      </div>
    </>
  );
};
