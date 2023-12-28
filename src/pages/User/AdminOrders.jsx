import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminOrders = () => {
  const { adminOrders, setAdminOrders, setRefresh } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredOrders = adminOrders.filter((order) =>
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

  const openModal = (orderId, orderStatus) => {
    setShowModal(true);
    setOrderId(orderId);
    setOrderStatus(orderStatus);
  };

  const closeModal = () => {
    setShowModal(false);
    setOrderId(null);
  };

  useEffect(() => {
    const authDetails = JSON.parse(localStorage.getItem("userData"));
    if (authDetails && authDetails.token) {
      setAuthToken(authDetails.token);
    }
  }, []);

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      if (
        orderStatus === "" ||
        orderStatus === null ||
        orderStatus === undefined ||
        authToken.token === null
      ) {
        console.error("Invalid data");
      }
      const response = await axios.post(
        `https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/orders/update?order_id=${orderId}&order_status=${orderStatus}`,
        {
          headers: {
            Authorization: `Bearer '${authToken}'`,
          },
        }
      );

      if (response.status === 200) {
        closeModal();
        setLoading(false);
        setRefresh(true);

        // Update the adminOrders state with the new data
        const updatedOrders = adminOrders.map((order) =>
          order.id === orderId ? { ...order, order_status: orderStatus } : order
        );
        setAdminOrders(updatedOrders);
        return toast.success("Order status updated successfully");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      {adminOrders && adminOrders.length > 0 ? (
        <section
          className={`items-center lg:flex bg-gray-50 font-poppins ${
            showModal && "opacity-50"
          }`}
        >
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
                      <th className="px-6 py-3 font-medium  ">Client ID</th>
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
                          {order.order_date.slice(0, 10)}
                        </td>
                        <td className="px-6 text-sm font-medium  ">
                          {order.customer_id}
                        </td>
                        <td className="px-6 text-sm font-medium  ">
                          <span className="inline-block px-2 py-1 text-gray-700  ">
                            {order.order_items.length}
                          </span>
                        </td>
                        <td className="px-6 text-sm">
                          <span
                            className={`inline-block px-2 py-1 ${
                              order.order_status === "completed" ||
                              order.order_status === "received"
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
                          <Link to={`/admin/orders/${order.id}`}>
                            <span className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                              View
                            </span>
                          </Link>
                          <button
                            onClick={() =>
                              openModal(order.id, order.order_status)
                            }
                          >
                            <span className="px-4 py-2 text-sm text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                              Edit
                            </span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-wrap items-center justify-between px-6 py-3">
                  <p className="mb-4 text-xs lg:mb-0  ">
                    Showing {indexOfFirstItem + 1} to{" "}
                    {indexOfLastItem > adminOrders.length
                      ? adminOrders.length
                      : indexOfLastItem}{" "}
                    of {adminOrders.length} entries
                  </p>
                  <nav aria-label="page-navigation">
                    <ul className="flex mb-4 list-style-none lg:mb-0">
                      {Array.from({
                        length: Math.ceil(adminOrders.length / itemsPerPage),
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
      {adminOrders && adminOrders.length > 0 && showModal && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full">
          <div className="h-[180px] p-6 mx-2 text-left bg-white rounded-md shadow-xl md:max-w-4xl">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="text-lg font-medium leading-6 text-gray-900"
                id="modal-headline"
              >
                Edit Order Status for Order #{orderId}
              </h3>
              <div className="mt-2">
                <select
                  name=""
                  id=""
                  defaultValue={orderStatus || "pending"}
                  onChange={(e) => setOrderStatus(e.target.value)}
                >
                  <option value="pending" disabled={orderStatus === "pending"}>
                    Pending
                  </option>
                  <option
                    value="received"
                    disabled={orderStatus === "received"}
                  >
                    Received
                  </option>
                  <option value="shipped" disabled={orderStatus === "shipped"}>
                    Shipped
                  </option>
                </select>
              </div>
              <div className="mt-10">
                <button className="bg-gray-500 mx-4" onClick={closeModal}>
                  <span className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700">
                    Close
                  </span>
                </button>
                <button
                  className="bg-gray-500"
                  onClick={handleUpdateStatus}
                  disabled={loading}
                >
                  <span className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    {loading ? "Loading..." : "Update Status"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
