"use client";

import CustomTableFooter from "./CustomTableFooter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TableProps } from "./domain";
import { Typography } from "@mui/material";

function CustomTable({ tablehead, tablerows }: TableProps) {
  return (
    <div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tablehead.map((head, index) => (
              <th
                key={head.id}
                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
              >
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                >
                  {head.label}{" "}
                  {index !== tablehead.length - 1 && (
                    <KeyboardArrowUpIcon className="h-4 w-4" />
                  )}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{tablerows}</tbody>
      </table>
      <CustomTableFooter />
    </div>
  );
}

export default CustomTable;
