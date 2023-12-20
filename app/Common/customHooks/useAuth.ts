"use client";

import { useEffect, useState } from "react";

function useAuth() {
  const [isLoggedIn, setisLoggedIn] = useState<boolean | undefined>(undefined);
  const [token, settoken] = useState<string | null>(null);
  const [fullname, setfullname] = useState<string | null>(null);
  const [email, setemail] = useState<string | null>(null);

  useEffect(() => {
    const Ctoken = localStorage.getItem("token");
    const CisLoggedIn = Ctoken ? true : false;
    setisLoggedIn(CisLoggedIn);
    settoken(Ctoken);
    setfullname(localStorage.getItem("fullname") || null);
    setemail(localStorage.getItem("email") || null);
  }, []);

  return [isLoggedIn, token, fullname, email];
}

export default useAuth;
