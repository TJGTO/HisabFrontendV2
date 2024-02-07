"use client";

import { useEffect } from "react";
import Card from "./card";
import Swal from "sweetalert2";
import Tooltip from "@mui/material/Tooltip";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../../lib/store";
import CreateMatchDialog from "./createMatchDialog";
import { Creator } from "../domain";
import { useRouter } from "next/navigation";
import { VenueDetailsforCard } from "../../gamedetails/domain";
import { openDialog, closeDialog } from "../../../lib/slices/dashboard";
import useAuth from "@/app/Common/customHooks/useAuth";
import { fetchActiveGames, resetFlags } from "../../../lib/slices/gamemodule";
import CreatematchCard from "./creatematchCard";

function CardSection() {
  const openFlag = useSelector((state: RootState) => state.dashboard.open);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [isLoggedIn] = useAuth();

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
  console.log("activeGames", activeGames);
  useEffect(() => {
    dispatch(fetchActiveGames());
  }, []);

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
    dispatch(resetFlags());
  };
  const openMatchCreateDialog = () => {
    dispatch(openDialog());
  };
  const creator: Creator = {
    firstName: "Tathagata Mondal",
    profileImageURL: "https://picsum.photos/32/32/?random",
    id: "tiuer8444444444444444569",
  };
  const gotoPage = (link: string) => {
    router.push(link);
  };
  const getImageOfGame = (venuedetails: VenueDetailsforCard) => {
    if (venuedetails.images && venuedetails.images.length > 0) {
      return venuedetails.images[0];
    }
    return "";
  };
  return (
    <div>
      <div className="container flex gap-3 mx-auto px-4 md:px-12">
        <p className="text-lg font-bold">Active Matches</p>
        <div
          className="my-0.5 cursor-pointer"
          onClick={(e) => {
            openMatchCreateDialog();
          }}
        >
          {isLoggedIn && (
            <Tooltip title="Create a Match">
              <AddCircleIcon style={{ color: "#0051d3" }} />
            </Tooltip>
          )}
        </div>
      </div>
      <div className="container my-4 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {activeGames.map((x, index) => (
            <Card
              key={index}
              cardId={x.gameId}
              URL={getImageOfGame(x.venueDetails)}
              venue={x.venueDetails.fieldName}
              date={x.date}
              startTime={x.start_time}
              endTime={x.end_time}
              creator={creator}
              price={x.price}
              gotoPage={gotoPage}
            />
          ))}
        </div>
        <CreateMatchDialog open={openFlag} onClose={handleClose} />
      </div>
    </div>
  );
}

export default CardSection;
