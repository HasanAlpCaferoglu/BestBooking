import { FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();

  const handleClick = async () => {
    if (process.env.NODE_ENV === "production") {
      navigate("/admin/login");
    } else {
      navigate("/admin");
    }
  };

  return (
    <footer className="bg-teal-600 w-screen pt-4">
      <div className="mx-auto px-4 ">
        <div className="flex flex-wrap ">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold">
              Follow the best opportunities!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-700">
              Follow us on these platforms.
            </h5>
            <div className="mt-6 mb-6">
              <button
                className="bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                type="button"
              >
                <a
                  href="https://twitter.com/caferoglu_alp"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaTwitter />
                </a>
              </button>
              <button
                className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                type="button"
              >
                <a
                  href="https://www.instagram.com/alp.caferoglu/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </button>
              <button
                className="bg-white text-blue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 p-3"
                type="button"
              >
                <a href="" target="_blank" rel="noreferrer">
                  <FaFacebook />
                </a>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-orange-700 text-sm font-semibold mb-2 underline">
                  Useful Links
                </span>
                <ul>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Unique places to stay
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Seasonal and holiday deals
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Reviews
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Travel communities
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Travel articles
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-orange-700  text-sm font-semibold mb-2 underline">
                  Other Resources
                </span>
                <ul>
                  <li
                    onClick={handleClick}
                    className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm cursor-pointer"
                  >
                    Admin Panel
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Curtomer Service
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Partner Help
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Careers
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Sustainability
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Press center
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Safety Resource Center
                  </li>
                  <li className="text-gray-700 hover:text-gray-900 font-semibold block pb-2 text-sm">
                    Terms & conditions
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-4 border-gray-400 " />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center ">
            <div className="text-sm text-gray-600 font-semibold pb-3">
              Copyright © {new Date().getFullYear()} BestBooking.com by{" "}
              <a
                href="https://www.creative-tim.com"
                className="text-gray-600 hover:text-gray-900"
              >
                Hasan Alp Caferoglu
              </a>
              .
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
