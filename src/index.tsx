import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { theme } from "./components/layout/Index";
import PageRouting from "./components/layout/PageRouting";
import { setUpStore } from "./redux/Store";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const idClient =
  "426144994353-f3kdvs86sshvbd56ql707tk815ld51ce.apps.googleusercontent.com";

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={idClient}>
      <BrowserRouter>
        <ChakraProvider theme={theme}>
          <Provider store={setUpStore()}>
            <PageRouting>
              <App />
            </PageRouting>
          </Provider>
        </ChakraProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
