import CourseCard from "../../components/CourseCard";
import coursebg from "../../assets/Course.jpg";

export default function CoursePage() {
  const courses = [
    {
      image:
        "https://www.salongold.co.uk/wp-content/uploads/2016/08/hairdresser-insurance.jpg",
      title: "Diploma in Hairdressing Courses",
    },
    {
      image:
        "https://images.pexels.com/photos/4586708/pexels-photo-4586708.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Masters in Cosmetology",
    },
    {
      image:
        "https://images.pexels.com/photos/2799609/pexels-photo-2799609.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Basic Hair Cutting Techniques",
    },
    {
      image:
        "https://images.pexels.com/photos/247287/pexels-photo-247287.jpeg?auto=compress&cs=tinysrgb&w=600",
      title: "Makeup Artistry Courses",
    },
  ];
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
          <h1 className="text-white font-semibold text-4xl">
            “Invest in your passion and let your skills sparkle like a diamond.”
          </h1>
        </div>
      </div>
      <div>
        <h1 className="font-semibold text-3xl text-center mt-3">Our Courses</h1>
      </div>
      <div className=" text-black py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 sm:px-6 lg:px-12">
          {/* Course Cards */}
          <CourseCard image={courses[0].image} title={courses[0].title} />
          <CourseCard image={courses[1].image} title={courses[1].title} />
          <CourseCard image={courses[2].image} title={courses[2].title} />
          <CourseCard image={courses[3].image} title={courses[3].title} />
        </div>
      </div>
    </div>
  );
}
