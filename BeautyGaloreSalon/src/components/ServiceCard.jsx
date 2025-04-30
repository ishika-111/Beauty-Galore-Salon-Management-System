import React from "react";

export default function ServiceCard({
  image,
  title,
  description,
  price,
  onLearnMore,
}) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg border-2 border-black transition-transform transform scale-95 hover:scale-100 hover:shadow-xl">
      <img
        src={image}
        alt={title}
        className="w-full h-64 object-cover"
        onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")} // Fallback image
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <h3 className="text-white text-center text-xl font-semibold">
          {title}
        </h3>
        <p className="text-white text-center text-sm mt-2">{description}</p>
        <p className="text-white text-center text-lg font-bold mt-2">
          {price}
        </p>{" "}
        {/* Display price */}
        <button
          onClick={onLearnMore}
          className="mt-4 self-center bg-lime-700 text-white px-4 py-2 rounded transition-colors hover:bg-lime-800"
          aria-label={`Learn more about ${title}`}
        >
          Learn More
        </button>
      </div>
    </div>
  );
}
