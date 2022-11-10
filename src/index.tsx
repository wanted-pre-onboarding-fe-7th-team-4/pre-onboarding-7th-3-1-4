import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { RecoilRoot } from "recoil";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <RecoilRoot>
          <GlobalStyle />
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
