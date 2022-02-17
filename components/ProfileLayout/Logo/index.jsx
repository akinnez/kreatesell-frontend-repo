import Image from "next/image";
import LogoImg from "public/images/logo.svg";
import style from "./index.module.scss";

const Logo = () => (
  <div className={style.logoContainer}>
    <Image src={LogoImg} alt="KreateSell Logo" layout="responsive" priority />
  </div>
);

export default Logo;
