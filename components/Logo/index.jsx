import React from "react";
import Image from "next/image";
import LogoImg from "public/images/logo.svg";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px 0 10px 0",
        marginBottom: "10px",
      }}
    >
      <Image src={LogoImg} alt="logo" width={140} height={35} />
    </div>
  );
};

export const MobileLogo = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10px 0",
      }}
    >
      <Image src={LogoImg} alt="logo" width={120} height={30} />
    </div>
  );
};

export default Logo;
