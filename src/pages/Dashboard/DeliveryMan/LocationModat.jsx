import React from "react";
import Map, { Marker } from "react-map-gl";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Set the root element for accessibility

const LocationModal = ({ isOpen, onRequestClose, latitude, longitude }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Location Modal"
      className="map-modal"
      overlayClassName="map-modal-overlay"
    >
      <div className="map-container">
        <Map
          initialViewState={{
            latitude: latitude,
            longitude: longitude,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1IjoibWFzdW0xMiIsImEiOiJjbHhoN2Fxb3oxYjU0MmtvdmJ6YTQ4c2QyIn0.-ZnwLJwrbK9F1s5Uj6H7wA"
        >
          <Marker latitude={latitude} longitude={longitude} />
        </Map>
        <button onClick={onRequestClose} className="close-button">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default LocationModal;
