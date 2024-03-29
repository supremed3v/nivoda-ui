import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ContentSkeleton } from "../../components/libs/skeleton";
import Accordion from "../../components/libs/Accordion";
import { useCartContext } from "../../context/CartContext";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
// eslint-disable-next-line no-unused-vars
import thumb from "../../assets/360-thumb.jpg";
import backSvg from "../../assets/back.svg";
import Modal from "react-modal";
import { Tb360View } from "react-icons/tb";
import { IoMdCloseCircle } from "react-icons/io";

export const SingleDiamond = () => {
  const { addToCart } = useCartContext();
  const { id } = useParams();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  console.log(modalIsOpen);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 2); // Assuming there are only two slides (image and video)
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 2) % 2);
  };

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  console.log(data);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
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
                                    }", password: "${
                import.meta.env.VITE_AUTH_PASSWORD
              }") {
                                        token
                                    }
                                }
                            }
                        `,
            }),
          }
        );

        const authData = await response.json();

        if (authData.errors) {
          console.error("Nivoda Authentication Error:", authData.errors);
          return;
        }

        const token = authData.data.authenticate.username_and_password.token;

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
                    diamond_by_id(id: "${id}") {
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
                          f_color
                         }
                         mine_of_origin
                         v360 {
                          url
                         }
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
        } else {
          setData(diamondsData.data.diamond_by_id);
          // Set diamondsData in state or perform other actions as needed
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching Nivoda data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    // Display skeleton loader while data is being fetched
    return <ContentSkeleton />;
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "550px",
      height: "550px",
    },
  };

  return (
    data && (
      <motion.section
        className="text-gray-600 body-font overflow-hidden py-10 mt-[100px]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container px-96 items-center justify-center">
          <Link
            className="text-lg font-bold flex items-center text-current gap-2 cursor-pointer"
            to={"/explore"}
          >
            <span>
              <img src={backSvg} alt="back-svg" width={40} height={40} />
            </span>
            Back to search
          </Link>
        </div>
        <div className="container px-5 py-24 mx-auto">
          <motion.div
            className="lg:w-4/5 mx-auto flex flex-wrap"
            variants={containerVariants}
          >
            <div className="flex flex-col lg:w-1/2 w-full lg:h-[100%] h-full object-center rounded relative">
              <Carousel
                selectedItem={currentSlide}
                onChange={goToSlide}
                showStatus={false}
                showIndicators={true}
                stopOnHover={false}
                swipeable={true}
                emulateTouch={true}
                dynamicHeight={true}
                useKeyboardArrows={true}
                className="w-full h-full object-cover rounded relative"
                showArrows={true}
                showThumbs={false}
              >
                <img
                  alt="ecommerce"
                  className="w-full h-[500px] object-cover rounded"
                  src={data?.image}
                />
              </Carousel>
              {/*  */}
              {/* Thumbnails */}
              <div className="flex justify-center mt-4">
                <img
                  src={data?.image}
                  alt="Thumbnail Image"
                  className={`thumbnail ${
                    currentSlide === 0 ? "border-2 border-black" : ""
                  } w-16 h-16 cursor-pointer`}
                  onClick={() => goToSlide(0)}
                />

                <button onClick={() => setIsOpen(true)}>
                  <img
                    src={thumb}
                    alt="Thumbnail Video"
                    className={`thumbnail ${
                      currentSlide === 1 ? "border-2 border-black" : ""
                    } w-16 h-16 cursor-pointer ml-2`}
                    // onClick={() => goToSlide(1)}
                  />
                </button>

                {/* <button>
                  <span className="">
                    <Tb360View size={20} color="white" />
                  </span>
                </button> */}
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={() => setIsOpen(false)}
                  style={customStyles}
                >
                  {/* <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-0 right-0 bg-gray-900 text-white rounded-full p-2 m-2 cursor-pointer focus:outline-none"
                  >
                    <IoMdCloseCircle size={20} color="white" />
                  </button> */}
                  <iframe
                    src={data?.video}
                    width="100%"
                    height="100%"
                    allowfullscreen
                  ></iframe>
                </Modal>
              </div>
            </div>

            <div className="lg:w-1/2 w-full lg:pl-10  mt-6 lg:mt-0">
              {/* <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {data?.supplier?.name}
              </h2> */}

              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {data?.certificate.shape} {data?.certificate.carats}ct{" "}
                {data?.certificate.cut} {data?.certificate.color}{" "}
                {data?.certificate.clarity}
              </h1>
              <div className="flex mb-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Delivery Time: {data?.delivery_time.min_business_days} -{" "}
                  {data?.delivery_time.max_business_days + 2} business days
                </h3>
              </div>
              <div className="flex py-2">
                <div className="flex justify-between items-center w-full">
                  <h3 className=" text-pretty font-bold text-gray-600 text-lg mb-1 w-full">
                    Total Price
                  </h3>
                  <span className="ml-auto text-pretty font-bold text-gray-600 text-xl ">
                    ${(data?.price / 100).toLocaleString("en-US")}
                  </span>
                </div>
              </div>
              <div className="flex py-2">
                <div className="flex justify-between items-center w-full">
                  {data?.certificate?.pdfUrl && (
                    <a
                      href={data.certificate.pdfUrl}
                      className="text-white bg-gray-700 border-0 py-2 mb-2 px-6 capitalize focus:outline-none hover:bg-gray-600 rounded"
                      target="_blank"
                      rel="noreferrer"
                    >
                      view diamond certificate
                    </a>
                  )}
                  <button
                    className="flex ml-auto text-white bg-gray-700 border-0 py-2 mb-2 px-6 focus:outline-none hover:bg-gray-600 rounded"
                    onClick={() => addToCart(data)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>

              <div className="leading-relaxed">
                {/* Diamond Details */}
                <Accordion
                  title="Diamond Details"
                  details={[
                    { label: "Shape", value: data?.certificate.shape },
                    { label: "Size", value: data?.certificate.carats },
                    { label: "Certificate", value: data?.certificate.lab },
                    { label: "Colour", value: data?.certificate.f_color },
                    { label: "Clarity", value: data?.certificate.clarity },
                    { label: "Cut", value: data?.certificate.cut },
                    { label: "Polish", value: data?.certificate.polish },
                    { label: "Symmetry", value: data?.certificate.symmetry },
                    { label: "Fluorescence", value: data?.certificate.floInt },
                  ]}
                  defaultOpen={true}
                />

                {/* Measurements */}
                <Accordion
                  title="Measurements"
                  details={[
                    { label: "Depth", value: data?.certificate?.depth },
                    {
                      label: "Table",
                      value:
                        typeof data?.certificate?.table === "string"
                          ? `${parseFloat(data.certificate.table).toFixed(2)}%`
                          : "N/A",
                    },
                    {
                      label: "Crown angle",
                      value:
                        typeof data?.certificate?.crownAngle === "string"
                          ? `${parseFloat(data.certificate.crownAngle).toFixed(
                              2
                            )}°`
                          : "N/A",
                    },
                    {
                      label: "Crown height",
                      value:
                        typeof data?.certificate?.crownHeight === "string"
                          ? `${parseFloat(data.certificate.crownHeight).toFixed(
                              2
                            )}%`
                          : "N/A",
                    },
                    {
                      label: "Pavilion angle",
                      value:
                        typeof data?.certificate?.pavAngle === "string"
                          ? `${parseFloat(data.certificate.pavAngle).toFixed(
                              2
                            )}%`
                          : "N/A",
                    },
                    {
                      label: "Pavilion depth",
                      value:
                        typeof data?.certificate?.pavDepth === "string"
                          ? `${parseFloat(data.certificate.pavDepth).toFixed(
                              2
                            )}%`
                          : "N/A",
                    },
                  ]}
                />

                {/* Additional Details */}
                {/* <Accordion
                  title="Additional Details"
                  details={[
                    { label: "Mine to market", value: "N/A" },
                    { label: "Mine of origin", value: "N/A" },
                  ]}
                /> */}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    )
  );
};
