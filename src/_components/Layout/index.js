import {Navbar} from '@/_navigation';
import React, {memo} from 'react';
import Head from 'next/head';

// eslint-disable-next-line react/display-name
const Layout = memo(({children, ...rest}) => {
   return (
      <main className="main__wrapper">
         <Head>
            <title>Bundo</title>
            <meta name="msapplication-TileColor" content="#FFFFFF" />
            <meta name="theme-color" content="#FFFFFF" />
            {/* <link
               rel="stylesheet"
               href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
               integrity="sha512-SfTiTlX6kk+qitfevl/7LibUOeJWlt9rbyDn92a1DqWOw9vWG2MFoays0sgObmWazO5BQPiFucnnEAjpAB+/Sw=="
               crossOrigin
               referrerPolicy="no-referrer"
            /> */}
         </Head>

         <div className="PageLayout container-fluid p-0">
            <Navbar />
            {children}
         </div>
      </main>
   );
});

export default Layout;
