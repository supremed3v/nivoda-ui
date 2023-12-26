import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nivodabackend.beartales.net/index.php/wp-json/jwt-auth/v1/token",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        const data = await response.data;

        setAuthDetails(data);
        setIsAuthenticated(true);

        // Set token and user_email as userData in localStorage
        const userData = {
          token: data.token,
          user_email: data.user_email,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        setLoading(false);
      } else {
        setLoading(false);
        console.error("Login failed", response);
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthDetails({});
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData && userData.token) {
      setLoading(true);
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
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setAuthDetails({});
      setUser(null);
      setLoading(false);
    }
  }, [authDetails.token]);

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
        loading,
        setLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
