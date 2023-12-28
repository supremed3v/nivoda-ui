import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authDetails, setAuthDetails] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [adminOrders, setAdminOrders] = useState([]);
  const [refresh, setRefresh] = useState(false);

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
          user_id: authDetails.id,
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
  const handleSignup = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/register",
        {
          username: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
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

  useEffect(() => {
    if (isAuthenticated && user && user.id) {
      axios
        .get(
          `https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/orders?customer_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${authDetails.token}`,
            },
          }
        )
        .then((response) => {
          setUserOrders(response.data.orders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated && userRole === "administrator") {
      axios
        .get(
          `https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/orders/all`,
          {
            headers: {
              Authorization: `Bearer ${authDetails.token}`,
            },
          }
        )
        .then((response) => {
          setAdminOrders(response.data.orders);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isAuthenticated, userRole, authDetails.token, refresh]);

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
        userOrders,
        userRole,
        setUserRole,
        adminOrders,
        refresh,
        setRefresh,
        handleSignup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
