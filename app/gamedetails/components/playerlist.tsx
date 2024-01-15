"use client";

import { useState, useEffect } from "react";
import CustomTable from "../../Common/Table/CustomTable";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import RegisterInGameDialog from "./registerDialog";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import SettingDialog from "./settingDialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameDetails } from "../../../lib/slices/gamemodule";
import MessageBox from "./messageBox";
import PageLoader from "../../Common/Loader/pageLoader";
import ListRow from "./listRow";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  Chip,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";

const TableheaderArr = [
  { id: 1, label: "Player" },
  { id: 2, label: "Position" },
  { id: 3, label: "Age" },
  { id: 4, label: "Status" },
  { id: 5, label: "Rating" },
  { id: 6, label: "Actions" },
];

function Playerist({ gameid }: { gameid: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [tablerows, settablerows] = useState<Array<JSX.Element>>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const [openRegisterDialog, stopenRegisterDialog] = useState<boolean>(false);

  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );
  const gameDetailsLoader = useSelector(
    (state: RootState) => state.gameModel.gameDetailsLoader
  );
  const closeSettingDialog = () => {
    setopenDialog(false);
  };

  const closeRsgisterDialog = () => {
    stopenRegisterDialog(false);
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
      return gameDetails.number_of_players - gameDetails.players.length;
    } else {
      return 0;
    }
  };
  const createTableRows = (): void => {
    let arr: JSX.Element[] = [];
    gameDetails?.players.forEach(
      ({ profilepictureurl, name, age, phoneNumber, position }, index) => {
        const isLast = index === gameDetails?.players.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        const row: JSX.Element = (
          <ListRow
            profilepictureurl={profilepictureurl}
            name={name}
            age={age}
            phoneNumber={phoneNumber}
            position={position.toString()}
            classes={classes}
          />
        );
        arr.push(row);
      }
    );
    settablerows([...arr]);
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
              {gameDetails?.venue}
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
            <Button className="flex items-center gap-3">
              <AddIcon className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* <Tabs /> */}
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
      <SettingDialog open={openDialog} onClose={closeSettingDialog} />
      <RegisterInGameDialog
        open={openRegisterDialog}
        onClose={closeRsgisterDialog}
        gameid={gameid}
      />
      <MessageBox action={closeRsgisterDialog} />
      {gameDetailsLoader && <PageLoader />}
    </Card>
  );
}

export default Playerist;
