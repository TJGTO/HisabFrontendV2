"use client";

import { useEffect } from "react";
import Card from "./card";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import CreateMatchDialog from "./createMatchDialog";
import { Creator } from "../domain";
import { openDialog, closeDialog } from "../../../lib/slices/dashboard";
import { fetchActiveGames } from "../../../lib/slices/gamemodule";
import CreatematchCard from "./creatematchCard";

function CardSection() {
  const openFlag = useSelector((state: RootState) => state.dashboard.open);
  const dispatch = useDispatch<AppDispatch>();

  const gameLoader = useSelector(
    (state: RootState) => state.gameModel.gameLoader
  );
  const errorOnCreation = useSelector(
    (state: RootState) => state.gameModel.errorOnCreation
  );
  const gameCreationMessage = useSelector(
    (state: RootState) => state.gameModel.gameCreationMessage
  );
  const activeGames = useSelector(
    (state: RootState) => state.gameModel.activeGames
  );

  useEffect(() => {
    dispatch(fetchActiveGames());
  }, []);

  useEffect(() => {
    console.log("activeGames", activeGames);
  }, [activeGames]);

  useEffect(() => {
    if (!gameLoader && gameCreationMessage) {
      if (!errorOnCreation) handleClose();
      Swal.fire({
        icon: errorOnCreation ? "error" : "success",
        title: gameCreationMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [gameLoader, gameCreationMessage]);

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
        {activeGames.map((x, index) => (
          <Card
            key={index}
            cardId={"1"}
            URL={"https://picsum.photos/600/400/?random"}
            venue={x.venue}
            date={x.date}
            startTime={x.start_time}
            endTime={x.end_time}
            creator={creator}
            price={x.price}
          />
        ))}
      </div>
      <CreateMatchDialog open={openFlag} onClose={handleClose} />
    </div>
  );
}

export default CardSection;
