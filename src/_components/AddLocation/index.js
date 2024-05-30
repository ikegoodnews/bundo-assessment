import React, {useState} from 'react';

const AddLocation = ({onAddLocation}) => {
   const [lat, setLat] = useState('');
   const [lng, setLng] = useState('');

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newLocation = {id: Date.now(), lat: parseFloat(lat), long: parseFloat(lng)};
      // Post new location to your API or database
      await fetch('/api/add-location', {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify(newLocation),
      });

      // Call the callback function to refresh the map
      onAddLocation(newLocation);

      setLat('');
      setLng('');
   };

   return (
      <form onSubmit={handleSubmit}>
         <input type="number" placeholder="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} required />
         <input type="number" placeholder="Longitude" value={lng} onChange={(e) => setLng(e.target.value)} required />
         <button type="submit">Add Location</button>
      </form>
   );
};

export default AddLocation;
