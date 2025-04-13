import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../../data/service.json";
import { motion, AnimatePresence } from "framer-motion";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ((prev) => (prev === index ? null : index));
  };

  if (!service) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold font-poppins">
        Service not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-poppins">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-lg font-medium text-lime-800 hover:underline"
        >
          ← Back to Services
        </button>
        <div className="text-sm text-gray-500 mt-1">
          Home / Services /{" "}
          <span className="text-lime-800 font-semibold">{service.name}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-100 overflow-hidden">
        <div className="relative">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-72 object-cover sm:h-96 md:h-[450px] transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none rounded-t-2xl" />
        </div>

        <div className="p-6 sm:p-10">
          <h2 className="text-4xl font-extrabold text-lime-700 mb-4">
            {service.name}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>
      {service.types && service.types.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-bold mb-6 text-lime-700">
            Types of {service.name}
          </h3>
          <div className="space-y-8">
            {service.types.map((type, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-start gap-6 bg-white rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full sm:w-48 h-40 object-cover rounded-lg"
                />
                <div>
                  <h4 className="text-xl font-semibold text-lime-800 mb-2">
                    {type.name}
                  </h4>
                  <p className="text-gray-700">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {service.faq && (
        <div className="mt-10">
          <h3 className="text-2xl font-bold mb-6">FAQ</h3>
          <div className="divide-y divide-gray-300 border border-gray-300 rounded-xl overflow-hidden">
            {service.faq.map((item, index) => (
              <div key={index} className="px-5 py-4">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex justify-between items-center w-full text-left text-lg font-medium text-white bg-lime-800 px-4 py-3 rounded-md transition"
                >
                  {item.question}
                  <span className="ml-4 text-xl">
                    {openFAQ === index ? "−" : "+"}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFAQ === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden text-gray-800 bg-white px-4 py-3 rounded-b-md mt-2"
                    >
                      {item.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetails;
