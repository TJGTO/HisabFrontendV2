"use client";
import React, { useState } from "react";

export default function NavBar() {
  let Links = [
    { name: "HOME", link: "/home" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  let [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="shadow-md w-full staic top-0 left-0 ">
        <div className="md:flex items-center justify-between bg-[#c8d6e1] py-4 md:px-10 px-7">
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            =
          </div>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-[#c8d6e1] md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 
             transition-all duration-500 ease-in ${
               open ? "top-20 " : "top-[-490px]"
             }`}
          >
            {Links.map((link) => (
              <li key={link.name} className="md:ml-8 text-xl md:my-0 my-7">
                <a
                  href={link.link}
                  className="text-gray-800 hover:text-gray-400 duration-500"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <button className="bg-sky-500 hover:bg-cyan-600 p-2 rounded-lg space-x-1.5">
            Get Started
          </button>
        </div>
      </div>
    </>
  );
}
