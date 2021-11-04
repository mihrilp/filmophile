import Link from "next/link";
import { Logo } from "./icons";

function Header(props) {
  return (
    <div>
      <div className="logo">
        <Logo />
      </div>
      <div className="navbar"></div>
    </div>
  );
}

export default Header;
