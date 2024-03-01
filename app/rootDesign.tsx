"use client";

import { usePathname } from "next/navigation";
import Provider from "./storeProvider";
import NavBar from "./nav/nav";
import Footer from "./Footer/footer";

const authorizationRoutes = ["/registration", "/login", , "/resetpassword"];
function RootDesign({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      {!authorizationRoutes.includes(pathname) && <NavBar />}
      <Provider>
        <div>{children}</div>
        {!authorizationRoutes.includes(pathname) && <Footer />}
      </Provider>
    </>
  );
}

export default RootDesign;
