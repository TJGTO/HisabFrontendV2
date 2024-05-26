import React from "react";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import { membershipdetailsDialogProps } from "../domain";

function MembershipDetailsDialog({
  open,
  onClose,
  membershipData,
}: membershipdetailsDialogProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth={"lg"}>
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {"Membership Details"}
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <ul>
              {membershipData?.membershipCardId && (
                <li>
                  <p className="text-md font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                    {"Card Number"} - {membershipData.membershipCardId}
                  </p>
                </li>
              )}
              {membershipData?.validfrom && (
                <li>
                  <p className="text-md font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                    {"Valid From"} - {membershipData.validfrom}
                  </p>
                </li>
              )}
              {membershipData?.validto && (
                <li>
                  <p className="text-md font-bold leading-tight tracking-tight text-gray-900  dark:text-white">
                    {"Valid To"} - {membershipData.validto}
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default MembershipDetailsDialog;
