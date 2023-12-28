import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
export const Profile = () => {
  return (
    <section className="mt-40">
      <div className="flex px-10">
        <div className="w-1/6 h-[800px] bg-gray-50 flex flex-col">
          {/* Sidebar */}
          <ul className="flex flex-col justify-center content-center text-center space-y-2">
            <li className="bg-gray-200 p-2 rounded-md">
              <NavLink to="/account" className="text-blue-500 font-bold">
                User Profile
              </NavLink>
            </li>
            <li className="bg-gray-200 p-2 rounded-md">
              <NavLink to="/account/orders" className="text-blue-500 font-bold">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="w-3/4 px-10">
          {/* Content */}
          <Outlet />
        </div>
      </div>
    </section>
  );
};

export const Account = () => {
  const { logout } = useAuthContext();
  return (
    <div>
      <h2>Account Page</h2>
      <button onClick={logout}>Logout</button>
      {/* Add content for the Account page */}
    </div>
  );
};
