import React from "react";
import services from "../../data/service.json";
import { useNavigate } from "react-router-dom";
import ServiceCard from "../../components/ServiceCard";
import servicebg from "../../assets/Service.jpg";

const ServicePage = () => {
  const navigate = useNavigate();

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
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center text-lime-700 mb-12">
          Our Salon Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              image={service.image}
              title={service.name}
              onLearnMore={() => navigate(`/services/${service.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
