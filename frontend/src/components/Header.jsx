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
    "text-2xl font-bold bg-gradient-to-r from-[#FFD200] via-[#E60000] via-[#D90166] via-[#A100FF] to-[#0072FF] inline-block text-transparent bg-clip-text";
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md h-20 border-b border-gray-300">
      <div className="flex items-center h-full">
        {/* Sky */}
        <div className="px-4 flex items-center h-full">
          <a href="https://www.sky.com">
            <img
              src="src/assets/logo.webp"
              alt="Sky Logo"
              className="h-10 w-auto"
            />
          </a>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 h-full" />

        {/* Sky Immersion */}
        <div className="px-4 flex items-center h-full" id="immersion">
          <p className={GRADIENT_CLASS}>
            <a href="/">Immersion</a>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {isHomePage && !isAuthenticated && (
          <div id="tutorialButton">
            <Button onClick={() => driverObj.drive()} buttonText={"Tutorial"}>
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
