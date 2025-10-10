import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function DropDownLogin() {
  const [dropDownStyle, setDropDownStyle] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

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
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300 flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                className="w-full bg-indigo-500 text-white py-2 rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Sign In
              </button>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

export default DropDownLogin;