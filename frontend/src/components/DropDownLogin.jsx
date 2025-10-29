import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FiLogIn } from "react-icons/fi";
import { useNavigate } from "react-router";
import { useAuth } from "./AuthContext";

function DropDownLogin() {
  const { login } = useAuth();
  const [dropDownStyle, setDropDownStyle] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const dropdownWidth = 256;
      let leftPosition = rect.left;
      if (leftPosition + dropdownWidth > window.innerWidth) {
        leftPosition = rect.right - dropdownWidth;
      }
      if (leftPosition < 0) {
        leftPosition = 8;
      }
      setDropDownStyle({
        position: "fixed",
        zIndex: 9999,
        top: `${rect.bottom + 8}px`,
        left: `${leftPosition}px`,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setPassword("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.token);
        setIsOpen(false);
        navigate("/admin");
        console.log("Login successful");
      } else {
        setError(data.error || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiLogIn size={20} />
        Login
      </button>
      {isOpen &&
        createPortal(
          <div
            ref={dropdownRef}
            style={dropDownStyle}
            className="w-64 bg-white rounded-lg shadow-xl border border-gray-200 p-4"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Sign In
            </h2>
            <div className="space-y-3">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email{" "}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="john.doe@sky.com"
                    disabled={isLoading}
                  />
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password{" "}
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </label>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300 disabled:bg-indigo-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default DropDownLogin;
