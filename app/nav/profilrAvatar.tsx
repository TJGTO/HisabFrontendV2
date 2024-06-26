import React from "react";
import { createSortFromForAvator, stringToColor } from "../Common/functions";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { checkUserHaveRequiredRole } from "../Common/functions";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Logout from "@mui/icons-material/Logout";

function ProfileAvatar(props: {
  username: string | boolean | null | undefined;
  useremail: string | boolean | null | undefined;
}) {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const profilePictureURL = localStorage
    ? localStorage.getItem("profileURL")
    : "";
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const gotoProfilePage = () => {
    router.push("/profile");
  };
  const gotoDashboardPage = () => {
    router.push("/dashboard");
  };
  const gotoAdmin = () => {
    router.push("/membership");
  };
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
    handleClose();
  };
  return (
    <div>
      {" "}
      <Avatar
        onClick={handleClick}
        alt="Profile Picture"
        src={
          "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
          profilePictureURL
        }
        sx={{
          bgcolor: props.username
            ? stringToColor(props.username.toString())
            : "",
        }}
      >
        {props.username && createSortFromForAvator(props.username.toString())}
      </Avatar>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className="px-4 py-3 text-sm text-gray-900">
          <div>{props.username && props.username}</div>
          <div className="font-medium truncate">
            {props.useremail && props.useremail}
          </div>
        </div>
        <Divider />
        <MenuItem onClick={gotoDashboardPage}>Dashboard</MenuItem>
        <MenuItem onClick={gotoProfilePage}>Profile</MenuItem>
        {checkUserHaveRequiredRole(["Admin"]) && (
          <MenuItem onClick={gotoAdmin}>Admin</MenuItem>
        )}
        <Divider />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProfileAvatar;
