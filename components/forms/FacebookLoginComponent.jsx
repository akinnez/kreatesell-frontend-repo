import { Button } from "components/button/Button";
import React from "react";
import Image from "next/image";
// import FacebookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FacebookBtn, showToast } from "utils";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

const FacebookLoginComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const responseFacebook = (response) => {
    console.log("fb-response", response);
    // Login failed
    if (response.status === "unknown") {
      return false;
    }
    if (response.accessToken) {
      axios
        .post(
          `${process.env.BASE_URL}/auth/facebookSignUp?accessToken=${response.accessToken}`,
          {}
        )
        .then((res) => {
          console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr", res);
          const { token, user } = res;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user));
          router.push("/account/dashboard");
        })
        .catch((err) => {
          showToast(err.message, "error");
          console.log(err);
        });
    }
  };

  return (
    <FacebookLogin
      appId={process.env.FB_APP_ID}
      autoLoad
      callback={responseFacebook}
      // fields="name, email, picture"
      render={(renderProps) => (
        <button>
          <Image
            onClick={renderProps.onClick}
            src={FacebookBtn}
            alt="sign up with facebook"
          />
        </button>
      )}
    />
  );
};

export default FacebookLoginComponent;
