import React, { useEffect } from "react";
import { AuthButton, Button } from "./index";
import driverObj from "./TourContext";
import { FiHelpCircle, FiUser } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

/* Landing Page Header Component*/

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tourCompleted") === "true") return;
    driverObj.drive();
  }, []);

  const GRADIENT_CLASS =
    "text-2xl font-bold bg-gradient-to-r from-[#E60000] via-[#D90166] via-[#A100FF] to-[#0072FF] text-transparent bg-clip-text";
  const path = location.pathname;
  const pageTitle =
    path === "/"
      ? "Home"
      : path
          .split("/")
          .filter(Boolean)
          .at(-1)
          .replaceAll(/[-_]/g, " ")
          .replaceAll(/\b\w/g, (c) => c.toUpperCase());

  return (
    <header className="relative flex items-center justify-between p-4 bg-white shadow-md h-20 border-b border-gray-300">
      <div className="flex items-center h-full">
        <div className="px-4 flex items-center h-full">
          <a href="https://www.sky.com">
            <img
              src="src/assets/logo.webp"
              alt="Sky Logo"
              className="h-10 w-auto"
            />
          </a>
        </div>
        <div className="w-px bg-gray-300 h-full" />

        <a className="px-4 flex items-center h-full" id="immersion" href="/">
          <img
            src="src/assets/Logo.png"
            alt="Immersion Logo"
            className="h-10 w-auto"
          />
          <p className={GRADIENT_CLASS + " ml-3 hidden md:block"}>Immersion</p>
        </a>
      </div>

      {/* Centered page title */}
      {!isHomePage && (
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none hidden md:block">
          <h1 className={GRADIENT_CLASS}>{pageTitle}</h1>
        </div>
      )}

      <div className="flex items-center gap-3">
        {isHomePage && !isAuthenticated && (
          <div id="tutorialButton">
            <Button
              onClick={() => driverObj.drive()}
              buttonText={<span className="hidden md:inline">Tutorial</span>}
            >
              <FiHelpCircle size={20} />
            </Button>
          </div>
        )}
        <AuthButton />
        {isAuthenticated && location.pathname !== "/admin" && (
          <Button onClick={() => navigate("/admin")}>
            <FiUser size={24} />
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
