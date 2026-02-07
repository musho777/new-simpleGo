import { toast } from 'react-toastify';

// import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
// import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// const getIconByType = (type) => {
//   switch (type) {
//     case "error":
//       return <CancelOutlinedIcon />;
//     case "success":
//       return <CheckCircleOutlineIcon />;
//     case "warning":
//       return <ErrorOutlineOutlinedIcon />;
//     case "toast":
//       return <InfoOutlinedIcon />;
//     default:
//       return null;
//   }
// };

const config = {
  // position: toast.POSITION.TOP_CENTER,
  // position: "top-center",
  closeButton: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  pauseOnFocusLoss: false,
  hideProgressBar: false,
  newestOnTop: true,
  progress: undefined,
  //   icon: ({ theme, type }) => getIconByType(type),
};

export const notify = (message, type, autoCloseDuration = 3500) => {
  toast[type](message, {
    ...config,
    autoClose: autoCloseDuration,
    // icon: ({ theme }) => getIconByType(type),
  });
};

export const notifySuccess = (message, autoCloseDuration) => {
  notify(message, 'success', autoCloseDuration);
};

export const notifyError = (message, autoCloseDuration) => {
  notify(message, 'error', autoCloseDuration);
};

export const notifyErrorServer = (message, autoCloseDuration) => {
  notify(message, 'error', autoCloseDuration);
};

export const notifyWarning = (message, autoCloseDuration) => {
  notify(message, 'warning', autoCloseDuration);
};

export const notifyText = (message, autoCloseDuration) => {
  notify(message, 'toast', autoCloseDuration);
};
