import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";

export const Orders = () => {
  const { userOrders, user } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredOrders = userOrders.filter((order) =>
    Object.values(order).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div>
      {userOrders && userOrders.length > 0 ? (
        <section className="items-center lg:flex bg-gray-50 font-poppins">
          <div className="justify-center flex-1 max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
            <div className="overflow-x-auto bg-white rounded shadow">
              <div className="">
                <h2 className="px-6 py-4 pb-4 text-xl font-medium border-b border-gray-300">
                  Invoices
                </h2>
                <div className="flex flex-wrap items-center justify-between px-4 py-2 border-b">
                  <div className="flex items-center pl-3">
                    <p className="text-xs text-gray-400">Show</p>
                    <div className="px-2 py-2 text-xs text-gray-500 ">
                      <select
                        name=""
                        id=""
                        className="block text-base bg-gray-100 cursor-pointer w-11  "
                        onChange={(e) => setItemsPerPage(e.target.value)}
                        value={itemsPerPage}
                      >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">20</option>
                      </select>
                    </div>
                    <p className="text-xs text-gray-400">entries</p>
                  </div>
                  <div className="flex px-4 py-2 mb-4 border border-gray-300 rounded-md md:mb-0">
                    <input
                      type="text"
                      className="w-full pr-4 text-sm text-gray-700 bg-white  placeholder-text-100 "
                      placeholder="search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="flex items-center text-gray-700 hover:text-blue-600">
                      <span className="mr-2 text-xs ">Go</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <table className="w-full table-auto">
                  <thead className="bg-gray-100 ">
                    <tr className="text-xs text-left text-gray-500 border-b border-gray-200">
                      <th className="flex items-center py-3 pl-6 font-medium  ">
                        <input className="mr-4" type="checkbox" name="" id="" />
                        <span>Order ID</span>
                      </th>

                      <th className="px-6 py-3 font-medium  ">Created</th>
                      <th className="px-6 py-3 font-medium  ">Client</th>
                      <th className="px-6 py-3 font-medium  ">
                        Products Count
                      </th>
                      <th className="px-6 py-3 font-medium  ">Status</th>
                      <th className="px-6 py-3 font-medium  ">Amount</th>
                      <th className="px-6 py-3 font-medium  ">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentOrders.map((order) => (
                      <tr className="border-b border-gray-200" key={order.id}>
                        <td className="flex items-center px-6 py-3 text-sm font-medium">
                          <input
                            className="mr-4"
                            type="checkbox"
                            name=""
                            id=""
                          />
                          <p className=" ">{order.id}</p>
                        </td>
                        <td className="px-6 text-sm font-medium  ">
                          {order.order_date}
                        </td>
                        <td className="px-6 text-sm font-medium  ">
                          {user.name}
                        </td>
                        <td className="px-6 text-sm font-medium  ">
                          <span className="inline-block px-2 py-1 text-gray-700  ">
                            {order.order_items.length}
                          </span>
                        </td>
                        <td className="px-6 text-sm">
                          <span
                            className={`inline-block px-2 py-1 ${
                              order.order_status === "completed"
                                ? "text-green-700 bg-green-100"
                                : "text-orange-700 bg-orange-100"
                            } rounded-md"`}
                          >
                            {order.order_status}
                          </span>
                        </td>
                        <td className="px-6 text-sm font-medium  ">
                          {order.total_amount}
                        </td>
                        <td>
                          <Link to={`/account/orders/${order.id}`}>
                            <span className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                              View
                            </span>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-wrap items-center justify-between px-6 py-3">
                  <p className="mb-4 text-xs lg:mb-0  ">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {indexOfLastItem > userOrders.length
                      ? userOrders.length
                      : indexOfLastItem}{" "}
                    of {userOrders.length} entries
                  </p>
                  <nav aria-label="page-navigation">
                    <ul className="flex mb-4 list-style-none lg:mb-0">
                      {Array.from({
                        length: Math.ceil(userOrders.length / itemsPerPage),
                      }).map((_, index) => (
                        <li
                          key={index}
                          className={`page-item ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            onClick={() => handlePageChange(index + 1)}
                            className="relative block px-3 py-1 mr-1 text-xs transition-all duration-300 rounded-md hover:text-blue-700 hover:bg-blue-200"
                          >
                            {index + 1}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">You have no orders.</h1>
          <p className="text-lg text-gray-500">
            Buy some items to see them here.
          </p>
        </div>
      )}
    </div>
  );
};
