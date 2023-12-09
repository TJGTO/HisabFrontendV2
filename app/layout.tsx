import "./globals.css";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import Provider from "./storeProvider";
import NavBar from "./nav/nav";

const inter = Inter({ subsets: ["latin"] });

const authorizationRoutes = ["/registration", "/login"];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        {!authorizationRoutes.includes(pathname) && <NavBar />}
        <Provider>
          <div>{children}</div>
        </Provider>
      </body>
    </html>
  );
}
