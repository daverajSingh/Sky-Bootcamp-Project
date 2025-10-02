import { FiLink, FiPlus} from 'react-icons/fi';

/* Landing Page Card Component*/

const Card = ({ title, link }) => {
    return (
        <>
            <div className="relative w-full sm:w-72 h-56 sm:h-48 rounded-xl overflow-hidden shadow-lg group">

                {/* Title Section */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-black">
                    <h3 className="text-lg sm:text-base font-semibold">{title}</h3>
                </div>

                <div className="absolute top-2 right-2 flex gap-2">
                    {/* Description button */}
                    {link && (
                        <a href={link} className="hover:bg-indigo-500 text-black p-3 sm:p-2 rounded-full">
                            <FiPlus size={18} />
                        </a>
                    )}

                    {/* Link button */}
                    {link && (
                        <a href={link} className="hover:bg-indigo-500 text-black p-3 sm:p-2 rounded-full">
                            <FiLink size={18} />
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};

export default Card;

