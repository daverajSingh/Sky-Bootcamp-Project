import { useNavigate, generatePath } from "react-router";
import React, { useState } from "react";

/* Landing Page Card Component*/

const Card = ({ title, link, description, imageURL }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <button
      className={`relative w-full h-64 rounded-xl overflow-hidden group bg-cover bg-center cursor-pointer bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% cursor-pointer transition-transform duration-160 ease-in-out ${hover ? 'hover:-translate-y-1.5 hover:shadow-2xl' : 'shadow-lg'}`}
      style={{ backgroundImage: `url(${imageURL})` }}
      onClick={() => navigate(generatePath(link))}
      onMouseEnter={() => {
        description && setShowDescription(true);
        setHover(true);
      }}
      onMouseLeave={() => {
        description && setShowDescription(false);
        setHover(false);
      }}
      
    >
      {/* Title Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/50 backdrop-blur-sm">
        <h3 className="text-base md:text-lg font-semibold">{title}</h3>
      </div>

      {showDescription && (
        <div>
          <div className="absolute inset-0 bg-black/70 text-white flex flex-col justify-center items-center p-6 text-center text-sm md:text-xl">
            <p>{description}</p>
          </div>
        </div>
      )}
    </button>
  );
};

export default Card;
