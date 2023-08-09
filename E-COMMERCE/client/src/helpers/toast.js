import { toast } from "react-toastify";

// create toast
export const createToast = (msg, type = "error") => {
  toast[type](msg);
};
