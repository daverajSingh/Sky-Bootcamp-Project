import { useNavigate, generatePath } from "react-router";
import React, { useState } from "react";

/* Landing Page Card Component*/

const Card = ({ title, link, description }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [hover, setHover] = useState(false);

  return (
    <button
      onClick={() => navigate(generatePath(link))}
      onMouseEnter={() => {
        description && setShowDescription(true);
        setHover(true);
      }}
      onMouseLeave={() => {
        description && setShowDescription(false);
        setHover(false);
      }}
      className={`relative w-full h-56 rounded-xl overflow-hidden group bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% cursor-pointer transition-transform duration-160 ease-in-out ${hover ? 'hover:-translate-y-1.5 hover:shadow-2xl' : 'shadow-lg'}`}
    >
      {/* Title Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-black">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      </div>

      {showDescription && (
        <div>
          <div className="absolute inset-0 bg-black/40 text-white flex flex-col justify-center items-center p-6 text-center text-sm md:text-xl">
            <p>{description}</p>
          </div>
        </div>
      )}
    </button>
  );
};

export default Card;
