import React, {useEffect, useState} from 'react';
import {GoogleMap, LoadScript, Marker, useJsApiLoader} from '@react-google-maps/api';
import Image from 'next/image';

const containerStyle = {
   width: '100%',
   height: '60vh',
};

const center = {
   lat: -3.745,
   lng: -38.523,
};

const Map = ({locations, setLocations}) => {
   const [selectedPlace, setSelectedPlace] = useState(null);

   const {isLoaded} = useJsApiLoader({
      id: 'google-map-script',
      googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
   });

   const fetchLocations = async () => {
      // Fetch the locations from your API or database
      const response = await fetch('/api/locations');
      const data = await response.json();
      console.log(`data=====>`, data);
      if (data?.length) setLocations(data);
   };

   useEffect(() => {
      fetchLocations();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   function onClick(e) {
      console.log('onClick args: lat', e.latLng?.lat(), ' lng: ', e.latLng?.lng());
   }

   // const Marker = {
   //    url: '/_assets/images/Marker.png',
   //    scaledSize: {width: 50, height: 50},
   // };

   return isLoaded ? (
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
         <GoogleMap onClick={onClick} mapContainerStyle={containerStyle} center={center} zoom={10}>
            {locations?.map((location, i) => (
               <>
                  <div className="relative bg-color-1" lat={Number(location.lat)} lng={Number(location.long)} key={i}>
                     <Marker
                        position={{lat: location.lat, lng: location.long}}
                        onClick={() => setSelectedPlace(place === selectedPlace ? null : place)}
                        // icon={Marker}
                     />
                     <div className="absolute bg-color-3">
                        <Image
                           priority
                           height={100}
                           width={100}
                           alt=""
                           src={
                              location?.photo
                                 ? location.img_url
                                 : `https://ui-avatars.com/api/?background=rgba(52, 168, 83, 1)&color=fff&font-size=0.48&length=3&name=${location.lat}`
                           }
                        />
                     </div>
                  </div>
               </>
            ))}
         </GoogleMap>
      </LoadScript>
   ) : (
      <></>
   );
};

export default Map;

// import GoogleMapReact from 'google-map-react';
// import mapStyles from './mapStyles';
// import Image from 'next/image';
// import React from 'react';

// const Map = ({coords, places, setCoords, setBounds, setChildClicked, weatherData}) => {
//    return (
//       <GoogleMapReact
//          bootstrapURLKeys={{key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}}
//          defaultCenter={coords}
//          center={coords}
//          defaultZoom={14}
//          margin={[50, 50, 50, 50]}
//          options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
//          onChange={(e) => {
//             setCoords({lat: e.center.lat, lng: e.center.lng});
//             setBounds({ne: e.marginBounds.ne, sw: e.marginBounds.sw});
//          }}
//          onChildClick={(child) => setChildClicked(child)}>
//          {places?.length &&
//             places?.map((place, i) => (
//                <div key={i} className="" lat={Number(place?.latitude)} lng={Number(place?.longitude)}>
//                   {!matches ? (
//                      <p className="text-3xl">small screen</p>
//                   ) : (
//                      <div className="card">
//                         <h1 className="">{place?.name}</h1>
//                         <Image
//                            priority
//                            width={100}
//                            height={100}
//                            alt=""
//                            src={
//                               place?.photo
//                                  ? place?.photo?.images?.large?.url
//                                  : `https://ui-avatars.com/api/?background=rgba(52, 168, 83, 1)&color=fff&font-size=0.48&length=3&name=${place?.name}`
//                            }
//                         />
//                         {/* <Rating name="read-only" size="small" value={Number(place.rating)} readOnly /> */}
//                      </div>
//                   )}
//                </div>
//             ))}
//          {/* {weatherData?.list?.length &&
//             weatherData.list.map((data, i) => (
//                <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
//                   <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" />
//                </div>
//             ))} */}
//       </GoogleMapReact>
//    );
// };

// export default Map;
