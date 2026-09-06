import { Metadata } from "next";
import JerseyDashboard from "./components/jerseyDashboard";

export const metadata: Metadata = {
  title: "Jersey Sales Dashboard | Weekend Football Group",
  description: "Units sold and order details for the WFG Home Jersey 2026.",
};

export default function JerseyDashboardPage() {
  return <JerseyDashboard />;
}
