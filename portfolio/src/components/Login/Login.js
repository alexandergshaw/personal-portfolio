import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId =
  "682901403391-g02emol5efu4armjqhfddav5to40ab2d.apps.googleusercontent.com";

function Login() {
  const onSuccess = (res) => {
    console.log("[Login Success] res:", res);
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
