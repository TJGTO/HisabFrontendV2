import { useState, useEffect } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import MenuItem from "@mui/material/MenuItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EditProfileDialog from "./editProfileDialog";
import EditAddressDialog from "./editAddressDialog";

function ProfileSection() {
  const [openSocialMediaDialog, setopenSocialMediaDialog] =
    useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openAddressDialog, setopenAddressDialog] = useState<boolean>(false);
  const handleClickOnEdit = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const closeEditSocialMediaDialog = () => {
    setopenSocialMediaDialog(false);
  };
  const closeEditAddressDialog = () => {
    setopenAddressDialog(false);
  };
  return (
    <div className="h-screen flex justify-center mt-6 ">
      <div className="flex-col gap-6">
        <div className="h-60 w-60">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png"
            alt="..."
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          John Doe{" "}
          <Tooltip title="Working Professional">
            <div>
              <WorkOutlineIcon />
            </div>
          </Tooltip>
          <Tooltip title="Student">
            <div>
              <SchoolIcon />
            </div>
          </Tooltip>
          <Tooltip title="Edit Profile">
            <div onClick={handleClickOnEdit}>
              {" "}
              <EditIcon className="cursor-pointer" />
            </div>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={(e) => setopenAddressDialog(true)}>
              Edit Addrerss & Name
            </MenuItem>
            <MenuItem onClick={(e) => setopenSocialMediaDialog(true)}>
              Edit Social Media
            </MenuItem>
          </Menu>
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          <MailOutlineIcon />
          john@gmail.com
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          <LocalPhoneIcon />
          7047241849
        </div>

        <div className="flex justify-center gap-5 mt-4 w-60">
          <FacebookIcon style={{ color: "#1877f2" }} />
          <InstagramIcon style={{ color: "#833AB4" }} />
          <YouTubeIcon style={{ color: "#FF0000" }} />
          <LocationOnIcon />
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          <CalendarMonthIcon />
          19/03/1998
        </div>
        <div className="flex flex-wrap gap-5 mt-4 w-60">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
      <EditProfileDialog
        open={openSocialMediaDialog}
        onClose={closeEditSocialMediaDialog}
      />
      <EditAddressDialog
        open={openAddressDialog}
        onClose={closeEditAddressDialog}
      />
    </div>
  );
}

export default ProfileSection;
