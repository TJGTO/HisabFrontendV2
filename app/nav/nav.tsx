"use client";

import React, { useState, useEffect } from "react";
import WFGLogo from "../Common/logo";
import ProfileAvatar from "./profilrAvatar";
import useAuth from "../Common/customHooks/useAuth";
import { useRouter } from "next/navigation";

export default function NavBar() {
  let Links = [
    { name: "HOME", link: "/home" },
    { name: "SERVICE", link: "/" },
    { name: "ABOUT", link: "/" },
    { name: "BLOG'S", link: "/" },
    { name: "CONTACT", link: "/" },
  ];
  const router = useRouter();
  const [isLoggedIn, token, fullname, email] = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div className="shadow-md w-full staic top-0 left-0 ">
        <div className="flex items-center justify-between bg-[#c8d6e1] py-4 md:px-10 px-7 ">
          <div
            onClick={(e) => {
              router.push("/dashboard");
            }}
            className="flex cursor-pointer"
          >
            <WFGLogo />
            <div className="mt-2 ml-2">
              <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                Beta
              </span>
            </div>
            <div className="mt-2 ml-2 text-lg text-zinc-600 font-medium hidden lg:block">
              Weekend Football Group
            </div>
          </div>

          {/* <div
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
          </ul> */}
          {!isLoggedIn ? (
            <button
              className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 p-2 space-x-1.5"
              onClick={(e) => {
                router.push("/login");
              }}
            >
              Login
            </button>
          ) : (
            <ProfileAvatar username={fullname} useremail={email} />
          )}
        </div>
      </div>
    </>
  );
}
