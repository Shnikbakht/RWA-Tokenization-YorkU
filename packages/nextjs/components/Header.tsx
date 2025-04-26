"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardSelector from "./DashboardSelector";
import { SwitchTheme } from "./SwitchTheme";
import { FaEthereum } from "react-icons/fa";
import Image from "next/image";


interface HeaderMenuLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuLinks: HeaderMenuLink[] = [
    { label: "Home", href: "/" },
    { label: "Invest", href: "/invest" },
    { label: "Tokenize", href: "/tokenize" },
    { label: "Marketplace", href: "/marketplace" },
    { label: "Contact Us", href: "/contract-us" },
    { label: "About", href: "/about" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-base-100/90 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="navbar container mx-auto px-4 min-h-16">
        {/* Mobile menu button */}
        <div className="flex-none lg:hidden">
          <label
            htmlFor="drawer-toggle"
            className="btn btn-square btn-ghost"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>

        {/* Logo & Brand */}

        <div className="flex-1">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-14 h-14 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/Logo4.png"
                alt="NikTokenize Logo"
                layout="fill"
                objectFit="cover"
                className="p-1"
              />
            </div>
            <div className="font-display font-bold text-2xl tracking-tight">
              <span className="text-estate-300 group-hover:text-estate-400 transition-colors duration-300">Nik</span>
              <span className="text-token-red group-hover:text-red-500 transition-colors duration-300">Tokenize</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="flex-none hidden lg:flex items-center gap-4">
          <ul className="menu menu-horizontal gap-2">
            {menuLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`rounded-lg hover:bg-estate-500 px-4 transition-all ${
                    pathname === href ? "font-semibold text-estate-200" : "text-estate-100"
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/connect" className="btn btn-primary btn-sm rounded-lg ml-2">
                Connect Wallet
              </Link>
            </li>
          </ul>

          {/* Role Selector  */}
          <div className="flex items-center gap-4">
            <DashboardSelector currentRole="issuer" />
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200 ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg z-50 transform transition-transform duration-200 lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-base-300">
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsDrawerOpen(false)}>
            <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-estate-400">
              <FaEthereum className="text-white text-xl" />
            </div>
            <div className="font-display font-bold text-xl">
              <span className="text-estate-300">Token</span>
              <span className="text-token-red">Estate</span>
            </div>
          </Link>
        </div>
        <ul className="menu p-4">
          {menuLinks.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={`${pathname === href ? "font-semibold bg-estate-500/20" : ""}`}
                onClick={() => setIsDrawerOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="mt-4">
            <Link
              href="/connect"
              className="btn btn-primary btn-sm justify-center"
              onClick={() => setIsDrawerOpen(false)}
            >
              Connect Wallet
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FaEthereum } from "react-icons/fa";
// import { SwitchTheme } from "./SwitchTheme";
// import DashboardSelector from './DashboardSelector';

// interface HeaderMenuLink {
//   label: string;
//   href: string;
//   icon?: React.ReactNode;
// }

// export const Header = () => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [isScrolled, setIsScrolled] = useState(false);
//   const pathname = usePathname();

//   // Handle scroll effect for navbar
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const menuLinks: HeaderMenuLink[] = [
//     { label: "Home", href: "/" },
//     { label: "Marketplace", href: "/marketplace" },
//     { label: "Dashboard", href: "/dashboard" },
//     { label: "About", href: "/about" },
//   ];

//   return (
//     <div className={`sticky top-0 z-50 w-full transition-all duration-200 ${isScrolled ? "bg-base-100/90 backdrop-blur-md shadow-md" : "bg-transparent"}`}>
//       <div className="navbar container mx-auto px-4 min-h-16">
//         {/* Mobile menu button */}
//         <div className="flex-none lg:hidden">
//           <label
//             htmlFor="drawer-toggle"
//             className="btn btn-square btn-ghost"
//             onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               className="inline-block w-6 h-6 stroke-current"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M4 6h16M4 12h16M4 18h16"
//               />
//             </svg>
//           </label>
//         </div>

//         {/* Logo & Brand */}
//         <div className="flex-1">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-estate-400">
//               <FaEthereum className="text-white text-xl" />
//             </div>
//             <div className="font-display font-bold text-xl tracking-tight">
//               <span className="text-estate-300">Token</span>
//               <span className="text-token-red">Estate</span>
//             </div>
//           </Link>
//         </div>

//         {/* Desktop Navigation */}
//         <div className="flex-none hidden lg:block">
//           <ul className="menu menu-horizontal gap-2">
//             {menuLinks.map(({ label, href }) => (
//               <li key={href}>
//                 <Link
//                   href={href}
//                   className={`rounded-lg hover:bg-estate-500 px-4 transition-all ${
//                     pathname === href ? "font-semibold text-estate-200" : "text-estate-100"
//                   }`}
//                 >
//                   {label}
//                 </Link>
//               </li>
//             ))}
//             <li>
//               <Link
//                 href="/connect"
//                 className="btn btn-primary btn-sm rounded-lg ml-2"
//               >
//                 Connect Wallet
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Theme Toggle */}
//         <div className="flex-none gap-2">
//           <SwitchTheme />
//         </div>
//       </div>

//       {/* Mobile Drawer */}
//       <div className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-200 ${
//         isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//       }`} onClick={() => setIsDrawerOpen(false)} />

//       <div className={`fixed top-0 left-0 h-full w-64 bg-base-200 shadow-lg z-50 transform transition-transform duration-200 lg:hidden ${
//         isDrawerOpen ? "translate-x-0" : "-translate-x-full"
//       }`}>
//         <div className="p-4 border-b border-base-300">
//           <Link href="/" className="flex items-center gap-2" onClick={() => setIsDrawerOpen(false)}>
//             <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-estate-400">
//               <FaEthereum className="text-white text-xl" />
//             </div>
//             <div className="font-display font-bold text-xl">
//               <span className="text-estate-300">Token</span>
//               <span className="text-token-red">Estate</span>
//             </div>
//           </Link>
//         </div>
//         <ul className="menu p-4">
//           {menuLinks.map(({ label, href }) => (
//             <li key={href}>
//               <Link
//                 href={href}
//                 className={`${pathname === href ? "font-semibold bg-estate-500/20" : ""}`}
//                 onClick={() => setIsDrawerOpen(false)}
//               >
//                 {label}
//               </Link>
//             </li>
//           ))}
//           <li className="mt-4">
//             <Link
//               href="/connect"
//               className="btn btn-primary btn-sm justify-center"
//               onClick={() => setIsDrawerOpen(false)}
//             >
//               Connect Wallet
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };
