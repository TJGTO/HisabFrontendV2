import { settingDialogProps } from "../domain";
import { updateProfileObj } from "../domain";
import { updateTheUser } from "../../../lib/slices/profileSection";
import Dialog from "@mui/material/Dialog";
import Swal from "sweetalert2";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

function EditProfileDialog({ open, onClose }: settingDialogProps) {
  const userProfile = useSelector(
    (state: RootState) => state.profileSection.userProfile
  );

  const dispatch = useDispatch<AppDispatch>();
  const [academic, setacademic] = useState<string>("");
  const [facebook, setfacebook] = useState<string>("");
  const [instagram, setinstagram] = useState<string>("");
  const [youtube, setyoutube] = useState<string>("");
  const [phone_no, setphone_no] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [about, setabout] = useState<string>("");
  const [dob, setdob] = useState<string>("");

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
      if (userProfile.academic) setacademic(userProfile.academic.toString());
      if (userProfile.facebook) setfacebook(userProfile.facebook.toString());
      if (userProfile.instagram) setinstagram(userProfile.instagram.toString());
      if (userProfile.youtube) setyoutube(userProfile.youtube.toString());
      if (userProfile.phone_no) setphone_no(userProfile.phone_no.toString());
      if (userProfile.email) setemail(userProfile.email.toString());
      if (userProfile.about) setabout(userProfile.about.toString());
      if (userProfile.DOB) setdob(userProfile.DOB.toString());
    }
  }, [userProfile]);
  const handleClose = () => {
    onClose();
  };
  useEffect(() => {
    if (!updateLoader && updateMessage) {
      Swal.fire({
        icon: errorOnUpdate ? "error" : "success",
        title: updateMessage,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }, [updateLoader, updateMessage]);
  const isValidate = (Type: string) => {
    let reqObj: updateProfileObj = {};
    switch (Type) {
      case "academic":
        reqObj.academic = academic;
        break;
      case "dob":
        reqObj.DOB = dob;
        break;
      case "facebook":
        reqObj.facebook = facebook;
        break;
      case "instagram":
        reqObj.instagram = instagram;
        break;
      case "youtube":
        reqObj.youtube = youtube;
        break;
      case "phone_no":
        reqObj.phone_no = phone_no;
        break;
      case "email":
        reqObj.email = email;
        break;
      case "about":
        reqObj.about = about;
        break;
    }
    dispatch(updateTheUser(reqObj));
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
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Academic
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <select
                      id="question"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setacademic(e.target.value);
                      }}
                      value={academic}
                    >
                      <option value="">{"Please Select"}</option>
                      <option value="Working Professional">
                        {"Working Professional"}
                      </option>
                      <option value="Student">{"Student"}</option>
                    </select>
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("academic");
                      }}
                      disabled={!academic}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Date of Birth
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="dob"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setdob(e.target.value);
                      }}
                      type="date"
                      value={dob}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("dob");
                      }}
                      disabled={!dob}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Facebook Profile URL
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="facebokkURL"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setfacebook(e.target.value);
                      }}
                      value={facebook}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("facebook");
                      }}
                      disabled={!facebook}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Insta ID
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="instaID"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setinstagram(e.target.value);
                      }}
                      value={instagram}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("instagram");
                      }}
                      disabled={!instagram}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Youtube
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="youtube"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setyoutube(e.target.value);
                      }}
                      value={youtube}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("youtube");
                      }}
                      disabled={!youtube}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email Id
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setemail(e.target.value);
                      }}
                      value={email}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("email");
                      }}
                      disabled={!email}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone No
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="phone"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setphone_no(e.target.value);
                      }}
                      value={phone_no}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("phone_no");
                      }}
                      disabled={!phone_no}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  About Yourself
                </label>
                <div className="flex gap-3">
                  <div className="flex-1">
                    <input
                      id="about"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => {
                        setabout(e.target.value);
                      }}
                      value={about}
                    />
                  </div>
                  <div className="flex-none">
                    <button
                      onClick={(e) => {
                        e.preventDefault(), isValidate("about");
                      }}
                      disabled={!about}
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default EditProfileDialog;
