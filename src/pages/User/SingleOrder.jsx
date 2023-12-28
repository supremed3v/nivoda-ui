import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
export const SingleOrder = () => {
  const { userOrders, user } = useAuthContext();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [orderItems, setOrderItems] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const orderResponse = await axios.get(
          `https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/orders/details?order_id=${id}`
        );
        const orderData = orderResponse.data;
        setOrder(orderData.order);

        // Fetching details for each order item
        const orderItemsPromises = orderData.order.order_items.map(
          async (item) => {
            const authResponse = await fetch(
              "https://integrations.nivoda.net/graphql-loupe360",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  query: `
                  {
                    authenticate {
                      username_and_password(username: "${
                        import.meta.env.VITE_AUTH_EMAIL
                      }", password: "${import.meta.env.VITE_AUTH_PASSWORD}") {
                        token
                      }
                    }
                  }
                `,
                }),
              }
            );

            const authData = await authResponse.json();

            if (authData.errors) {
              console.error("Nivoda Authentication Error:", authData.errors);
              return null;
            }

            const token =
              authData.data.authenticate.username_and_password.token;

            const diamondsResponse = await fetch(
              "https://integrations.nivoda.net/graphql-loupe360",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  query: `
                  {
                    diamond_by_id(id: "${item.product_id}") {
                        id
                        video
                        image
                        availability
                        supplierStockId
                        brown
                        green
                        milky
                        eyeClean
                        blue
                        gray
                        other
                        eyeClean
                        supplier{
                          id
                          name
                          locations{
                            country
                            city
                            state
                          }
                        }
                        delivery_time{
                          express_timeline_applicable
                          min_business_days
                          max_business_days
                        }
                        mine_of_origin
                        certificate {
                          id
                          lab
                          shape
                          certNumber
                          cut
                          carats
                          clarity
                          polish
                          symmetry
                          color
                          width
                          length
                          depth
                          girdle
                          floInt
                          floCol
                          depthPercentage
                          table
                          crownHeight
                          pdfUrl
                          crownAngle
                          pavDepth
                          pavAngle
                         }
                         mine_of_origin
                      price
                    }
                  }
                `,
                }),
              }
            );

            const diamondsData = await diamondsResponse.json();

            if (diamondsData.error) {
              console.error("Nivoda Diamonds Query Error:", diamondsData.error);
              return null;
            }

            return diamondsData.data.diamond_by_id;
          }
        );

        // Wait for all promises to resolve
        const orderItemsData = await Promise.all(orderItemsPromises);

        // Filter out null values (errors)
        const filteredOrderItems = orderItemsData.filter(
          (item) => item !== null
        );

        setOrderItems(filteredOrderItems);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log("order", order);
  console.log("orderItems", orderItems);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex items-center py-16 bg-gray-50 font-poppins ">
      <div className="justify-center flex-1 max-w-4xl px-6 py-6 mx-auto bg-gray-100 rounded-md shadow-md lg:py-10 lg:px-10">
        <div className="mb-16 text-center">
          <h1 className="mb-6 text-2xl font-semibold leading-7 tracking-wide text-gray-700 lg:text-4xl lg:leading-9">
            Thank you for your Order, {user.name}!
          </h1>
          <p className="text-lg text-gray-500">Your order ID is: {id}</p>
        </div>
        <div className="max-w-4xl mx-auto mb-10">
          <h2 className="mb-4 text-xl font-medium">What you ordered:</h2>
          {
            // If orderItems is null, show loading
            orderItems ? (
              orderItems.map((item) => (
                <div
                  className="p-10 mb-8 bg-white rounded-md shadow sm:flex sm:items-center xl:py-5 xl:px-12"
                  key={item.id}
                >
                  <a href="#" className="mr-6 md:mr-12">
                    <img
                      className=" w-full lg:w-[80px] h-[200px] lg:h-[80px]  object-cover  mx-auto mb-6 sm:mb-0 "
                      src={
                        item.image || "https://dummyimage.com/600x400/000/fff"
                      }
                      alt="dress"
                    />
                  </a>
                  <div>
                    <Link
                      className="inline-block mb-1 text-lg font-medium hover:underline"
                      to={`/diamond/${item.id}`}
                    >
                      {item.certificate?.shape} {item.certificate?.carats} ct
                    </Link>
                    <div className="flex flex-wrap">
                      <p className="mr-4 text-sm font-medium">
                        <span className="font-medium">Color:</span>
                        <span className="ml-2 text-gray-400">
                          {item.certificate?.color}
                        </span>
                      </p>
                      <p className="mr-4 text-sm font-medium">
                        <span className="font-medium">Size:</span>
                        <span className="ml-2 text-gray-400">
                          {item.certificate?.width} x {item.certificate?.length}{" "}
                          x {item.certificate?.depth}
                        </span>
                      </p>
                      <p className="mr-4 text-sm font-medium">
                        <span className="font-medium">Price:</span>
                        <span className="ml-2 text-gray-400">
                          {" "}
                          ${(item.price / 100).toLocaleString("en-US")}
                        </span>
                      </p>
                      <p className="text-sm font-medium">
                        <span>Qty:</span>
                        <span className="ml-2 text-gray-400">
                          {
                            order.order_items.find(
                              (orderItem) => orderItem.product_id === item.id
                            ).quantity
                          }
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )
          }
        </div>
        <div className="max-w-4xl mx-auto ">
          <h2 className="mb-4 text-xl font-medium ">Order Details:</h2>
          <div className="grid grid-cols-1 gap-8 mb-10 lg:grid-cols-3">
            <div className="relative flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow">
              <div className="absolute right-0 flex items-center justify-center bg-blue-500 rounded-md w-14 h-14">
                <div className="flex items-center justify-center text-lg font-bold text-blue-500 bg-gray-100 rounded-full  w-11 h-11">
                  {orderItems ? orderItems.length : <div>Loading...</div>}
                </div>
              </div>
              <span className="mr-16">Products</span>
            </div>
            <div className="flex items-center justify-between px-10 py-3 font-medium leading-8 bg-white rounded-md shadow font-heading">
              <span>Total</span>
              <span className="flex items-center text-blue-500 dark:text-blue-400">
                <span className="ml-3 mr-1 text-sm">$</span>
                <span className="text-xl">
                  {orderItems ? (
                    (
                      orderItems.reduce((acc, item) => acc + item.price, 0) /
                      100
                    ).toLocaleString("en-US")
                  ) : (
                    <div>Loading...</div>
                  )}
                </span>
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between px-10 py-3 mb-4 font-medium leading-8 bg-white bg-opacity-50 rounded-md shadow font-heading">
            <span>Shipping Address</span>
            <span className="flex items-center">
              <span className="ml-3 mr-1 text-sm">Address:</span>

              <p className="text-sm text-gray-500">{order.address}</p>
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 ">
            <Link
              to={
                userOrders && userOrders.length > 0
                  ? "/account/orders"
                  : "/explore"
              }
              className="w-full px-6 py-3 text-blue-500 border border-blue-500 rounded-md md:w-auto hover:text-gray-100 hover:bg-blue-600 "
            >
              {userOrders && userOrders.length > 0
                ? "View All Orders"
                : "Continue Shopping"}
            </Link>
            <button className="w-full px-6 py-3 text-gray-100 bg-blue-500 rounded-md md:w-auto hover:bg-blue-600 hidden">
              Download Invoice
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
