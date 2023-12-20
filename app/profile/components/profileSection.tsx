"use client";
import { useState, useEffect } from "react";
import useAuth from "@/app/Common/customHooks/useAuth";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import { redirect } from "next/navigation";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import SchoolIcon from "@mui/icons-material/School";
import MenuItem from "@mui/material/MenuItem";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { createAddressStringFromObj, fromatDate } from "../../Common/functions";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import Swal from "sweetalert2";
import {
  fetchAllStates,
  fetchUserDetails,
  resetFlags,
} from "../../../lib/slices/profileSection";
import EditProfileDialog from "./editProfileDialog";
import EditAddressDialog from "./editAddressDialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

function ProfileSection() {
  const [openSocialMediaDialog, setopenSocialMediaDialog] =
    useState<boolean>(false);
  const userProfile = useSelector(
    (state: RootState) => state.profileSection.userProfile
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggedIn, token] = useAuth();
  const [openAddressDialog, setopenAddressDialog] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchAllStates());
    dispatch(fetchUserDetails());
    return () => {
      dispatch(resetFlags());
    };
  }, []);

  useEffect(() => {
    if (isLoggedIn != undefined) {
      if (!isLoggedIn) {
        redirect("/dashboard");
      }
    }
    console.log("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

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
  const fireALertWithValue = (value: string | undefined) => {
    Swal.fire(value ? value : "");
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
          {userProfile?.firstName + " " + userProfile?.lastName}
          {userProfile?.academic == "Working Professional" && (
            <Tooltip title="Working Professional">
              <div>
                <WorkOutlineIcon />
              </div>
            </Tooltip>
          )}
          {userProfile?.academic == "Student" && (
            <Tooltip title="Student">
              <div>
                <SchoolIcon />
              </div>
            </Tooltip>
          )}
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
        {userProfile?.email && (
          <div className="flex justify-center gap-2 mt-4 w-60">
            <MailOutlineIcon />
            {userProfile?.email}
          </div>
        )}
        {userProfile?.phone_no && (
          <div className="flex justify-center gap-2 mt-4 w-60">
            <LocalPhoneIcon />
            {userProfile?.phone_no}
          </div>
        )}
        <div className="flex justify-center gap-5 mt-4 w-60">
          {userProfile?.facebook && (
            <FacebookIcon
              style={{ color: "#1877f2" }}
              onClick={(e) => {
                fireALertWithValue(userProfile?.facebook?.toString());
              }}
            />
          )}
          {userProfile?.instagram && (
            <InstagramIcon
              style={{ color: "#833AB4" }}
              onClick={(e) => {
                fireALertWithValue(userProfile?.instagram?.toString());
              }}
            />
          )}
          {userProfile?.youtube && (
            <YouTubeIcon
              style={{ color: "#FF0000" }}
              onClick={(e) => {
                fireALertWithValue(userProfile?.youtube?.toString());
              }}
            />
          )}
          {userProfile?.address && (
            <LocationOnIcon
              onClick={(e) => {
                fireALertWithValue(
                  createAddressStringFromObj(userProfile?.address)
                );
              }}
            />
          )}
        </div>
        {userProfile?.DOB && (
          <div className="flex justify-center gap-2 mt-4 w-60">
            <CalendarMonthIcon />
            {fromatDate(userProfile?.DOB.toString())}
          </div>
        )}

        <div className="flex flex-wrap gap-5 mt-4 w-60">
          {userProfile?.about}
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
