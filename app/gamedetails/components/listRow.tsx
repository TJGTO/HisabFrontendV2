import { useState, useEffect } from "react";
import { Typography, Avatar, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Menu from "@mui/material/Menu";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import Link from "next/link";
import useAuth from "../../Common/customHooks/useAuth";
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
  paymentImageurl,
  phoneNumber,
  position,
  classes,
  gameId,
  player_id,
  status,
  team,
  player_type,
  foodtype,
  matchType,
}: PlayerObjinGameList) {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggedIn, token] = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openViewDialog, setopenViewDialog] = useState<boolean>(false);
  const [openConfirmDialog, setopenConfirmDialog] = useState<boolean>(false);
  const [confirmHeaderText, setconfirmHeaderText] = useState<string>("");
  const [confirmTitleText, setconfirmTitleText] = useState<string>("");
  const [actionType, setactionType] = useState<string>("");

  const permissionMatrix = useSelector(
    (state: RootState) => state.gameModel.permissionMatrix
  );

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
      phoneNo: "+91" + phoneNumber,
    };
    dispatch(updatePlayerStatusInMatch(requestObj));
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <tr>
      <td className={`${classes}`}>
        <Link href={`/profile/${player_id}`} target="_blank">
          <div className="flex items-center gap-3 cursor-pointer">
            <Avatar
              src={
                "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
                profilepictureurl
              }
              alt={name}
            />
            <div className="flex flex-col cursor-pointer hover:underline">
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
        </Link>
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
      {matchType && matchType == "Tournament" && (
        <td className={classes}>
          <Typography color="blue-gray" className="font-normal dark:text-white">
            {foodtype || ""}
          </Typography>
        </td>
      )}
      {matchType && matchType == "Tournament" && (
        <td className={classes}>
          <Typography color="blue-gray" className="font-normal dark:text-white">
            {player_type || ""}
          </Typography>
        </td>
      )}
      {matchType && matchType != "Tournament" && (
        <td className={classes}>
          <Typography color="blue-gray" className="font-normal dark:text-white">
            {team || ""}
          </Typography>
        </td>
      )}
      <td className={classes}>
        {isLoggedIn &&
          (permissionMatrix.editSetting ||
            permissionMatrix.player_id == player_id) && (
            <div onClick={handleClick}>
              <Tooltip title="Edit User">
                <CreateIcon className="h-4 w-4 dark:text-white" />
              </Tooltip>
            </div>
          )}

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

          {status != "Removed" && permissionMatrix.approveOrReject && (
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
          {status != "Withdrawn" && permissionMatrix.approveOrReject && (
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
        player_id={player_id}
        setactionType={setactionType}
        paymentImageurl={paymentImageurl}
        actionsPflag={permissionMatrix.approveOrReject}
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
