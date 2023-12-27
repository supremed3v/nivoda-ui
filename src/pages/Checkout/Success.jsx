import { useEffect } from "react";
import { useCartContext } from "../../context/CartContext";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "../../components/libs/utils";
import { Link } from "react-router-dom";

export const Success = () => {
  const { clearCart } = useCartContext();
  useEffect(() => {
    clearCart();
    runFireworks();
  }, []);
  return (
    <div className="success-wrapper mt-10">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any question, please email
          <a href="mailto:saad.siddiqui@evolligence.com" className="email">
            diamondstore@mail.com
          </a>
        </p>
        <Link to="/explore" className="mt-4">
          <button
            type="button"
            width="300px"
            className="inline-flex bg-black text-white border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 rounded-lg text-lg
            transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110
            "
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};
