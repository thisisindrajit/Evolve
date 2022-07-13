import logo from "../../Images/logo_vector.png";
import { Link } from "react-router-dom";
import "./logoholder.css";

const LogoHolder = (props) => {
  return (
    <div
      className={`flex items-center justify-between px-4 md:px-8 h-20 md:h-24 ${
        (props.type === "login" || props.type === "register") && "mb-2"
      }`}
    >
      <Link to="/">
        <div className="flex items-center gap-6">
          <img
            src={logo}
            width="28"
            alt="Evolve logo"
            // style={{
            //   opacity: "0",
            //   animation:
            //     "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards",
            // }}
          />
          <div className="text-base logo-evolve hidden md:block text-white">
            EVOLVE
          </div>
        </div>
      </Link>
      {/* Links holder */}
      {props.type === "lp" && (
        <div className="flex items-center justify-evenly sm:gap-12">
          <Link to="/login">
            <div className="topbar-link transition-all">Login</div>
          </Link>
          <Link to="/register">
            <div className="topbar-link transition-all hidden sm:block">
              Register
            </div>
          </Link>
        </div>
      )}
      {props.type === "login" && (
        <div className="flex items-center">
          <Link to="/register">
            <div className="topbar-link transition-all">Register</div>
          </Link>
        </div>
      )}
      {props.type === "register" && (
        <div className="flex items-center">
          <Link to="/login">
            <div className="topbar-link transition-all">Login</div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default LogoHolder;
