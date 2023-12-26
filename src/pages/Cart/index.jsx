import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import previewImage from "../../assets/nopreview.jpg";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const Cart = () => {
  const { cartItems, removeFromCart, getCartSubTotal, addQty, removeQty } =
    useCartContext();

  const { isAuthenticated } = useAuthContext();
  return (
    <section className="items-center pt-[140px] pb-[20px] bg-gray-50 font-poppins">
      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-semibold">Your cart is empty.</h1>
          <p className="text-lg text-gray-500">
            Add some items to see them here.
          </p>
        </div>
      ) : (
        <>
          <div className="justify-center flex-1 px-4 py-6 mx-auto max-w-7xl lg:py-4 lg:px-6">
            <h2 className="mb-10 text-4xl font-bold text-center">Your Cart</h2>
            <div className="px-6 mb-10 lg:px-0">
              {cartItems.map((item) => (
                <>
                  <div
                    key={item.id}
                    className="relative flex flex-wrap items-center pb-8 mb-8 -mx-4 border-b border-gray-200 dark:border-gray-500 xl:justify-between border-opacity-40"
                  >
                    <div className="w-full mb-4 md:mb-0 h-96 md:h-44 md:w-56">
                      <img
                        src={item.image || previewImage}
                        alt=""
                        className="object-cover w-full h-full
                        rounded-md hover:border transition duration-150 ease-in-out
                        "
                      />
                    </div>
                    <div className="w-full px-4 mb-6 md:w-96 xl:mb-0">
                      <Link
                        className="block mb-5 text-xl font-medium hover:underline "
                        to={`/diamond/${item.id}`}
                      >
                        {item?.certificate.shape} {item?.certificate.carats}ct{" "}
                        {item?.certificate.cut} {item?.certificate.color}{" "}
                        {item?.certificate.clarity}
                      </Link>
                      <div className="flex flex-wrap">
                        <p className="mr-4 text-sm font-medium">
                          <span>Color:</span>
                          <span className="ml-2 text-gray-400 dark:text-gray-400">
                            {item.certificate.color}
                          </span>
                        </p>
                        <p className="mr-4 text-sm font-medium">
                          <span>Shape:</span>
                          <span className="ml-2 text-gray-400 dark:text-gray-400">
                            {item.certificate.shape}
                          </span>
                        </p>
                        <p className="mr-4 text-sm font-medium">
                          <span>Cut:</span>
                          <span className="ml-2 text-gray-400 dark:text-gray-400">
                            {item.certificate.cut}
                          </span>
                        </p>
                        <p className="mr-4 text-sm font-medium">
                          <span>Symmetry:</span>
                          <span className="ml-2 text-gray-400 dark:text-gray-400">
                            {item.certificate.symmetry}
                          </span>
                        </p>
                        <p className="mr-4 text-sm font-medium">
                          <span>Clarity:</span>
                          <span className="ml-2 text-gray-400 dark:text-gray-400">
                            {item.certificate.clarity}
                          </span>
                        </p>

                        <p className="text-sm font-medium">
                          <span>Size:</span>
                          <span className="ml-2 text-gray-400">
                            {item.certificate.carats}ct
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full px-4 mt-6 mb-6 xl:w-auto xl:mb-0 xl:mt-0">
                      <div className="flex items-center">
                        <h2 className="mr-4 font-medium">Qty:</h2>
                        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-300 rounded-md">
                          <button
                            className="py-2 pr-2 border-r border-gray-300 hover:text-gray-700"
                            onClick={() => removeQty(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-dash"
                              viewBox="0 0 16 16"
                            >
                              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"></path>
                            </svg>
                          </button>
                          <input
                            type="number"
                            className="w-12 px-2 py-4 text-center border-0 rounded-md bg-gray-50"
                            placeholder="1"
                            value={item.qty}
                            readOnly={true}
                          />
                          <button
                            className="py-2 pl-2 border-l border-gray-300 hover:text-gray-700"
                            onClick={() => addQty(item)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-plus"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="w-full px-4 xl:w-auto">
                      <span className="text-xl font-medium text-blue-500 dark:text-blue-400 ">
                        <span className="text-sm">$</span>
                        <span>
                          {(item.price / 100).toLocaleString("en-US")}
                        </span>
                      </span>
                    </div>
                    <button
                      className="absolute top-0 right-0 text-gray-400 lg:mt-6 lg:-mr-4 hover:text-gray-600"
                      onClick={() => removeFromCart(item)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="w-6 h-6 bi bi-x-circle"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
                      </svg>
                    </button>
                  </div>
                </>
              ))}
            </div>
            <div className="flex flex-wrap justify-between">
              <div className="w-full lg:w-1/3"></div>
              <div className="w-full lg:w-1/3">
                <div>
                  <h2 className="mb-6 text-3xl font-bold">Cart totals</h2>

                  <div className="flex items-center justify-between px-10 py-4 mb-6 font-medium leading-8 bg-gray-100 border rounded-xl">
                    <span>Total</span>
                    <span className="flex items-center text-xl text-blue-500">
                      <span className="mr-2 text-base">$</span>
                      <span>
                        {(getCartSubTotal() / 100).toLocaleString("en-US")}
                      </span>
                    </span>
                  </div>
                  {isAuthenticated ? (
                    <Link
                      className="inline-block w-full px-6 py-4 text-lg font-medium leading-6 tracking-tighter text-center text-white bg-blue-500 lg:w-auto hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl"
                      to={"/checkout"}
                    >
                      Checkout
                    </Link>
                  ) : (
                    <button
                      className="inline-flex bg-black text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded-lg text-lg"
                      onClick={() => toast.error("Please login to checkout.")}
                    >
                      Checkout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
