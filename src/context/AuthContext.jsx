import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const response = await fetch(
        "https://nivodabackend.beartales.net/index.php/wp-json/jwt-auth/v1/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();

        setAuthDetails(data);
        setIsAuthenticated(true);

        // Set token and user_email as userData in localStorage
        const userData = {
          token: data.token,
          user_email: data.user_email,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      setAuthDetails(userData);
      setIsAuthenticated(true);

      axios
        .get(
          "https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/users/me",
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        )
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setIsAuthenticated(false);
      setAuthDetails({});
      setUser(null);
    }
  }, [authDetails.token, authDetails.user_email, isAuthenticated, user]);

  return (
    <AuthContext.Provider
      value={{
        authDetails,
        login,
        setAuthDetails,
        setIsAuthenticated,
        isAuthenticated,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
