import { FiLogOut } from "react-icons/fi";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router";

function LogoutButton() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center gap-3">
      {user?.name && (
        <span className="text-sm text-gray-600 hidden sm:inline">
          {user.name}
        </span>
      )}
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 flex items-center gap-2"
      >
        <FiLogOut />
        Logout
      </button>
    </div>
  );
}

export default LogoutButton;
