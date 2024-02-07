import { Typography, Button } from "@mui/material";
import { IFooterProps, pageLengthConfig } from "./domain";

function CustomTableFooter({
  page,
  pageSize,
  totalPages,
  setpage,
  setpageSize,
}: IFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography color="blue-gray" className="font-normal dark:text-white">
        Page {page} of {totalPages}
      </Typography>
      <div className="flex gap-3">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          {pageLengthConfig &&
            pageLengthConfig.map((x, index) => (
              <button
                type="button"
                disabled={pageSize == x}
                onClick={(e) => {
                  e.preventDefault();
                  setpageSize(x);
                }}
                className={`px-4 py-2 text-sm font-medium bg-white border border-gray-200 ${
                  index == 0 ? "rounded-s-lg" : ""
                } ${
                  index == pageLengthConfig.length - 1 ? "rounded-e-lg" : ""
                } hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {x}
              </button>
            ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outlined"
            disabled={page == 1}
            onClick={(e) => {
              setpage(page - 1);
            }}
          >
            Previous
          </Button>
          <Button
            variant="outlined"
            disabled={page == totalPages}
            onClick={(e) => {
              setpage(page + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CustomTableFooter;
