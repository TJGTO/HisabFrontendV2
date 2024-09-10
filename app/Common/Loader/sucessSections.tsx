import React from "react";
import { Typography } from "@mui/material";

function SucessSections({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 50 50"
        xmlSpace="preserve"
        fill="#000000"
        width="50"
        height="50"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <circle style={{ fill: "#25AE88" }} cx="25" cy="25" r="25" />
          <polyline
            style={{
              fill: "none",
              stroke: "#FFFFFF",
              strokeWidth: 2,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeMiterlimit: 10,
            }}
            points="38,15 22,33 12,25"
          />
        </g>
      </svg>

      <Typography
        color="blue-gray"
        className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 dark:text-white"
      >
        {message}
      </Typography>
    </div>
  );
}

export default SucessSections;
