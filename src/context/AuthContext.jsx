import { createContext, useContext, useState } from "react";
import { initialUserState } from "../state/userState";

 
export const AuthContext = createContext(null);

 
export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    // Page refresh pe localStorage se data restore karo
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "null");

    if (token && user) {
      return {
        user,
        token,
        isLoggedIn: true,
      };
    }

    return initialUserState;
  });
 
  function login(userData, token) {
    const newState = {
      user: userData,
      token: token,
      isLoggedIn: true,
    };

    setAuthState(newState);

 
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", userData.role);
  }
 
  function logout() {
    setAuthState(initialUserState);
    localStorage.clear();
  }

 
  function updateUser(updatedUser) {
    setAuthState((prev) => ({
      ...prev,
      user: updatedUser,
    }));
    localStorage.setItem("user", JSON.stringify(updatedUser));
  }

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        token: authState.token,
        isLoggedIn: authState.isLoggedIn,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
 
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth ko AuthProvider ke andar use karo!");
  }

  return context;
}
