import { Metadata } from "next";
import JerseyProduct from "./components/jerseyProduct";

export const metadata: Metadata = {
  title: "WFG Home Jersey 2026 | Weekend Football Group",
  description:
    "Official WFG Home Jersey 2026. Breathable matchday fabric, available in sizes XS to XXXL.",
};

export default function ProductJerseyPage() {
  return <JerseyProduct />;
}
