"use client";

import { useEffect, useState } from "react";

function useAuth() {
  const [isLoggedIn, setisLoggedIn] = useState<boolean>(false);
  const [token, settoken] = useState<string | null>(null);

  useEffect(() => {
    const Ctoken = localStorage.getItem("token");
    const CisLoggedIn = Ctoken ? true : false;
    setisLoggedIn(CisLoggedIn);
    settoken(Ctoken);
  }, []);

  return [isLoggedIn, token];
}

export default useAuth;
