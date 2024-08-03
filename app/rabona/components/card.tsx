import React, { useState } from "react";
import FullviewpictureDialog from "../../Common/fullviewpictureDialog";
import { createSortFromForAvator, stringToColor } from "../../Common/functions";
import Avatar from "@mui/material/Avatar";

function Mcard({ cardId, userName, userId, teamName, profilePictureURL }: any) {
  const truncatedUserName = userName
    ? userName.length > 15
      ? `${userName.slice(0, 15)}...`
      : userName
    : "";
  const [openfullImageDialog, setopenfullImageDialog] =
    useState<boolean>(false);
  const closefullImageDialog = () => {
    setopenfullImageDialog(false);
  };
  const gotoMembersProfile = () => {
    window.open(`${window.location.origin}/profile/${userId}`, "_blank");
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-end px-2 pt-2">
        <div className={`h-3.5 w-3.5 rounded-full bg-green-300 mr-2`}></div>
      </div>
      <div className="flex flex-col items-center pb-6 mt-2">
        <Avatar
          sx={{
            width: 100,
            height: 100,
            bgcolor: userName ? stringToColor(userName.toString()) : "",
          }}
          src={
            "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
            profilePictureURL
          }
          onClick={(e) => {
            setopenfullImageDialog(true);
          }}
        >
          {userName && createSortFromForAvator(userName.toString())}
        </Avatar>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {truncatedUserName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {teamName}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            onClick={(e) => {
              e.preventDefault();
              gotoMembersProfile();
            }}
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
          >
            Profile
          </a>
        </div>
      </div>
      <FullviewpictureDialog
        open={openfullImageDialog}
        headerText={userName && userName.toString()}
        onClose={closefullImageDialog}
        imageurl={
          "https://wfgimagebucket.s3.amazonaws.com/profilepictures/" +
          profilePictureURL
        }
      />
    </div>
  );
}

export default Mcard;
