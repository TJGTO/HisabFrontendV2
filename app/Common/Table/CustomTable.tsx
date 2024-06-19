"use client";

import { useEffect, useState } from "react";
import CustomTableFooter from "./CustomTableFooter";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { TableProps } from "./domain";
import { Typography } from "@mui/material";

function CustomTable({
  tablehead,
  tablerows,
  paginationNotNeeded,
}: TableProps) {
  const [visibleRows, setVisibleRows] = useState<Array<JSX.Element>>([]);
  const [page, setpage] = useState<number>(1);
  const [pageSize, setpageSize] = useState<number>(5);
  const totalPages = Math.ceil(tablerows.length / pageSize);

  useEffect(() => {
    if (paginationNotNeeded) {
      setVisibleRows(tablerows);
    } else {
      let cutoffRows = tablerows.slice((page - 1) * pageSize, page * pageSize);
      setVisibleRows(cutoffRows);
    }
  }, [page, tablerows, pageSize]);

  useEffect(() => {
    if (paginationNotNeeded) {
      setVisibleRows(tablerows);
    } else {
      let cutoffRows = tablerows.slice(0, 1 * pageSize);
      setVisibleRows(cutoffRows);
    }
  }, []);

  return (
    <div>
      <table className="mt-4 w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {tablehead.map((head, index) => (
              <th
                key={head.id}
                className={`cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 hover:bg-blue-gray-50`}
              >
                <Typography
                  color="blue-gray"
                  className="flex items-center justify-between gap-2 font-normal leading-none opacity-70 dark:text-white"
                >
                  {head.label}{" "}
                  {/* {index !== tablehead.length - 1 && (
                    <KeyboardArrowUpIcon className="h-4 w-4" />
                  )} */}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{visibleRows}</tbody>
      </table>
      {!paginationNotNeeded && (
        <CustomTableFooter
          page={page}
          pageSize={pageSize}
          totalPages={totalPages}
          setpage={setpage}
          setpageSize={setpageSize}
        />
      )}
    </div>
  );
}

export default CustomTable;
