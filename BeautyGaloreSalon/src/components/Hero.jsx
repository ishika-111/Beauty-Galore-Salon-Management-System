import { Link } from "react-router-dom";
import Bgvideo from "../assets/VideoBG.mp4";
import React from "react";
import { useNavigate } from "react-router-dom";
import services from "../data/service.json";

import { FaArrowRight } from "react-icons/fa";
import ServiceCard from "./ServiceCard";

export default function Hero() {
  const navigate = useNavigate();

  // Display first 4 services
  const featuredServices = services.slice(0, 4);
  return (
    <div>
      <div className="relative">
        <video
          src={Bgvideo}
          autoPlay
          loop
          muted
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-40 text-white animate-pulse delay-200 ">
          <h1 className="text-5xl font-bold">Namaste!</h1>
          <p className="py-6 text-3xl text-center px-4 animate-fade-in delay-200">
            "Unleash Your Beauty, Redefine Confidence – Step Into the World of
            Beauty Galore Salon."
          </p>
          <Link to="/services">
            <button className="bg-lime-700 px-6 py-2 font-semibold rounded hover:bg-lime-600 transition-all duration-300 ">
              Explore Services
            </button>
          </Link>
        </div>
      </div>
      <div className="w-3/4 m-auto bg-[#EBF9E2]  flex items-center px-6 border-2 border-lime-700">
        <div className="bg-[#EBF9E2] p-6 text-justify ">
          Our salon is a space for everyone to feel comfortable and pampered
          with an extensive menu of hair, beauty, nail, and grooming options.
        </div>
        <button className=" btn btn-primary rounded text-white ">
          <Link to="/book">Make an Appointment</Link>
        </button>
      </div>
      <div className="my-10">
        <h1 className="text-3xl text-center font-semibold">
          Welcome to Beauty Galore Salon
        </h1>
        <div className="p-4 text-center font-poppins">
          <p1>
            Welcome to Beauty Galore Salon, your one-stop destination for
            beauty, style, and self-care. Explore a world of exceptional hair,
            beauty, nail, and grooming services tailored to your needs. From
            professional beauty treatments to expert courses and premium beauty
            products, we’re here to make you look and feel your best. Book your
            appointments online, shop your favorite products, and discover
            courses to elevate your skills – all in one place. At Beauty Galore
            Salon, beauty is more than a service; it’s an experience. Step in
            and let us pamper you today!
          </p1>
        </div>
      </div>
      <div>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold text-center text-lime-700 mb-12 animate-bounce">
            Featured Salon Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10">
            {featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={service.name}
                onLearnMore={() => navigate(`/services/${service.id}`)}
              />
            ))}
          </div>

          {/* Explore button to navigate to ServicePage */}
          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/services")}
              className="bg-lime-800 text-white px-6 py-3 rounded-full font-semibold hover:bg-lime-700 transition"
            >
              Explore All Services
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
