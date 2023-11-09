import Slider from "./components/slider";
import CardSection from "./components/cardSection";

export default function Page() {
  return (
    <>
      <h1 className="bg-sky-500">Dashboard</h1>
      <Slider />
      <CardSection />
    </>
  );
}
