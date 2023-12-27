import { useCartContext } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";
import previewImage from "../../assets/nopreview.jpg";
import { loadStripe } from "@stripe/stripe-js";
import { Link, useNavigate } from "react-router-dom";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export const Checkout = () => {
  const { cartItems, getCartSubTotal } = useCartContext();
  const { isAuthenticated, user } = useAuthContext();

  return (
    <Elements stripe={loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)}>
      <CheckOutSection
        cartItems={cartItems}
        getCartSubTotal={getCartSubTotal}
        user={user}
      />
    </Elements>
  );
};

const CheckOutSection = ({ cartItems, getCartSubTotal, user }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState(null);
  const states = [
    "Alabama",
    "Alaska",
    "American Samoa",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
  ];

  const navigate = useNavigate();
  const handleSubmit = async () => {
    setLoading(true);

    if (address === "" || email === "" || state === "" || zip === null) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }
    let clientAddress = `${address}, ${state}, ${zip.toString()}`;

    try {
      const amount = getCartSubTotal() / 100;
      const response = await axios.post(
        "https://nivoda-staging-ui.netlify.app/.netlify/functions/stripe",
        {
          amount,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { client_secret, paymentIntentId } = response.data;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
        setLoading(false);
        return;
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment Success");
          const order_items = [];

          cartItems.forEach((item) => {
            order_items.push({
              product_id: item.id,
              quantity: item.qty,
              price: item.price,
            });
          });

          const data = {
            customer_id: user.id,
            total_amount: amount,
            order_date: new Date().toISOString(),
            order_status: "pending",
            stripe_paymentintent_id: paymentIntentId,
            address: clientAddress,
            order_items,
          };
          const response = await axios.post(
            "https://nivodabackend.beartales.net/index.php/wp-json/wp/v2/orders",
            data,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.data.status === "ORDER_CREATED") {
            console.log("Order Created");
            setLoading(false);
            navigate("/checkout/success");
          } else {
            console.log("Order Failed");
            console.log(response.data);
            setLoading(false);
          }
          setLoading(false);
        }
      }

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="items-center pt-[160px] pb-[40px]">
      <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col rounded-lg bg-white sm:flex-row"
              >
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={item.image || previewImage}
                  alt=""
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <Link to={`/diamond/${item.id}`} className="font-semibold">
                    {item?.certificate.shape} {item?.certificate.carats}ct{" "}
                  </Link>
                  <span className="float-right text-gray-400">
                    {item?.certificate.cut} {item?.certificate.color}{" "}
                    {item?.certificate.clarity}
                  </span>
                  <p className="text-lg font-bold">
                    {" "}
                    ${(item.price / 100).toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>

            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <CardElement
              className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500
            "
            />
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <img
                    className="h-4 w-4 object-contain"
                    src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg"
                    alt=""
                  />
                </div>
              </div>
              <select
                type="text"
                name="billing-state"
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="State">State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <input
                type="number"
                name="billing-zip"
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  ${(getCartSubTotal() / 100).toLocaleString("en-US")}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">$8.00</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${(getCartSubTotal() / 100 + 8).toLocaleString("en-US")}
              </p>
            </div>
          </div>
          <button
            className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Loading..." : "Place Order"}
          </button>
        </div>
      </div>
    </section>
  );
};
