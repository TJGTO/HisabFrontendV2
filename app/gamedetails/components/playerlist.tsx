"use client";

import { useState, useEffect } from "react";
import CustomTable from "../../Common/Table/CustomTable";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import RegisterInGameDialog from "./registerDialog";
import UpiDetailsDialog from "./upiDetailsDialog";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import Swal from "sweetalert2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingDialog from "./settingDialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameDetails } from "../../../lib/slices/gamemodule";
import MessageBox from "./messageBox";
import PageLoader from "../../Common/Loader/pageLoader";
import ListRow from "./listRow";
import CreateTeamDialog from "./createTeamDialog";
import { Card, CardHeader, Input, Typography, Button } from "@mui/material";

const TableheaderArr = [
  { id: 1, label: "Player" },
  { id: 2, label: "Position" },
  { id: 3, label: "Age" },
  { id: 4, label: "Status" },
  { id: 5, label: "Team" },
  { id: 6, label: "Actions" },
];

function Playerist({ gameid }: { gameid: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [tablerows, settablerows] = useState<Array<JSX.Element>>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [openRegisterDialog, stopenRegisterDialog] = useState<boolean>(false);
  const [openPaymentDetails, setopenPaymentDetails] = useState<boolean>(false);
  const [openTeamDialog, setopenTeamDialog] = useState<boolean>(false);

  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  const gameDetailsLoader = useSelector(
    (state: RootState) => state.gameModel.gameDetailsLoader
  );
  const closeTeamDialog = () => {
    setopenTeamDialog(false);
  };
  const closeSettingDialog = () => {
    setopenDialog(false);
  };
  const closeRsgisterDialog = () => {
    stopenRegisterDialog(false);
  };
  const closePaymentDetailsDialog = () => {
    setopenPaymentDetails(false);
  };
  const dialogsafterSuccess = () => {
    closeRsgisterDialog();
    closeSettingDialog();
    closeTeamDialog();
  };
  useEffect(() => {
    if (gameid) {
      dispatch(fetchGameDetails(gameid));
    }
  }, []);

  useEffect(() => {
    if (gameDetails) {
      createTableRows();
    }
  }, [gameDetails]);

  const getNumbersofSlotLeft = () => {
    if (gameDetails) {
      return (
        gameDetails.number_of_players -
        gameDetails.players.filter((x) => x.status == "Approved").length
      );
    } else {
      return 0;
    }
  };
  const createTableRows = (): void => {
    let arr: JSX.Element[] = [];
    gameDetails?.players.forEach(
      (
        {
          profilepictureurl,
          name,
          age,
          phoneNumber,
          position,
          player_id,
          status,
          team,
        },
        index
      ) => {
        const isLast = index === gameDetails?.players.length - 1;
        let classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        const row: JSX.Element = (
          <ListRow
            profilepictureurl={profilepictureurl}
            name={name}
            age={age}
            phoneNumber={phoneNumber}
            position={position.toString()}
            classes={classes}
            gameId={gameid}
            player_id={player_id}
            status={status}
            team={team}
          />
        );
        arr.push(row);
      }
    );
    settablerows([...arr]);
  };
  const openLocationGoDialog = (link: string) => {
    Swal.fire({
      title: "Location Link",
      text: link,
      showCancelButton: true,
      confirmButtonText: "Go",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        window.open(link, "_blank");
        Swal.close();
      }
    });
  };
  return (
    <Card className="h-full w-full dark:bg-slate-800">
      <div className="ml-2 mr-2 mt-2">
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <Typography
              variant="h5"
              color="blue-gray"
              className="dark:text-white"
            >
              {gameDetails?.venueDetails.fieldName}{" "}
              {gameDetails?.venueDetails.location && (
                <LocationOnIcon
                  className="mb-2 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    openLocationGoDialog(
                      gameDetails?.venueDetails.location || ""
                    );
                  }}
                />
              )}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Date - {gameDetails?.date} , {gameDetails?.start_time} -{" "}
              {gameDetails?.end_time}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Total Capacity - {gameDetails?.number_of_players} Left -{" "}
              {getNumbersofSlotLeft()}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                stopenRegisterDialog(true);
              }}
            >
              Register
            </Button>
            <Button
              className="flex items-center gap-3"
              onClick={(e) => {
                e.preventDefault();
                setopenTeamDialog(true);
              }}
            >
              <AddIcon className="h-4 w-4" /> Create Team
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="flex items-center gap-2"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              setopenDialog(true);
            }}
          >
            Settings <SettingsIcon className="h-4 w-4" />
          </Button>
          <Button
            className="flex items-center gap-2"
            variant="outlined"
            onClick={(e) => {
              e.preventDefault();
              setopenPaymentDetails(true);
            }}
          >
            Payment Details
          </Button>
          {/* <div className="w-full md:w-72">
            <Input placeholder="Search" />
          </div> */}
        </div>
      </div>
      <div className="overflow-x-scroll px-0 ml-2 mr-2 mt-2">
        {tablerows.length > 0 && (
          <CustomTable tablehead={TableheaderArr} tablerows={tablerows} />
        )}
      </div>
      <SettingDialog
        open={openDialog}
        onClose={closeSettingDialog}
        gameid={gameid}
      />
      <RegisterInGameDialog
        open={openRegisterDialog}
        onClose={closeRsgisterDialog}
        gameid={gameid}
      />
      <MessageBox action={dialogsafterSuccess} />
      {gameDetailsLoader && <PageLoader />}
      <UpiDetailsDialog
        open={openPaymentDetails}
        onClose={closePaymentDetailsDialog}
        paymentNo={gameDetails?.paymentNo}
        upiId={gameDetails?.upiId}
      />
      <CreateTeamDialog
        gameid={gameid}
        open={openTeamDialog}
        onClose={closeTeamDialog}
      />
    </Card>
  );
}

export default Playerist;
