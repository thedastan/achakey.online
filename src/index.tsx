import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
//@ts-ignore
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
  "464094313649-paipogb1oimb09fv7c4nhfhcbv1fraqi.apps.googleusercontent.com";

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
