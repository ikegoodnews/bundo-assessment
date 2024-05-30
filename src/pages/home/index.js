import {AddLocation, Layout, Map, TextInput} from '@/_components';
import {requestPermission} from '@/_components/Notification';
import React, {useEffect, useRef, useState} from 'react';
import {Autocomplete, useJsApiLoader} from '@react-google-maps/api';
import {useOnClickOutside} from '@/_helpers';
import Formsy from 'formsy-react';

import MapSearchIcon from '../../../public/_assets/icons/search-location-icon.svg';
import SearchIcon from '../../../public/_assets/icons/search-icon.svg';
import ClockIcon from '../../../public/_assets/icons/clock-icon.svg';

const HomePage = () => {
   const cityRef = useRef(null);
   const searchPanelRef = useRef();
   // const [coords, setCoords] = useState({lat: 6.452448, lng: 3.395269});
   const [coords, setCoords] = useState({});
   const [locations, setLocations] = useState([]);
   const [autocomplete, setAutocomplete] = useState(null);
   const [selectedPlace, setSelectedPlace] = useState(null);
   console.log(`selectedPlace=====>`, selectedPlace);

   const [showSearchPanel, setShowSearchPanel] = useState(false);

   useOnClickOutside(searchPanelRef, () => {
      if (showSearchPanel) setShowSearchPanel(false);
   });

   const {isLoaded} = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
   });

   const fetchLocations = async () => {
      // Fetch the locations from your API or database
      const response = await fetch('/api/locations');
      const data = await response.json();
      console.log(`data=====>`, data);
      if (data?.length) {
         setLocations(data);
         setCoords({lat: data?.[0]?.lat, lng: data?.[0]?.long});
      }
   };

   useEffect(() => {
      fetchLocations();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleSubscribe = async () => {
      await requestPermission();
   };

   const handleAddLocation = async (newLocation) => {
      console.log(`newLocation=====>`, newLocation);
      setLocations([...locations, newLocation]);
      setCoords({lat: newLocation?.lat, lng: newLocation?.long});
   };

   const onLoad = (autoComplete) => setAutocomplete(autoComplete);

   const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();
      console.log(`autocomplete.getPlace()=====>`, autocomplete.getPlace());
      // setLocations([...locations, { id: Date.now(), lat, long: lng }]);
      // handleAddLocation({id: Date.now(), lat, long: lng});
      // setSelectedPlace(autocomplete.getPlace());
      setCoords({lat, lng});
   };

   // const handleSubmit = async (e) => {
   //    e.preventDefault();

   //    const newLocation = {id: Date.now(), lat: parseFloat(lat), long: parseFloat(lng)};
   //    // Post new location to your API or database
   //    await fetch('/api/add-location', {
   //       method: 'POST',
   //       headers: {'Content-Type': 'application/json'},
   //       body: JSON.stringify(newLocation),
   //    });

   //    // Call the callback function to refresh the map
   //    onAddLocation(newLocation);

   //    setLat('');
   //    setLng('');
   // };

   return (
      <Layout>
         <div className="home_page w-full pb-20 md:auto flex items-center">
            <div className="container mx-auto">
               <div className="my-8 flex flex-wrap items-center justify-between">
                  <button
                     onClick={handleSubscribe}
                     className="p-4 w-48 text-color-2 bg-color-3 hover:bg-color-3-hover transition duration-300 rounded-5 text-xs font-medium leading-4 tracking-wide uppercase">
                     notify me
                  </button>
                  {isLoaded && (
                     <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                        <form className="relative pt-16 md:pt-2 ">
                           {/* w-96 */}
                           {/* {showSearchPanel && (
                              <p className="absolute top-10 md:-top-3 font-light px-6 text-xs leading-4 text-color-4 duration-500 z-50">
                                 Type in your location
                              </p>
                           )} */}
                           <div className="relative border border-color-6 bg-color-5 rounded-5 pt-3 pb-4 px-10 md:pr-16 font-medium text-sm leading-5 text-color-7">
                              {/* <button
                                 type="submit"
                                 // onClick={handleSearchOnKeyDown}
                                 className="left-8 top-0 absolute">
                                 <SearchIcon />
                              </button> */}
                              <input type="text" name="text" className="" placeholder="Type in your location" />
                              {/* <button
                                 type="submit"
                                 // onClick={handleSearchOnKeyDown}
                                 className="absolute hidden md:inline-block scale-90 right-14 top-2.5">
                                 <MapSearchIcon />
                              </button> */}
                           </div>
                        </form>
                     </Autocomplete>
                  )}
                  {/* <Formsy className="relative w-96 pt-16 md:pt-2">
                     {showSearchPanel && (
                        <p className="absolute top-10 md:-top-3 font-light px-6 text-xs leading-4 text-color-4 duration-500 z-50">
                           Type in your location
                        </p>
                     )}
                     <div onClick={() => setShowSearchPanel(true)} className="px-6 z-10 relative">
                        <TextInput
                           ref={cityRef}
                           type="text"
                           name="search"
                           className="border border-color-6 bg-color-5 rounded-5 pt-3 pb-4 px-10 md:pr-16 font-medium text-sm leading-5 text-color-7"
                           placeholder="Type in your location"
                           // onValueChange={handleSearch}
                           // onKeyPress={(e) => {
                           //    e.key === 'Enter' && handleSearchOnKeyDown();
                           // }}
                           leftIcon={
                              <button
                                 type="submit"
                                 // onClick={handleSearchOnKeyDown}
                                 className="icon_wrapper -left-8 top-0 absolute">
                                 <SearchIcon />
                              </button>
                           }
                           rightIcon={
                              <button
                                 type="submit"
                                 // onClick={handleSearchOnKeyDown}
                                 className="icon_wrapper hidden md:inline-block scale-90 -right-14 -top-2.5 absolute">
                                 <MapSearchIcon />
                              </button>
                           }
                        />
                     </div>
                     {showSearchPanel && (
                        <div
                           ref={searchPanelRef}
                           className="search_panel absolute bg-white w-full shadow-xl px-6 pt-28 pb-6 z-50 bg-white">
                           <LocationLists locations={locations} />
                        </div>
                     )}
                  </Formsy> */}
               </div>

               <div className="googlemap w-full">
                  {/* <AddLocation onAddLocation={handleAddLocation} /> */}
                  <Map key={locations?.length} coords={coords} locations={locations} setLocations={setLocations} />
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default HomePage;

const LocationLists = ({locations}) => {
   console.log(`locations=====>`, locations);

   return (
      <>
         <button className="p-4 w-full text-color-2 bg-color-3 hover:bg-color-3-hover transition duration-300 rounded-5 text-xs font-medium leading-4 tracking-wide uppercase">
            FIND VENDORS AROUND ME
         </button>
         <p className="font-medium py-3 pt-5 text-sm leading-5 text-color-7">Your past locations</p>
         <ul className="">
            {locations?.length > 0 ? (
               locations?.map((location, i) => (
                  <li key={i} className="flex items-start py-3 border-b border-color-9 cursor-pointer">
                     <div className="icon mr-2 scale-90">
                        <ClockIcon />
                     </div>
                     <div className="">
                        <h4 className="text-sm pb-2 font-normal leading-5 text-color-8 tracking-1">{location?.lat}</h4>
                        <p className="font-light text-xs leading-3 text-color-8">{location?.long}</p>
                     </div>
                  </li>
               ))
            ) : (
               <li className="text-sm pb-2 py-3 font-normal leading-5 text-color-8 tracking-1">
                  no locations available
               </li>
            )}
         </ul>
      </>
   );
};
