import React from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ContentSkeleton } from "../../components/libs/skeleton";
import Accordion from "../../components/libs/Accordion";
export const SingleDiamond = () => {
  const { id } = useParams();
  console.log(id);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  console.log(import.meta.env.VITE_AUTH_EMAIL);

  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

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
        } else {
          console.log("Nivoda Diamonds Data:", diamondsData);
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
  }, []);

  if (loading) {
    // Display skeleton loader while data is being fetched
    return <ContentSkeleton />;
  }

  console.log(data, "diamondsData");

  return (
    data && (
      <motion.section
        className="text-gray-600 body-font overflow-hidden py-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container px-5 py-24 mx-auto">
          <motion.div
            className="lg:w-4/5 mx-auto flex flex-wrap"
            variants={containerVariants}
          >
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-[100%] h-44 object-contain object-center rounded"
              src={data?.image}
            />
            <div className="lg:w-1/2 w-full lg:pl-10  mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {data?.supplier?.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {data?.certificate.shape} {data?.certificate.carats}ct{" "}
                {data?.certificate.cut} {data?.certificate.color}{" "}
                {data?.certificate.clarity}
              </h1>
              <div className="flex mb-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Delivery Time: {data?.delivery_time.min_business_days} -{" "}
                  {data?.delivery_time.max_business_days} business days
                </h3>
              </div>
              <div className="flex py-2">
                <div className="flex align-middle items-center w-full">
                  <h3 className=" text-pretty font-bold text-gray-600 text-lg mb-1 w-full">
                    Total Price
                  </h3>
                  <span className="ml-auto text-pretty font-bold text-gray-600 text-xl ">
                    ${data?.price / 100}
                  </span>
                </div>

                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              {data?.certificate?.pdfUrl && (
                <a
                  href={data.certificate.pdfUrl}
                  className="text-white bg-gray-700 border-0 py-2 mb-2 px-6 focus:outline-none hover:bg-gray-600 rounded"
                  target="_blank"
                  rel="noreferrer"
                >
                  PDF Certificate Download
                </a>
              )}
              <button className="flex ml-auto text-white bg-gray-700 border-0 py-2 mb-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
                Add to cart
              </button>

              <div className="leading-relaxed">
                {/* Diamond Details */}
                <Accordion
                  title="Diamond Details"
                  details={[
                    { label: "Shape", value: data?.certificate.shape },
                    { label: "Size", value: data?.certificate.carats },
                    { label: "Colour", value: data?.certificate.color },
                    { label: "Clarity", value: data?.certificate.clarity },
                    { label: "Cut", value: data?.certificate.cut },
                    { label: "Polish", value: data?.certificate.polish },
                    { label: "Symmetry", value: data?.certificate.symmetry },
                    { label: "Fluorescence", value: data?.certificate.floInt },
                  ]}
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
                <Accordion
                  title="Additional Details"
                  details={[
                    { label: "Mine to market", value: "N/A" },
                    { label: "Mine of origin", value: "N/A" },
                  ]}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    )
  );
};
