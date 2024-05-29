import {Layout} from '@/_components';
import React from 'react';

const About = () => {
   return (
      <Layout>
         <div className="w-full md:auto flex items-center">
            <div className="container mx-auto flex items-center justify-between">
               <h1 className="text-3xl text-gray-900 font-bold">About</h1>
            </div>
         </div>
      </Layout>
   );
};

export default About;
