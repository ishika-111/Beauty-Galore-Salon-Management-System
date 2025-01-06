// CourseCard.jsx
import React from "react";

export default function CourseCard({ image, title }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg">
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
        <h3 className="text-white text-xl font-semibold">{title}</h3>
        <button className="mt-4 self-center bg-white text-black px-4 py-2 rounded">
          Learn More
        </button>
      </div>
    </div>
  );
}
