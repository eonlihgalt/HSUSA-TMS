import { useState } from "react";
import LoginPage from "../modules/auth/LoginPage";
import UserListPage from "../modules/users/UserListPage";
import RoleListPage from "../modules/roles/RoleListPage";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Callback to handle successful login
  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  // Conditional rendering based on login state
  return (
    <div>
      {loggedIn ? (
        <RoleListPage /> /// <UserListPage /> /// 
      ) : (
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}