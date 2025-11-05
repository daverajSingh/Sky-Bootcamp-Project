import { useNavigate, generatePath } from "react-router";
import React, { useState } from "react";

/* Landing Page Card Component*/

const Card = ({ title, link, description, imageURL }) => {
  const navigate = useNavigate();
  const [showDescription, setShowDescription] = useState(false);
  console.log(imageURL)
  const bgImage = imageURL && `bg-[url('${imageURL}')]`

  return (
    <button
      className={`relative w-full h-56 rounded-xl overflow-hidden shadow-lg ${bgImage} cursor-pointer`}
      onClick={() => navigate(generatePath(link))}
      onMouseEnter={() => description && setShowDescription(true)}
      onMouseLeave={() => description && setShowDescription(false)}
    >
      {/* Title Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
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
