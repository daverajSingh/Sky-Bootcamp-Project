import { FiUser } from 'react-icons/fi';
/* Landing Page Header Component*/

const Header = () => {

  // Give a gradient effect to text
  const GRADIENT_CLASS = "text-2xl font-bold bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text";
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md h-20">
      <div className="flex items-center h-full">


        {/* Sky */}
        <div className="px-4 flex items-center h-full">
          <h1 className={GRADIENT_CLASS}>
            Sky
          </h1>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 h-full" />

        {/* Sky Immersion */}
        <div className="px-4 flex items-center h-full">
          <p className={GRADIENT_CLASS}>
            <a href="/">Sky Immersion</a>
          </p>
        </div>
      </div>

      {/* Admin Button */}
      <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition duration-300">
        <FiUser size={20} />
      </button>
    </header>
  );
};

export default Header;

