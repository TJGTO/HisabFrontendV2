import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import RootDesign from "./rootDesign";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WFG",
  description: "Weekend Football Group from Kolkata",
  keywords: ["Weekend Football", "Kolkata Football", "Weekend Football Group"],
  openGraph: {
    images: [
      {
        url: "https://firebasestorage.googleapis.com/v0/b/wfgkol2023.appspot.com/o/WFG%20(1).png?alt=media&token=4d23ecc0-81dc-4f03-9b13-dcb6e88a5d11",
        width: 500,
        height: 500,
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const pathname = usePathname();
  return (
    <html lang="en">
      <body>
        <RootDesign children={children} />
      </body>
    </html>
  );
}
