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
import { downloadExcelFile } from "../../Common/functions";
import CircularProgress from "@mui/material/CircularProgress";
import AddPlayersDialog from "./addPlayers";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useRouter } from "next/navigation";
import useAuth from "../../Common/customHooks/useAuth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingDialog from "./settingDialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { downloadExcelofPlayers } from "../service";
import {
  fetchGameDetails,
  fetchGamePermission,
} from "../../../lib/slices/gamemodule";
import MessageBox from "./messageBox";
import PageLoader from "../../Common/Loader/pageLoader";
import ListRow from "./listRow";
import CreateTeamDialog from "./createTeamDialog";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Card, CardHeader, Input, Typography, Button } from "@mui/material";

interface TableHeaderObj {
  id: number;
  label: string;
}
function Playerist({ gameid }: { gameid: string }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [excelloader, setexcelloader] = useState(false);
  const [tablerows, settablerows] = useState<Array<JSX.Element>>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [openRegisterDialog, stopenRegisterDialog] = useState<boolean>(false);
  const [openPaymentDetails, setopenPaymentDetails] = useState<boolean>(false);
  const [openTeamDialog, setopenTeamDialog] = useState<boolean>(false);
  const [openAddPDialog, setopenAddPDialog] = useState<boolean>(false);
  const [TableHeaderArr, setTableHeaderArr] = useState<Array<TableHeaderObj>>(
    []
  );
  const [isLoggedIn, token] = useAuth();

  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  const gameDetailsLoader = useSelector(
    (state: RootState) => state.gameModel.gameDetailsLoader
  );
  const permissionMatrix = useSelector(
    (state: RootState) => state.gameModel.permissionMatrix
  );
  const closeAddPlayersDialog = () => {
    setopenAddPDialog(false);
  };
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
  const setTableHeaderColumns = () => {
    if (gameDetails && gameDetails.matchType == "Tournament") {
      let count = 3;
      let ObjArr = [
        { id: 1, label: "SL No." },
        { id: 2, label: "Player" },
        { id: 3, label: "Age" },
      ];
      gameDetails.otherFormFields?.forEach((element, index) => {
        count = count + 1;
        ObjArr.push({ id: count + index, label: element.name });
      });
      ObjArr.push({ id: count + 1, label: "Status" });
      ObjArr.push({ id: count + 1, label: "Actions" });
      setTableHeaderArr(ObjArr);
    } else {
      setTableHeaderArr([
        { id: 1, label: "SL No." },
        { id: 2, label: "Player" },
        { id: 3, label: "Position" },
        { id: 4, label: "Age" },
        { id: 5, label: "Status" },
        { id: 6, label: "Team" },
        { id: 7, label: "Actions" },
      ]);
    }
  };
  useEffect(() => {
    if (gameid) {
      dispatch(fetchGameDetails(gameid));
    }
  }, []);

  useEffect(() => {
    if (gameid && isLoggedIn) {
      dispatch(fetchGamePermission(gameid));
    }
  }, [token]);

  useEffect(() => {
    if (gameDetails) {
      createTableRows();
      setTableHeaderColumns();
    }
  }, [gameDetails]);

  const getNumbersofSlotLeft = (): number => {
    if (gameDetails) {
      return (
        gameDetails.number_of_players -
        gameDetails.players.filter((x) => x.status == "Approved").length
      );
    } else {
      return 0;
    }
  };
  const openRegisterDialogAfterCheck = () => {
    if (isLoggedIn) {
      stopenRegisterDialog(true);
    } else {
      Swal.fire({
        title: "Please login to register in game",
        showCancelButton: true,
        confirmButtonText: "Go",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.close();
          router.push("/login");
        }
      });
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
          paymentImageurl,
          phoneNumber,
          dynamicFields,
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
            slno={index + 1}
            profilepictureurl={profilepictureurl}
            name={name}
            age={age}
            paymentImageurl={paymentImageurl}
            phoneNumber={phoneNumber}
            classes={classes}
            gameId={gameid}
            player_id={player_id}
            status={status}
            team={team}
            dynamicFields={dynamicFields}
            otherFormFields={gameDetails.otherFormFields}
            matchType={gameDetails.matchType || ""}
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
  const downloadExcel = async () => {
    try {
      setexcelloader(true);
      const response = await downloadExcelofPlayers(gameid);
      setexcelloader(false);
    } catch (error: any) {
      setexcelloader(false);
      console.log(error.message);
    }
  };
  return (
    <section className="h-full w-full dark:bg-slate-800">
      <div className="ml-2 mr-2 mt-2">
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
        </div>
        <div className="mb-4 flex items-center justify-between gap-8">
          <div>
            <div className="flex flex-col sm:flex-row">
              <Typography color="gray" className="mt-1 font-normal">
                Date - {gameDetails?.date} ,
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                {gameDetails?.start_time} - {gameDetails?.end_time}
              </Typography>
            </div>
            <div className="flex flex-col sm:flex-row">
              <Typography color="gray" className="mt-1 font-normal">
                Total Capacity - {gameDetails?.number_of_players} ,
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Left - {getNumbersofSlotLeft()} , {gameDetails?.status}
              </Typography>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {gameDetails?.status == "Active" && (
              <Button
                variant="outlined"
                onClick={(e) => {
                  e.preventDefault();
                  openRegisterDialogAfterCheck();
                }}
              >
                Register
              </Button>
            )}
            {permissionMatrix?.excelDownload && (
              <Button
                variant="outlined"
                disabled={excelloader}
                onClick={(e) => {
                  e.preventDefault();
                  downloadExcel();
                }}
              >
                {excelloader ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  "Download"
                )}
              </Button>
            )}
            {gameDetails?.status == "Active" &&
              gameDetails?.matchType != "Tournament" && (
                <Button
                  className="flex items-center gap-3"
                  onClick={(e) => {
                    e.preventDefault();
                    setopenTeamDialog(true);
                  }}
                >
                  {permissionMatrix.editTeam ? (
                    <>
                      <AddIcon className="h-4 w-4" /> Create Team
                    </>
                  ) : (
                    <>
                      <RemoveRedEyeIcon className="h-4 w-4" /> View Team
                    </>
                  )}
                </Button>
              )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {permissionMatrix.editSetting && (
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
          )}
          {permissionMatrix.editSetting && (
            <Button
              className="flex items-center gap-2"
              variant="outlined"
              onClick={(e) => {
                e.preventDefault();
                setopenAddPDialog(true);
              }}
            >
              Add Players <PersonAddIcon className="h-4 w-4" />
            </Button>
          )}
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
          <CustomTable tablehead={TableHeaderArr} tablerows={tablerows} />
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
        matchType={gameDetails?.matchType}
      />
      <MessageBox action={dialogsafterSuccess} />
      {gameDetailsLoader && <PageLoader />}
      <UpiDetailsDialog
        open={openPaymentDetails}
        onClose={closePaymentDetailsDialog}
        paymentNo={gameDetails?.paymentNo}
        upiId={gameDetails?.upiId}
        price={gameDetails?.price}
        paymentOptions={gameDetails?.paymentOptions}
      />
      <CreateTeamDialog
        gameid={gameid}
        open={openTeamDialog}
        onClose={closeTeamDialog}
        editPermission={permissionMatrix.editTeam}
      />
      <AddPlayersDialog
        gameid={gameid}
        open={openAddPDialog}
        onClose={closeAddPlayersDialog}
      />
    </section>
  );
}

export default Playerist;
