import StoreIcon from "@mui/icons-material/Store";

export default function Card() {
  return (
    <>
      <div className="w-full p-4 bg-white border border-gray-400 rounded shadow">
        <h5 className="mb-4 text-xl font-serif text-gray-500">Hey</h5>
        <div className="flex dark:text-white">
          <span className="text-3xl font-semibold dark:text-gray-400">₹</span>
          <span className="text-3xl font-extrabold  dark:text-gray-400 tracking-tight">
            49
          </span>
        </div>
        <ul role="list" className="space-y-5 my-7">
          <li className="flex space-x-3 items-center">
            <StoreIcon color="primary" />
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              2 team members
            </span>
          </li>
        </ul>
        <ul role="list" className="space-y-5 my-7">
          <li className="flex space-x-3 items-center">
            <svg
              className="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
            </svg>
            <span className="text-base font-normal leading-tight text-gray-500 dark:text-gray-400">
              2 team members
            </span>
          </li>
        </ul>
      </div>
    </>
  );
}
