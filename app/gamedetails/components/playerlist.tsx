"use client";

import { useState, useEffect } from "react";
import CustomTable from "../../Common/Table/CustomTable";
import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import CreateIcon from "@mui/icons-material/Create";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "./tabs";
import SettingDialog from "./settingDialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchGameDetails } from "../../../lib/slices/gamemodule";

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

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    email: "john@creative-tim.com",
    job: "Manager",
    org: "Organization",
    online: true,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    email: "alexa@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: false,
    date: "23/04/18",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    email: "laurent@creative-tim.com",
    job: "Executive",
    org: "Projects",
    online: false,
    date: "19/09/17",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    email: "michael@creative-tim.com",
    job: "Programator",
    org: "Developer",
    online: true,
    date: "24/12/08",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    email: "richard@creative-tim.com",
    job: "Manager",
    org: "Executive",
    online: false,
    date: "04/10/21",
  },
];

function Playerist({ gameid }: { gameid: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [tablerows, settablerows] = useState<Array<JSX.Element>>([]);
  const [openDialog, setopenDialog] = useState<boolean>(false);
  const gameDetails = useSelector(
    (state: RootState) => state.gameModel.gameDetails
  );

  const closeSettingDialog = () => {
    setopenDialog(false);
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
        const isLast = index === TABLE_ROWS.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
        const row: JSX.Element = (
          <tr key={name}>
            <td className={classes}>
              <div className="flex items-center gap-3">
                <Avatar src={profilepictureurl} alt={name} />
                <div className="flex flex-col">
                  <Typography
                    color="blue-gray"
                    className="font-normal dark:text-white"
                  >
                    {name}
                  </Typography>
                  <Typography
                    color="blue-gray"
                    className="font-normal opacity-70 dark:text-white"
                  >
                    {phoneNumber}
                  </Typography>
                </div>
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  {position}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <div className="flex flex-col">
                <Typography
                  color="blue-gray"
                  className="font-normal dark:text-white"
                >
                  {age}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <div className="w-max">
                {" "}
                <Typography
                  color="blue-gray"
                  className="font-normal opacity-70 dark:text-white"
                >
                  {"Paid"}
                </Typography>
              </div>
            </td>
            <td className={classes}>
              <Typography
                color="blue-gray"
                className="font-normal dark:text-white"
              >
                {"5"}
              </Typography>
            </td>
            <td className={classes}>
              <Tooltip title="Edit User">
                <CreateIcon className="h-4 w-4 dark:text-white" />
              </Tooltip>
            </td>
          </tr>
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
            <Button variant="outlined">Register</Button>
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
    </Card>
  );
}

export default Playerist;
