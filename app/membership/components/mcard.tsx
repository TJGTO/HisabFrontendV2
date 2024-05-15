import React from "react";
import { createSortFromForAvator, stringToColor } from "../../Common/functions";
import Avatar from "@mui/material/Avatar";
import { members } from "../domain";

function Mcard({
  cardId,
  membershipName,
  userName,
  userId,
  validfrom,
  validto,
  profilePictureURL,
}: members) {
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
        >
          {userName && createSortFromForAvator(userName.toString())}
        </Avatar>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {userName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          From - {validfrom}
        </span>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          To - {validto}
        </span>
        <div className="flex mt-4 md:mt-6">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Extend
          </a>
          <a
            href="#"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Remove
          </a>
        </div>
      </div>
    </div>
  );
}

export default Mcard;
