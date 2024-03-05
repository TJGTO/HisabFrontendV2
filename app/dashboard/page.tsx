import Slider from "./components/slider";
import Banner from "../Common/banner";
import StatisticsSection from "../Common/SectionComponents/statisticsSection";
import CardSection from "./components/cardSection";

export default function Page() {
  return (
    <>
      <Banner />
      <Slider />
      <StatisticsSection />
      <CardSection />
    </>
  );
}
