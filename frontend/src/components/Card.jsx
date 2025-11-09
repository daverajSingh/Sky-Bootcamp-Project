import { useNavigate, generatePath } from "react-router";
import React, { useState } from "react";

/* Landing Page Card Component*/

const Card = ({ title, link, description, imageURL }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  return (
    <button
      style={{ backgroundImage: `url(${imageURL})` }}
      onClick={() => navigate(generatePath(link))}
      onMouseEnter={() => { description && setShowDescription(true) }}
      onMouseLeave={() => { description && setShowDescription(false) }}
      className="relative w-full h-80 md:h-96 lg:h-[36rem] rounded-lg overflow-hidden bg-cover bg-center bg-white shadow-md cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg hover:-translate-y-1 active:scale-95"
    >
      {/* Title Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-gradient-to-t from-black/80 via-black/50 to-transparent h-24">
        <h3 className="text-base md:text-xl font-bold drop-shadow-lg absolute bottom-4 left-4 right-4">{title}</h3>
      </div>

      {showDescription && (
        <div className="absolute inset-0 bg-black/75 backdrop-blur-sm text-white flex flex-col justify-center items-center p-6 text-center transition-all">
          <p className="text-sm md:text-lg font-medium">{description}</p>
        </div>
      )}
    </button>
  );
};

export default Card;
