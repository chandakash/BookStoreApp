import { createTheme } from '@mui/material/styles';

export const pxToRem = (px) => `${px / 22.5}rem`;
export const pxToVw = (px) =>
  `${(100 / document.documentElement.clientWidth) * px}vw`;

export const pxToVh = (px) =>
  `${px / (document.documentElement.clientHeight * 0.01)}vh`;

export default createTheme({
  palette: {
    primary: {
      main: "#283A46",
      light: "#273D49CC",
      dark: "#C2BFBE",
    },
    secondary: {
      main: "#14AFF1",
      red: "#FF5B5B",
      white: "#fff",
    },
  },
//   overrides: {
//     MuiTableRow: {
//       root: {
//         //for the body
//         height: "10%",
//       },
//       head: {
//         //for the head
//         height: "10%",
//       },
//     },
//   },
});
