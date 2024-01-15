import { Typography, Avatar, Tooltip } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import Menu from "@mui/material/Menu";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { PlayerObjinGameList } from "../domain";

function ListRow({
  profilepictureurl,
  name,
  age,
  phoneNumber,
  position,
  classes,
}: PlayerObjinGameList) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  return (
    <tr>
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
        <Typography color="blue-gray" className="font-normal dark:text-white">
          {"5"}
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
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <VisibilityIcon fontSize="small" />
            </ListItemIcon>
            View
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <PersonRemoveIcon fontSize="small" />
            </ListItemIcon>
            Remove
          </MenuItem>
        </Menu>
      </td>
    </tr>
  );
}

export default ListRow;
