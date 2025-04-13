import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#1A1A1A] text-white pt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-evenly gap-10 pb-10">
        <div className="max-w-xs">
          <div className="relative inline-block mb-4">
            <div className="border border-gray-600 px-4 py-2">
              <span className="uppercase text-sm font-semibold">
                Opening Hours
              </span>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 top-full mt-[2px] w-3 h-3 bg-[#1A1A1A] rotate-45 border-r border-b border-gray-600"></div>
          </div>

          <p className="text-sm leading-relaxed mb-4 ">
            Our salon is open from 10 AM to 7 PM all days.
            <br />
            Please visit us during our business hours for all your beauty needs.
          </p>
          <p className="mb-1 border-t border-gray-300 ">
            <span className="font-semibold">Opens everyday:</span> &nbsp; 10:00
            AM - 7:00 PM
          </p>
          <p>
            <span className="font-semibold">Contact us:</span> &nbsp;
            9867734327, 061-552196
          </p>
        </div>

        {/* Important Links */}
        <div>
          <div className="border border-gray-600 px-4 py-2 inline-block relative mb-4">
            <span className="uppercase text-sm font-semibold">
              Important Links
            </span>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-3 h-3 bg-[#1A1A1A] rotate-45 border-l border-t border-gray-600"></div>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/aboutus" className="hover:underline">
                About Us
              </a>
            </li>

            <li>
              <a href="/book" className="hover:underline">
                Book Now
              </a>
            </li>
            <li>
              <a href="/products" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              <a href="/courses" className="hover:underline">
                Courses
              </a>
            </li>

            <li>
              <a href="/services" className="hover:underline">
                Services
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="border border-gray-600 px-4 py-2 inline-block relative mb-4">
            <span className="uppercase text-sm font-semibold">
              Find Us Online
            </span>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-2 w-3 h-3 bg-[#1A1A1A] rotate-45 border-l border-t border-gray-600"></div>
          </div>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded hover:scale-110 transition"
            >
              <FaFacebookF size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded hover:scale-110 transition"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black p-2 rounded hover:scale-110 transition"
            >
              <FaPinterestP size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 px-4 py-4 bg-[#141414]">
        <div className="max-w-7xl mx-auto flex justify-center items-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">
              Beauty Galore Salon
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
