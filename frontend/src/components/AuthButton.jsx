import DropDownLogin from "./DropDownLogin";
import { useAuth } from "./AuthContext";
import LogoutButton from "./logoutButton";

function AuthButton() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <LogoutButton />;
  }
  return <DropDownLogin />;
}

export default AuthButton;
