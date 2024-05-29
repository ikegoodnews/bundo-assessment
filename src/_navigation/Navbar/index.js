import {navItems, usePageRoutes} from '@/_helpers';
import React, {useCallback} from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';

import BurgerIcon from '../../../public/_assets/icons/burger-menu-icon.svg';
import BundoLogo from '../../../public/_assets/icons/bundo-logo.svg';
import BellIcon from '../../../public/_assets/icons/bell-icon.svg';

const Navbar = () => {
   const pageCodes = usePageRoutes();

   const activeRoute = useCallback(
      (code) => {
         return pageCodes === code;
      },
      [pageCodes],
   );

   return (
      <nav className="w-full md:auto flex items-center">
         <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
               <Link href="/" className="logo">
                  <BundoLogo />
               </Link>
               <div className="notification ml-2" data-count={0}>
                  <BellIcon />
               </div>
            </div>

            <ul className="hidden md:flex items-center gap-8">
               {navItems?.map((navItem, i) => (
                  <li key={i} className={classNames('', {active: activeRoute(navItem?.activeCode)})}>
                     <Link href={navItem?.link}>{navItem?.label}</Link>
                  </li>
               ))}
            </ul>

            <div className="user-pill flex items-center">
               <h6 className="username hidden md:inline-block text-xs font-semibold leading-4 text-gray-950">Hi Michael!</h6>
               <div className="avatar mx-2 w-12 h-12 overflow-hidden hidden md:inline-block">
                  <Image
                     priority
                     src={`https://ui-avatars.com/api/?background=rgba(52, 168, 83, 1)&color=fff&font-size=0.48&length=3&name=M`}
                     alt=""
                     height={100}
                     width={100}
                  />
               </div>
               <div className="burger-icon scale-90 cursor-pointer">
                  <BurgerIcon />
               </div>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
