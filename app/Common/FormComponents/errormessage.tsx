import { ErrorMessageObj } from "./domain";

function Errormessage({ message, color }: ErrorMessageObj) {
  return <p className={`${color ? color : "text-red-600"}`}>{message}</p>;
}

export default Errormessage;
