import { Typography, Button } from "@mui/material";
import { IFooterProps } from "./domain";

function CustomTableFooter({
  page,
  pageSize,
  totalPages,
  setpage,
}: IFooterProps) {
  return (
    <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography color="blue-gray" className="font-normal dark:text-white">
        Page {page} of {totalPages}
      </Typography>
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
  );
}

export default CustomTableFooter;
