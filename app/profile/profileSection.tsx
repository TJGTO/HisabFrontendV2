import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

function ProfileSection() {
  return (
    <div className="h-screen flex justify-center mt-6 ">
      <div className="flex-col gap-6">
        <div className="h-60 w-60">
          <img
            src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-4-470x470.png"
            alt="..."
            className="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
          />
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          John Doe{" "}
          <Tooltip title="Edit Profile">
            <EditIcon className="cursor-pointer" />
          </Tooltip>
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          <MailOutlineIcon />
          john@gmail.com
        </div>
        <div className="flex justify-center gap-2 mt-4 w-60">
          <LocalPhoneIcon />
          7047241849
        </div>
        <div className="flex justify-center gap-5 mt-4 w-60">
          <FacebookIcon style={{ color: "#1877f2" }} />
          <InstagramIcon style={{ color: "#833AB4" }} />
          <YouTubeIcon style={{ color: "#FF0000" }} />
          <LocationOnIcon />
        </div>
        <div className="flex flex-wrap gap-5 mt-4 w-60">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </div>
      </div>
    </div>
  );
}

export default ProfileSection;
