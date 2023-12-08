"use client";

import Card from "./card";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import CreateMatchDialog from "./createMatchDialog";
import { Creator } from "../domain";
import { openDialog, closeDialog } from "../../../lib/slices/dashboard";
import CreatematchCard from "./creatematchCard";

function CardSection() {
  const openFlag = useSelector((state: RootState) => state.dashboard.open);
  const dispatch = useDispatch<AppDispatch>();
  const handleClose = () => {
    dispatch(closeDialog());
  };
  const creator: Creator = {
    firstName: "Tathagata Mondal",
    profileImageURL: "https://picsum.photos/32/32/?random",
    id: "tiuer8444444444444444569",
  };
  return (
    <div className="container my-12 mx-auto px-4 md:px-12">
      <div className="flex flex-wrap -mx-1 lg:-mx-4">
        <CreatematchCard />
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
      <CreateMatchDialog open={openFlag} onClose={handleClose} />
    </div>
  );
}

export default CardSection;
