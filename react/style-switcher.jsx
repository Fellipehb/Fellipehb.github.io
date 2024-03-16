import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const App = () => {
  const [isStyleSwitcherOpen, setStyleSwitcherOpen] = useState(false);
  const [isDarkMode, setDarkMode] = useState(
    document.body.classList.contains("dark")
  );

  const styleSwitcherToggle = ReactDOM.findDOMNode(
    document.querySelector(".style-switcher-toggler")
  );
  const alternateStyles = document.querySelectorAll(".alternate-style");
  const dayNight = document.querySelector(".day-night");

  const toggleStyleSwitcher = () => {
    setStyleSwitcherOpen((prevState) => !prevState);
  };

  const handleScroll = () => {
    if (isStyleSwitcherOpen) {
      setStyleSwitcherOpen(false);
    }
  };

  const handleThemeChange = (color) => {
    alternateStyles.forEach((style) => {
      if (color === style.getAttribute("title")) {
        style.removeAttribute("disabled");
      } else {
        style.setAttribute("disabled", "true");
      }
    });
  };

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
    document.body.classList.toggle("dark");
    if (isDarkMode) {
      dayNight.querySelector("em").classList.add("fa-sun");
      dayNight.querySelector("em").classList.remove("fa-moon");
    } else {
      dayNight.querySelector("em").classList.add("fa-moon");
      dayNight.querySelector("em").classList.remove("fa-sun");
    }
  };

  React.useEffect(() => {
    styleSwitcherToggle.addEventListener("click", toggleStyleSwitcher);
    window.addEventListener("scroll", handleScroll);

    return () => {
      styleSwitcherToggle.removeEventListener("click", toggleStyleSwitcher);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  React.useEffect(() => {
    handleThemeChange("color-1");
  }, []);

  return (
    <>
      <div className="style-switcher" style={{ right: isStyleSwitcherOpen ? 0 : -160 }}>
        <div className="style-switcher-toggler">Toggle</div>
        <button className="alternate-style" title="color-1" onClick={() => handleThemeChange("color-1")} disabled>
          Color-1
        </button>
        <button className="alternate-style" title="color-2" onClick={() => handleThemeChange("color-2")}>
          Color-2
        </button>
        {/* ...Add more buttons for other color options... */}
        <div className="day-night" onClick={toggleDarkMode}>
          Day <em className={`fa ${isDarkMode ? "fa-sun" : "fa-moon"}`}></em>
        </div>
      </div>
    </>
  );
};

export default App;