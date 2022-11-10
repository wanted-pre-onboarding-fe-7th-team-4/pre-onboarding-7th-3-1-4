import { DefaultTheme } from "styled-components";

// type deviceType = "mobile" | "tablet" | "laptop" | "desktop";

// const size: { [key in deviceType]: string } = {
//   mobile: "543px",
//   tablet: "768px",
//   laptop: "1011px",
//   desktop: "1280px"
// };

// const device: { [key in deviceType]: string } = {
//   mobile: `screen and (max-width: ${size.mobile})`,
//   tablet: `screen and (max-width: ${size.tablet})`,
//   laptop: `screen and (max-width: ${size.laptop})`,
//   desktop: `screen and (max-width: ${size.desktop})`
// };

export const theme: DefaultTheme = {
  // device,
  color: {
    bg: "#CAE9FF",
    primary: "#007BE9",
    black: "#000000",
    white: "#FFFFFF",
    grey_500: "#6A737B",
    grey_300: "#a7afb7",
    grey_100: "#edf0f2",
    shadow: "rgba(30, 32, 37, 0.1)"
  },
  size: {
    maxW: "1024px",
    headerH: "56px"
  }
};
