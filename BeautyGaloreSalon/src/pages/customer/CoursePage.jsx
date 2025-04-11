import { useState } from "react";
import CourseCard from "../../components/CourseCard";
import coursebg from "../../assets/Course.jpg";
import coursesData from "../../data/course.json"; // Import the JSON data

export default function CoursePage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Function to handle "Learn More" button click
  const handleLearnMore = (course) => {
    setSelectedCourse(course);
  };

  return (
    <div>
      <div
        className="w-[100%] h-[60vh] bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${coursebg})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-30 gap-4">
          <h1 className="text-white font-semibold text-4xl text-center px-6">
            “Invest in your passion and let your skills sparkle like a diamond.”
          </h1>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-3xl text-center mt-6">Our Courses</h1>
      </div>
      <div className="text-black py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-12">
          {coursesData.courses.map((course, index) => (
            <div key={index} className="flex flex-col items-center">
              <CourseCard
                image={course.image}
                title={course.title}
                onLearnMore={() => handleLearnMore(course)} // Pass the course to handleLearnMore
              />
            </div>
          ))}
        </div>
      </div>

      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-[#d9e4d3] p-8 rounded-lg w-full sm:w-96 shadow-xl transition-transform transform scale-95 hover:scale-100">
            <h2 className="text-2xl font-semibold text-center mb-4">
              {selectedCourse.title}
            </h2>
            <p className="mt-2 text-lg">
              <strong>Duration:</strong> {selectedCourse.details.duration}
            </p>
            <p className="mt-2 text-lg">
              <strong>Certificate:</strong> {selectedCourse.details.certificate}
            </p>
            <p className="mt-2 text-lg">
              <strong>Prerequisites:</strong>{" "}
              {selectedCourse.details.prerequisites}
            </p>
            <div className="mt-4">
              <strong className="text-lg">Learning Outcomes:</strong>
              <ul className="list-disc pl-5 mt-2">
                {selectedCourse.details.learning_outcomes.map(
                  (outcome, index) => (
                    <li key={index} className="text-lg">
                      {outcome}
                    </li>
                  )
                )}
              </ul>
            </div>
            <button
              className="mt-6 w-full bg-lime-800 text-white py-2 px-4 rounded hover:bg-lime-600 focus:outline-none transition-colors duration-300"
              onClick={() => setSelectedCourse(null)} // Close the modal
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
