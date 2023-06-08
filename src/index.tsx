import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import PageRouting from "./components/layout/PageRouting";
import { setUpStore } from "./redux/Store";
import App from "./App";
import "./index.css";
// @ts-ignore
import {theme} from "./components/layout";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <Provider store={setUpStore()}>
          <PageRouting>
            <App />
          </PageRouting>
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
