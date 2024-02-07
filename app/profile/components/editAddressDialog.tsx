import { settingDialogProps } from "../domain";
import { updateTheUser } from "../../../lib/slices/profileSection";
import { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { updateProfileObj } from "../domain";
import Swal from "sweetalert2";
import Dialog from "@mui/material/Dialog";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

function EditAddressDialog({ open, onClose }: settingDialogProps) {
  const userProfile = useSelector(
    (state: RootState) => state.profileSection.userProfile
  );
  const dispatch = useDispatch<AppDispatch>();
  const [firstName, setfirstName] = useState<string>("");
  const [lastName, setlastName] = useState<string>("");
  const [address_line_1, setaddress_line_1] = useState<string>("");
  const [address_line_2, setaddress_line_2] = useState<string>("");
  const [pincode, setpincode] = useState<string>("");
  const [city, setcity] = useState<string>("");
  const [state, setstate] = useState<string>("");

  const allStates = useSelector(
    (state: RootState) => state.profileSection.states
  );
  const updateLoader = useSelector(
    (state: RootState) => state.profileSection.updateLoader
  );

  const updateMessage = useSelector(
    (state: RootState) => state.profileSection.updateMessage
  );

  const errorOnUpdate = useSelector(
    (state: RootState) => state.profileSection.errorOnUpdate
  );
  useEffect(() => {
    if (userProfile) {
      if (userProfile.firstName) setfirstName(userProfile.firstName.toString());
      if (userProfile.lastName) setlastName(userProfile.lastName.toString());
      if (userProfile.address?.address_line_1)
        setaddress_line_1(userProfile.address.address_line_1.toString());
      if (userProfile.address?.address_line_2)
        setaddress_line_2(userProfile.address.address_line_2.toString());
      if (userProfile.address?.pincode)
        setpincode(userProfile.address.pincode.toString());
      if (userProfile.address?.city)
        setcity(userProfile.address.city.toString());
      if (userProfile.address?.state) {
        setstate(userProfile.address?.state.state_id.toString());
      }
    }
  }, [userProfile]);
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    if (!updateLoader && updateMessage) {
      if (!errorOnUpdate) handleClose();
      Swal.fire({
        icon: errorOnUpdate ? "error" : "success",
        title: updateMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateLoader, updateMessage]);

  const updateAddress = () => {
    if (!state) {
      Swal.fire({
        icon: "error",
        title: "Please select a state",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    let requestObj: updateProfileObj = {};
    requestObj.firstName = firstName;
    requestObj.lastName = lastName;
    requestObj.address = {
      address_line_1: address_line_1,
      address_line_2: address_line_2,
      pincode: pincode,
      city: city,
      state: {
        state_id: state,
        state_name: allStates?.find((x) => x._id == state)?.stateName || "",
      },
    };
    requestObj.isAddress = true;
    dispatch(updateTheUser(requestObj));
  };

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      maxWidth={"md"}
      //className="bg-gray-50 dark:bg-gray-900"
    >
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex gap-3 justify-between">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit Profile
              </h1>
              <CloseIcon
                onClick={handleClose}
                style={{ color: "red", cursor: "pointer" }}
              />
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="flex gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Firstname
                  </label>
                  <input
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setfirstName(e.target.value);
                    }}
                    value={firstName}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Lastname
                  </label>
                  <input
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setlastName(e.target.value);
                    }}
                    value={lastName}
                  />
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address Line 1
                </label>
                <input
                  id="address1"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setaddress_line_1(e.target.value);
                  }}
                  value={address_line_1}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Address Line 2
                </label>
                <input
                  id="address2"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setaddress_line_2(e.target.value);
                  }}
                  value={address_line_2}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  State
                </label>
                <select
                  id="states"
                  className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    setstate(e.target.value);
                  }}
                  value={state}
                >
                  <option value={""} key={0}>
                    Please Select
                  </option>
                  {allStates &&
                    allStates.map((x, index) => (
                      <option value={x._id.toString()} key={index + 1}>
                        {x.stateName}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex gap-3">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    City
                  </label>
                  <input
                    id="pincode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setcity(e.target.value);
                    }}
                    value={city}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => {
                      setpincode(e.target.value);
                    }}
                    value={pincode}
                  />
                </div>
              </div>
              {updateLoader ? (
                <button
                  type="submit"
                  disabled={true}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CircularProgress color="secondary" size={20} />
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log("bwfeuib");
                    updateAddress();
                  }}
                  disabled={!firstName && !lastName}
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default EditAddressDialog;
