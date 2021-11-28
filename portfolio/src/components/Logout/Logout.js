import React from "react";
import { GoogleLogout } from "react-google-login";

const clientId =
  "682901403391-g02emol5efu4armjqhfddav5to40ab2d.apps.googleusercontent.com";

function Logout() {
  const onSuccess = () => {
    alert("Logout made successfully");
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

export default Logout;
