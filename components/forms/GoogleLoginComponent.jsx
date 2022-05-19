import { Button } from "components/button/Button";
import React from "react";
import Image from "next/image";
import GoogleLogin from 'react-google-login';
import { GoogleBtn, showToast } from "utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const GoogleLoginComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const responseGoogle = (response) => {
    // Login failed
    if (response.status === "unknown") {
      return false;
    }
    if (response.accessToken) {
      axios
        .post(
          `${process.env.BASE_URL}auth/googleSignUp?accessToken=${response.accessToken}`,
          {}
        )
        .then((res) => {
          console.log("google login res is: ", res);
          localStorage.setItem("token", res?.data?.data?.token);
          localStorage.setItem("user", JSON.stringify(res?.data?.data?.user));
          router.push("/account/dashboard");
        })
        .catch((err) => {
          // showToast(err.message, "error");
          console.log(err);
        });
    }
  };

  const responseGoogleSignup = (response) => {
    if (response.status === "unknown") {
      return false;
    }
    if (response.accessToken) {
      axios
        .post(
          `${process.env.BASE_URL}auth/googleSignUp?accessToken=${response.accessToken}`,
          {}
        )
        .then(() => {
          router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <GoogleLogin
        clientId={process.env.GOOGLE_CLIENT_KEY}
        render={renderProps => (
            <button disabled={renderProps.disabled} onClick={() => {
                renderProps.onClick()
            }}>
                <Image src={GoogleBtn} alt="sign up with google" />
            </button>
        )}
        buttonText="Login"
        onSuccess={router.pathname === "signup" ? responseGoogleSignup :responseGoogle}
        onFailure={router.pathname === "signup" ? responseGoogleSignup :responseGoogle}
        cookiePolicy={'single_host_origin'}
    />
  );
};



export default GoogleLoginComponent;
