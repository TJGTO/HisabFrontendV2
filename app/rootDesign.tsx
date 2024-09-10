"use client";

import { usePathname } from "next/navigation";
import Provider from "./storeProvider";
import NavBar from "./nav/nav";
import Footer from "./Footer/footer";

const authorizationRoutes = [
  "/registration",
  "/login",
  "/resetpassword",
  "/forgotpassword",
];
function RootDesign({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthorizationRoute =
    authorizationRoutes.includes(pathname) ||
    pathname.startsWith("/forgotpassword/");
  return (
    <>
      {!isAuthorizationRoute && <NavBar />}
      <Provider>
        <div>{children}</div>
        {!isAuthorizationRoute && <Footer />}
      </Provider>
    </>
  );
}

export default RootDesign;
