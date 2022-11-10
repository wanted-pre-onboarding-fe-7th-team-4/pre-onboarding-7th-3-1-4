// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      primary: string;
      grey_500: string;
      grey_300: string;
      grey_100: string;
      bg: string;
      white: string;
      shadow: string;
      black: string;
    };
    size: {
      maxW: string;
      headerH: string;
    };
  }
}
