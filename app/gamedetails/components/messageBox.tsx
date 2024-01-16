import { useEffect } from "react";
import Swal from "sweetalert2";
import { resetMessageBox } from "../../../lib/slices/gamemodule";
import { RootState, AppDispatch } from "../../../lib/store";
import { useSelector, useDispatch } from "react-redux";

function MessageBox({ action }: { action: () => void }) {
  const messageBoxFlag = useSelector(
    (state: RootState) => state.gameModel.messageBoxFlag
  );
  const messageBoxMessage = useSelector(
    (state: RootState) => state.gameModel.messageBoxMessage
  );
  const messageboxType = useSelector(
    (state: RootState) => state.gameModel.messageboxType
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (messageBoxFlag) {
      Swal.fire({
        icon: messageboxType == "error" ? "error" : "success", //did this for type mismatch
        title: messageBoxMessage,
        showConfirmButton: false,
        timer: 1500,
      });
      action();
      setTimeout(() => {
        dispatch(resetMessageBox());
      }, 2000);
      return () => {
        dispatch(resetMessageBox());
      };
    }
  }, [messageBoxFlag]);

  return <></>;
}

export default MessageBox;
