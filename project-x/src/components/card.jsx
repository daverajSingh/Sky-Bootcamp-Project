import React from 'react';

/* Landing Page Card Component*/

const Card = ({title}) => {
  return (
    <>
    <div className="relative w-full sm:w-72 h-56 sm:h-48 rounded-xl overflow-hidden shadow-lg group">

        {/* Title Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 text-black">
            <h3 className="text-lg sm:text-base font-semibold">{title}</h3>
        </div>
    </div>
    </>
  );
};

export default Card;

