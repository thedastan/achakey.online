import React, { useEffect } from "react";

import { usePostAuth } from "../../../hooks/useActions";
import { ID_CLIENT } from "../../helpers/idClientGoogle";

const GoogleRegister = () => {
  const { fetchAuthGoogle } = usePostAuth();

  function handleCallbackResponse(response: any) {
    const token = response.credential;
    fetchAuthGoogle(token);
  }

  useEffect(() => {
    /* global google */
    //@ts-ignore
    google.accounts.id.initialize({
      client_id: ID_CLIENT,
      callback: handleCallbackResponse,
    });
    //@ts-ignore
    google.accounts.id.renderButton(document.getElementById("signIdDiv"), {
      theme: "filled",
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <div id="signIdDiv"></div>
    </div>
  );
};

export default GoogleRegister;
