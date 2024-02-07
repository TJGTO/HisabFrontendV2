import { useState, useEffect } from "react";
import { Typography, Avatar, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Menu from "@mui/material/Menu";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import ConfirmDialog from "../../Common/ConfirmDialog/confirmDialog";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import ViewDialog from "./viewDialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";
import {
  PlayerObjinGameList,
  updatePlayerStatusReqBody,
  colorListforStatus,
  colorListforStatusBG,
} from "../domain";
import { updatePlayerStatusInMatch } from "../../../lib/slices/gamemodule";

function ListRow({
  profilepictureurl,
  name,
  age,
  phoneNumber,
  position,
  classes,
  gameId,
  player_id,
  status,
  team,
}: PlayerObjinGameList) {
  const dispatch = useDispatch<AppDispatch>();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openViewDialog, setopenViewDialog] = useState<boolean>(false);
  const [openConfirmDialog, setopenConfirmDialog] = useState<boolean>(false);
  const [confirmHeaderText, setconfirmHeaderText] = useState<string>("");
  const [confirmTitleText, setconfirmTitleText] = useState<string>("");
  const [actionType, setactionType] = useState<string>("");

  const open = Boolean(anchorEl);
  const closeViewDialog = () => {
    setopenViewDialog(false);
  };
  const closeConfirmDialog = () => {
    setopenConfirmDialog(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onStatusChangeofPlayer = () => {
    const requestObj: updatePlayerStatusReqBody = {
      gameId: gameId,
      playerId: player_id,
      status: actionType,
    };
    dispatch(updatePlayerStatusInMatch(requestObj));
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <tr>
      <td className={`${classes}`}>
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
          <Typography color="blue-gray" className="font-normal dark:text-white">
            {position}
          </Typography>
        </div>
      </td>
      <td className={classes}>
        <div className="flex flex-col">
          <Typography color="blue-gray" className="font-normal dark:text-white">
            {age}
          </Typography>
        </div>
      </td>
      {/* <td className={classes}>
        <div className={`w-max ${colorListforStatusBG[status]} p-2 rounded-lg`}>
          {" "}
          <Typography
            color="blue-gray"
            className={`font-normal opacity-70 ${colorListforStatus[status]}`}
          >
            {status}
          </Typography>
        </div>
      </td> */}
      <td className={classes}>
        <div className={`w-max p-2 rounded-lg flex gap-3`}>
          <div className="flex items-center">
            <div
              className={`h-3.5 w-3.5 rounded-full ${colorListforStatusBG[status]} mr-2`}
            ></div>
            <Typography
              color="blue-gray"
              className="font-normal dark:text-white"
            >
              {" "}
              {status}
            </Typography>
          </div>
        </div>
      </td>
      <td className={classes}>
        <Typography color="blue-gray" className="font-normal dark:text-white">
          {team || ""}
        </Typography>
      </td>
      <td className={classes}>
        <div onClick={handleClick}>
          <Tooltip title="Edit User">
            <CreateIcon className="h-4 w-4 dark:text-white" />
          </Tooltip>
        </div>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem
            onClick={(e) => {
              e.preventDefault();
              setopenViewDialog(true);
            }}
          >
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            View
          </MenuItem>

          {status != "Removed" && (
            <>
              <Divider />
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setactionType("Removed");
                  setopenConfirmDialog(true);
                  setconfirmHeaderText("Do You really want to Remove?");
                  setconfirmTitleText("");
                }}
              >
                <ListItemIcon>
                  <PersonRemoveIcon fontSize="small" />
                </ListItemIcon>
                Remove
              </MenuItem>
            </>
          )}
          {status != "Withdrawn" && (
            <>
              <Divider />
              <MenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setactionType("Withdrawn");
                  setopenConfirmDialog(true);
                  setconfirmHeaderText("Do You really want to Withdraw?");
                  setconfirmTitleText("");
                }}
              >
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Withdraw
              </MenuItem>
            </>
          )}
        </Menu>
      </td>
      <ViewDialog
        open={openViewDialog}
        onClose={closeViewDialog}
        gameid={gameId}
        status={status}
        setactionType={setactionType}
        setConfirmDialogState={setopenConfirmDialog}
        setConfirmDialogHeader={setconfirmHeaderText}
        setConfirmDialogTitle={setconfirmTitleText}
      />
      <ConfirmDialog
        open={openConfirmDialog}
        headerText={confirmHeaderText}
        titleText={confirmTitleText}
        onClose={closeConfirmDialog}
        onConfirm={onStatusChangeofPlayer}
      />
    </tr>
  );
}

export default ListRow;
