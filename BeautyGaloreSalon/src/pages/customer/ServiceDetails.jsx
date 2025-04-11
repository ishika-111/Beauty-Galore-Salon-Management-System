import React from "react";
import { useParams } from "react-router-dom";
import services from "../../data/service.json";

const ServiceDetails = () => {
  const { id } = useParams();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="text-center mt-10 text-red-500">Service not found.</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <img
          src={service.image}
          alt={service.name}
          className="w-full h-90 object-cover rounded-xl mb-6"
        />
        <h2 className="text-3xl font-bold text-lime-700 mb-4">
          {service.name}
        </h2>
        <p className="text-gray-700 leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
};

export default ServiceDetails;
