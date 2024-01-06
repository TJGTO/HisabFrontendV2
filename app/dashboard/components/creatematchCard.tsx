import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { RootState, AppDispatch } from "../../../lib/store";
import { openDialog } from "../../../lib/slices/dashboard";

function CreatematchCard() {
  const dispatch = useDispatch<AppDispatch>();
  const openMatchCreateDialog = () => {
    dispatch(openDialog());
    // Swal.fire({
    //   icon: "success",
    //   title: "This Functionality will available soon",
    //   showConfirmButton: false,
    //   timer: 1500,
    // });
  };
  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
      <article className="overflow-hidden rounded-lg shadow-lg">
        <a href="#">
          <img
            alt="Placeholder"
            className="block h-40 w-full"
            src={"https://picsum.photos/32/32/?random"}
          />
        </a>

        <header className="flex items-center justify-between dark:bg-slate-800 bg-white leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a
              className="no-underline hover:underline text-black dark:text-white"
              href="#"
            >
              {"Weekend Football Community"}
            </a>
          </h1>
          <p className="text-black dark:text-white text-sm">{""}</p>
        </header>

        <footer className="flex items-center justify-between dark:bg-slate-800 bg-white leading-none p-2 md:p-4">
          <a
            className="flex items-center no-underline hover:underline text-black dark:text-white"
            onClick={(e) => openMatchCreateDialog()}
          >
            <AddCircleOutlineIcon />
            <p className="ml-2 text-sm text-black dark:text-white">
              {"Create a Match"}
            </p>
          </a>
          <a
            className="no-underline text-grey-darker hover:text-red-dark"
            href="#"
          >
            <span className="hidden">Like</span>
            <i className="fa fa-heart"></i>
          </a>
        </footer>
      </article>
    </div>
  );
}

export default CreatematchCard;
