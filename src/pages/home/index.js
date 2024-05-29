import {AddLocation, Layout, Map, TextInput} from '@/_components';
import {requestPermission} from '@/_components/Notification';
import React, {useRef, useState} from 'react';
import {useOnClickOutside} from '@/_helpers';
import Formsy from 'formsy-react';
// import {Autocomplete} from '@react-google-maps/api';

import MapSearchIcon from '../../../public/_assets/icons/search-location-icon.svg';
import SearchIcon from '../../../public/_assets/icons/search-icon.svg';
import ClockIcon from '../../../public/_assets/icons/clock-icon.svg';

const HomePage = () => {
   const searchPanelRef = useRef();
   const [coords, setCoords] = useState({});
   const [locations, setLocations] = useState([]);

   // const [places, setPlaces] = useState([]);
   // const [bounds, setBounds] = useState(null);
   // const [isLoading, setIsLoading] = useState(false);
   const [searchInput, setSearchInput] = useState('');
   const [autocomplete, setAutocomplete] = useState(null);
   const [childClicked, setChildClicked] = useState(null);
   const [showSearchPanel, setShowSearchPanel] = useState(false);

   useOnClickOutside(searchPanelRef, () => {
      if (showSearchPanel) setShowSearchPanel(false);
   });

   const handleSearch = (data) => {
      setSearchInput(data);
      if (data === '' || data === undefined) {
         // dispatch(userActions.getAdminUsers());
      } else {
         // dispatch(userActions.searchUser({search_term: data}));
      }
   };

   const handleSearchOnKeyDown = () => {
      if (searchInput !== '') {
         // dispatch(userActions.searchUser({search_term: searchInput}));
      }
   };

   const handleSubscribe = async () => {
      await requestPermission();
   };

   const handleAddLocation = (newLocation) => {
      setLocations([...locations, newLocation]);
      // Optionally, you could trigger a re-fetch of locations from the server here
   };

   // useEffect(() => {
   //    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
   //       setCoords({lat: latitude, lng: longitude});
   //    });
   // }, []);

   // useEffect(() => {
   //    const filtered = places?.filter((place) => Number(place.rating) > rating);

   //    setFilteredPlaces(filtered);
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [rating]);

   // useEffect(() => {
   //    if (bounds) {
   //       setIsLoading(true);

   //       getPlacesData(bounds.sw, bounds.ne).then((data) => {
   //          console.log(`data=====>`, data);

   //          // setPlaces(data?.filter((place) => place?.name && place?.num_reviews > 0));
   //          setPlaces(data);
   //          // setFilteredPlaces([]);
   //          setIsLoading(false);
   //       });
   //    }
   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [bounds]);

   const onLoad = (autoC) => setAutocomplete(autoC);

   const onPlaceChanged = () => {
      const lat = autocomplete.getPlace().geometry.location.lat();
      const lng = autocomplete.getPlace().geometry.location.lng();

      setCoords({lat, lng});
   };

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
                  <Formsy className="relative w-96 pt-16 md:pt-2">
                     {showSearchPanel && (
                        <p className="absolute top-10 md:-top-3 font-light px-6 text-xs leading-4 text-color-4 duration-500 z-50">
                           Type in your location
                        </p>
                     )}
                     <div onClick={() => setShowSearchPanel(true)} className="px-6 z-10 relative">
                        <TextInput
                           type="text"
                           name="search"
                           className="border border-color-6 bg-color-5 rounded-5 pt-3 pb-4 px-10 md:pr-16 font-medium text-sm leading-5 text-color-7"
                           placeholder="Type in your location"
                           onValueChange={handleSearch}
                           onKeyPress={(e) => {
                              e.key === 'Enter' && handleSearchOnKeyDown();
                           }}
                           leftIcon={
                              <button
                                 type="submit"
                                 onClick={handleSearchOnKeyDown}
                                 className="icon_wrapper -left-8 top-0 absolute">
                                 <SearchIcon />
                              </button>
                           }
                           rightIcon={
                              <button
                                 type="submit"
                                 onClick={handleSearchOnKeyDown}
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
                           <LocationLists childClicked={childClicked} locations={locations} />
                        </div>
                     )}
                  </Formsy>
               </div>

               {/* <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
                  <div className={classes.search}>
                     <div className={classes.searchIcon}>
                        <SearchIcon />
                     </div>
                     <InputBase placeholder="Search…" classes={{root: classes.inputRoot, input: classes.inputInput}} />
                  </div>
               </Autocomplete> */}

               <div className="googlemap w-full">
                  <AddLocation onAddLocation={handleAddLocation} />
                  <Map key={locations?.length} locations={locations} setLocations={setLocations} />
               </div>
            </div>
         </div>
      </Layout>
   );
};

export default HomePage;

const LocationLists = ({locations, childClicked}) => {
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
                        <h4 className="text-sm pb-2 font-normal leading-5 text-color-8 tracking-1">
                           {location?.address}
                        </h4>
                        <p className="font-light text-xs leading-3 text-color-8">{location?.state}</p>
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
