import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import { Reserve } from "../../components/reserve/Reserve";

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[4]; // get hotel id
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false); // slider modal open and close state
  const [openModal, setOpenModal] = useState(false); // slider modal open and close state

  console.log(`location pathname is ${location.pathname}`)

  const { data, loading, error } = useFetch(location.pathname);
  const { user } = useContext(AuthContext);
  const { dates, options } = useContext(SearchContext);
  const navigate = useNavigate();

  //dates between start date and end date
  const MILISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILISECONDS_PER_DAY);
    return diffDays;
  }
  const days = dayDifference(dates[0].endDate, dates[0].startDate);

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/api/login");
    }
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? (
        "Loading"
      ) : (
        <div className="flex flex-col items-center mt-5">
          {open && (
            <div className="hidden sticky top-10 left-0 w-screen  bg-black bg-opacity-70 z-50 flex items-center justify-center md:block">
              <FontAwesomeIcon
                icon={faCircleXmark}
                className="absolute top-10 right-5 text-3xl text-gray-400 cursor-pointer"
                onClick={() => setOpen(false)}
              />
              <div className="flex items-center justify-between">
                <FontAwesomeIcon
                  icon={faCircleArrowLeft}
                  className="m-5 text-[50px] text-gray-500 cursor-pointer"
                  onClick={() => handleMove("l")}
                />
                <div className="flex justify-center items-center">
                  <img
                    src={data.photos[slideNumber]}
                    alt=""
                    className="h-[600px]"
                  />
                </div>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className="m-5 text-[50px] text-gray-400 cursor-pointer "
                  onClick={() => handleMove("r")}
                />
              </div>
            </div>
          )}
          <div className="mx-8 flex flex-col gap-2.5 relative ">
            <div id="info-and-reserve" className="flex">
              <button
                onClick={handleClick}
                className="absolute right-0 border-none bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] text-base px-2.5 py-2 md:py-5 flex"
              >
                <span className="hidden sm:block ">Reserve or</span> &nbsp; <span>Book Now</span> 
              </button>
              <div id="item-info" className="flex flex-col">
                <h1 className="text-2xl">{data.name}</h1>
                <div className="text-xs flex items-center gap-2.5 ">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>{data.address}</span>
                </div>
                <span className="text-[#0071c2] font-medium ">
                  Excellent location – {data.distance}m from center
                </span>
                <span className="text-[#008009] font-medium ">
                  Book a stay over ${data.cheapestPrice} at this property and
                  get a free airport taxi
                </span>
              </div>
            </div>

            <div className="flex overflow-x-auto scrollbar-hide gap-3">
              {data.photos?.map((photo, i) => (
                <div
                  className="flex-none w-fit flex justify-center"
                  key={i}
                >
                  <img
                    onClick={() => handleOpen(i)}
                    src={photo}
                    alt=""
                    className="h-[250px] object-cover rounded-lg cursor-pointer overflow-hidden md:h-[350px]"
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-between gap-5 my-5 md:flex-row ">
              <div className="flex-[3_3_0%]  ">
                <h1 className=" text-2xl">{data.title}</h1>
                <p className=" text-sm mt-5 ">{data.desc}</p>
              </div>
              <div className=" flex-[1.2_1.2_0%] bg-[#ebf3ff] p-5 flex flex-col gap-5  ">
                <h1 className=" text-lg text-[#555] ">
                  Perfect for a {days}-night stay!
                </h1>
                <span className=" text-sm">
                  Located in the real heart of city, this property has an
                  excellent location
                </span>
                <h2 className=" font-light">
                  <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "}
                  nights)
                </h2>
                <button
                  className="border-none px-5 py-2.5 bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] "
                  onClick={handleClick}
                >
                  Reserve or Book Now!
                </button>
              </div>
            </div>
          </div>
          <MailList />
          <Footer />
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  );
};

export default Hotel;


