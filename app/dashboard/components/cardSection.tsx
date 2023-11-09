"use client";

import Card from "./card";
import { Creator } from "../domain";

function CardSection() {
  const creator: Creator = {
    firstName: "Tathagata Mondal",
    profileImageURL: "https://picsum.photos/32/32/?random",
    id: "tiuer8444444444444444569",
  };
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        {Array(10)
          .fill(5)
          .map((x, index) => (
            <Card
              key={index}
              cardId={"1"}
              URL={"https://picsum.photos/600/400/?random"}
              venue={"Jawpur, Dumdum"}
              date={"11/1/19"}
              creator={creator}
            />
          ))}
      </div>
    </div>
  );
}

export default CardSection;
