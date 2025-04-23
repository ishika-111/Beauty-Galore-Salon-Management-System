import React, { useState } from "react";
import services from "../../data/service.json";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import servicebg from "../../assets/Service.jpg";

const ServicePage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Filter services based on the search term
  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div
        className="w-[100%] h-[60vh] bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${servicebg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-30 gap-4">
          <h1 className="text-white font-semibold text-4xl text-center px-6">
            "Because your beauty deserves nothing less than perfection."
          </h1>

          {/* Search Input positioned on the background image */}
          <div className="absolute bottom-10 w-full max-w-md p-3 rounded-lg border border-gray-300">
            <input
              type="text"
              className="w-full p-3 rounded-lg text-black"
              placeholder="Search for a service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-lime-700 mb-12">
          Our Salon Services
        </h2>

        {/* Display filtered services */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.name}
              onLearnMore={() => navigate(`/customer/services/${service.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
