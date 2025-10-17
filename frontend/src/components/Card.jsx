import { useState } from 'react';
import { useNavigate, generatePath } from 'react-router';
import { FiLink, FiPlus, FiX } from 'react-icons/fi';
import React from "react";

/* Landing Page Card Component*/

const Card = ({ title, link, description }) => {

    const navigate = useNavigate();
    const [showDescription, setShowDescription] = useState(false);

    return (
        <div className="relative w-full h-56 rounded-xl overflow-hidden shadow-lg group bg-radial-[at_50%_75%] from-sky-200 via-blue-400 to-indigo-900 to-90% cursor-pointer" onClick={() => navigate(generatePath(link))}>

            {/* Title Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-black">
                <h3 className="text-lg sm:text-base font-semibold">{title}</h3>
            </div>

            {!showDescription && (<div className="absolute top-2 right-2 flex gap-2">
                {/* Show Description button */}
                {description && (<button data-testid="showDescription" onClick={() => setShowDescription(true)} className="hover:bg-indigo-500 cursor-pointer text-black p-3 sm:p-2 rounded-full">
                    <FiPlus data-testid="revealDescriptionIcon" size={18} />
                </button>
                )}

                {/* Link to the page */}
                {link && (
                    <a data-testid="linkButton" href={link} className="hover:bg-indigo-500 text-black p-3 sm:p-2 rounded-full">
                        <FiLink data-testid="navigateToPageButton" size={18} />
                    </a>
                )}
            </div>
            )}

            {/* Reveal/Overlay the Description on click */}
            {showDescription && (
                <div className="absolute inset-0 bg-black/90 text-white flex flex-col justify-center items-center p-6 text-center text-sm sm:text-xs" data-testid="hideDescription">
                    <button onClick={() => setShowDescription(false)} className="absolute top-2 right-2 hover:bg-indigo-500 cursor-pointer text-white p-3 sm:p-2 rounded-full">
                        <FiX data-testid="hideDescriptionIcon" size={18} />
                    </button>
                    <p>{description}</p>
                </div>
            )}
        </div>
    );
};

export default Card;

