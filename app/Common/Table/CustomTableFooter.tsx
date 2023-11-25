import { Typography, Button } from "@mui/material";

function CustomTableFooter() {
  return (
    <div className="flex items-center justify-between border-t border-blue-gray-50 p-4">
      <Typography color="blue-gray" className="font-normal dark:text-white">
        Page 1 of 10
      </Typography>
      <div className="flex gap-2">
        <Button variant="outlined">Previous</Button>
        <Button variant="outlined">Next</Button>
      </div>
    </div>
  );
}

export default CustomTableFooter;
