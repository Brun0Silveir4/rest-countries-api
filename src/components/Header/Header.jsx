import { useContext } from "react";
import "./Header.scss";
import { ThemeContext } from "../../Context/ThemeContext";
import { LuSun, LuMoon } from "react-icons/lu";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="header">
      <div className="header__title">
        <p>Where in the world?</p>
      </div>
      <div className="header__theme" onClick={toggleTheme}>
        <div className="header__theme__icon">
          {theme == "dark" ? <LuMoon size={18} /> : <LuSun size={18} />}
        </div>
        <div className="header__theme__title">
          {theme == "dark" ? <p>Dark Mode</p> : <p>Light Mode</p>}
        </div>
      </div>
    </div>
  );
}
