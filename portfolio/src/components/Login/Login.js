import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "682901403391-g02emol5efu4armjqhfddav5to40ab2d.apps.googleusercontent.com";

export const refreshTokenSetup = (res) => {
  let refreshTiming = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refreshToken = async () => {
    const newAuthRes = await res.reuploadAuthResponse();
    refreshTiming = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;

    console.log("newAuthRest", newAuthRes);
    console.log("new auth token", newAuthRes.id_token);

    setTimeout(refreshToken, refreshTiming);
  };

  setTimeout(refreshToken, refreshTiming);
};

function Login() {
  const onSuccess = (res) => {
    console.log("[Login Success] res:", res);
    refreshTokenSetup(res);
  };

  const onFailure = (res) => {
    console.log("[Login Failed] res:", res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "100px" }}
        isSignedIn={true}
      />
    </div>
  );
}

export default Login;
