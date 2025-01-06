import aboutusphoto from "../../assets/AboutUs.jpg";
import { Link } from "react-router-dom";

export default function AboutUsPage() {
  return (
    <div>
      <div
        className="w-[100%] h-[60vh] bg-no-repeat bg-cover relative"
        style={{
          backgroundImage: `url(${aboutusphoto})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black bg-opacity-30 gap-4">
          <h1 className="text-white font-semibold text-4xl">
            "Transforming everyday beauty into something extraordinary."
          </h1>
          <Link to="/services">
            <button className="bg-lime-700 text-white px-6 py-2 font-semibold rounded hover:bg-lime-600 transition-all duration-300 ">
              Explore Our Services
            </button>
          </Link>
        </div>
      </div>

      <div>
        <h1 className="text-center font-semibold font-serif text-3xl mt-4 mb-4 hover:underline">
          Who we are?
        </h1>
        <div className="p-4 text-center bg-lime-100 ml-10 mr-10 mb-4 font-serif border-2 border-lime-700">
          <p>
            Welcome to Beauty Galore Salon, your one-stop destination for
            exceptional hair, nail, and beauty services!
            <p>
              We are dedicated to creating a welcoming and comfortable
              environment for every client.Our salon boasts a modern, clean, and
              relaxing ambiance, ensuring that each visit is a delightful and
              rejuvenating experience.
            </p>{" "}
            <p>
              At Beauty Galore, our team of professional stylists, beauty
              experts, and nail technicians are passionate about helping you
              look and feel your best. Using high-quality products and tools, we
              provide personali- zed services tailored to your unique needs,
              whether you're looking for a fresh haircut, a flawless manicure &
              pedicure, or a soothing facial treatment.
            </p>{" "}
            <p>
              Thank you for choosing Beauty Galore Salon for your beauty and
              self-care needs. We can't wait to pamper you!
            </p>
          </p>
        </div>
      </div>

      <div>
        <div
          className="w-[100%] h-[60vh] bg-no-repeat bg-cover relative"
          style={{
            backgroundImage: `url(${aboutusphoto})`,
            backgroundAttachment: "fixed",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30 gap-6 mr-5 ml-5">
            <div className="bg-white text-black p-15 border-2 border-lime-700 ">
              <h1 className="font-medium text-center mt-0 mb-5 hover:underline">
                Highly Qualified Faculty
              </h1>
              <p className="font-light ml-2 mr-2">
                The instructors at Beauty Galore Salon are highly qualified with
                extensive experience in the beauty industry. The faculty’s
                personalised teaching approach contributes to the overall
                professional and personal growth of the students.
              </p>
            </div>
            <div className="bg-white text-black p-15 border-2 border-lime-700">
              <h1 className="font-medium text-center mt-0 mb-5 hover:underline">
                State-of-the-Art Infrastructure
              </h1>
              <p className="font-light ml-2 mr-2">
                Beauty Galore Salon prides itself on offering modern,
                well-equipped facilities designed for an exceptional experience.
                From advanced beauty tools to comfortable workstations, our
                salon provides the perfect environment for clients and students
                to thrive.
              </p>
            </div>
            <div className="bg-white text-black p-15 border-2 border-lime-700">
              <h1 className="font-medium text-center mt-0 mb-5 hover:underline">
                Placement Oppurtunities
              </h1>
              <p className="font-light ml-2 mr-2">
                Beauty Galore Salon Hair, Beauty & Makeup offers 100% complete
                guaranteed placement to all students in renowned salons all
                around the country. We are proud to provide a glorious career
                field to all deserving candidates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
