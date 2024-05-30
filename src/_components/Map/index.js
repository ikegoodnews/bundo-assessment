import React, {useState} from 'react';
import {GoogleMap, InfoWindowF, LoadScript, MarkerF} from '@react-google-maps/api';

const containerStyle = {
   width: '100%',
   height: '70vh',
};

const Map = ({coords, locations, selectedPlace, setSelectedPlace}) => {
   const CustomMarker = {
      url: '/_assets/images/marker.png',
      scaledSize: {width: 50, height: 50},
   };

   return (
      <LoadScript libraries={['places']} googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
         <GoogleMap mapContainerStyle={containerStyle} center={{lat: coords.lat, lng: coords.lng}} zoom={17}>
            {locations?.map((place) => (
               <MarkerF
                  key={place?.id}
                  onClick={() => setSelectedPlace(place === selectedPlace ? null : place)}
                  position={{lat: place.lat, lng: place.long}}
                  icon={CustomMarker}
               />
            ))}

            {selectedPlace && selectedPlace.geometry && (
               <MarkerF
                  position={{
                     lat: selectedPlace.geometry.location.lat(),
                     lng: selectedPlace.geometry.location.lng(),
                  }}
               />
            )}

            {/* {newPlaces.map((place) => (
               <MarkerF
                  key={place.id}
                  onClick={() => setSelectedPlace(place === selectedPlace ? null : place)}
                  position={{lat: place.latitude, lng: place.longitude}}
                  icon={CustomMarker}
               />
            ))} */}

            {selectedPlace && (
               <InfoWindowF
                  position={{lat: selectedPlace.latitude, lng: selectedPlace.longitude}}
                  anchor={
                     selectedPlace && <MarkerF position={{lat: selectedPlace.latitude, lng: selectedPlace.longitude}} />
                  }
                  zIndex={1}
                  options={{pixelOffset: {width: 0, height: -40}}}
                  onCloseClick={() => setSelectedPlace(null)}>
                  <div>
                     <h3>
                        City:<b>{selectedPlace.name}</b>
                     </h3>
                     <p>
                        Latitude:<b>{selectedPlace.latitude}</b>
                     </p>
                     <p>
                        Longitude:<b>{selectedPlace.longitude}</b>
                     </p>
                  </div>
               </InfoWindowF>
            )}
         </GoogleMap>
      </LoadScript>
   );
};

export default Map;
