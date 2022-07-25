import {
  faBed,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false); // used to open the calender where user chose dates
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false); // used to open/close the window which user can enter the number of person and room
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  return (
    <div>
      <div>
        <main>
          <div className="relative pt-16 pb-8 flex flex-col items-center justify-center">
            <div
              className="absolute top-0 w-full h-full max-h-80 bg-center bg-cover bg-bottom flex flex-col"
              style={{
                backgroundImage: "url('https://picsum.photos/id/124/2000/900')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-40 bg-black"
              ></span>
            </div>

            <div className="flex flex-col items-center mx-6 md:items-start z-10 h-[255px]">
              <div className="flex flex-col wrap text-white mt-8 sm:mt-12">
                <h1 className="text-2xl sm:text-4xl">
                  A lifetime of discounts? It's Genius.
                </h1>
                <p className="my-5 wrap text-sm sm:text-base">
                  Get rewarded for your travels – unlock instant savings of 10%
                  or more with a free BestBooking account
                </p>
              </div>

              {!user && (
                <button
                  onClick={() => {
                    navigate("/login");
                  }}
                  className="bg-white text-gray-800 active:bg-gray-100 text-xs font-bold uppercase px-4 py-2 w-max rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-in-out duration-150 hover:scale-105"
                >
                  Sign in / Register
                </button>
              )}
            </div>

            <div className="flex justify-center flex-grow z-10 mb-0 text-[10px] pb-0 md:text-sm md:absolute md:w-max md:top-[270px]">
              {type !== "list" && (
                <div className="bg-white border-8 border-[#febb02] flex flex-col items-start justify-around rounded-[5px] mt-5 md:flex-row md:items-center md:space-y-0 md:space-x-2 ">
                  <div className="flex items-center gap-2.5 w-full pl-1 py-2 border-b-2 md:pr-2 md:py-0">
                    <FontAwesomeIcon icon={faBed} className="text-gray-500" />
                    <input
                      type="text"
                      placeholder="Where are you going?"
                      className="border-none outline-none text-gray-500"
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2.5 w-full pl-1 py-2 border-b-2 z-20 md:pr-0 md:py-0">
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className="text-gray-500"
                    />
                    <span
                      onClick={() => setOpenDate(!openDate)}
                      className="text-gray-500 cursor-pointer whitespace-nowrap"
                    >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                      dates[0].endDate,
                      "MM/dd/yyyy"
                    )}`}</span>
                    {openDate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(item) => setDates([item.selection])}
                        moveRangeOnFirstSelection={false}
                        ranges={dates}
                        className="z-20 absolute top-[420px] md:top-20"
                        minDate={new Date()}
                      />
                    )}
                  </div>
                  <div className="flex items-center gap-2.5 w-full pl-1 py-2 border-b-2 md:pr-0 md:py-0">
                    <FontAwesomeIcon
                      icon={faPerson}
                      className="text-gray-500"
                    />
                    <span
                      onClick={() => setOpenOptions(!openOptions)}
                      className="text-gray-500 cursor-pointer whitespace-nowrap"
                    >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                    {openOptions && (
                      <div className="z-20 absolute top-[465px] bg-white text-gray-500 rounded-[5px] md:top-20">
                        <div className="w-[200px] flex justify-between m-10 ">
                          <span>Adult</span>
                          <div className="flex items-center gap-2.5 font-xs text-black">
                            <button
                              disabled={options.adult <= 1}
                              className="w-[30px] h-[30px] border-solid border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed "
                              onClick={() => handleOption("adult", "d")}
                            >
                              -
                            </button>
                            <span>{options.adult}</span>
                            <button
                              className="w-[30px] h-[30px] border-solid border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
                              onClick={() => handleOption("adult", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-[200px] flex justify-between m-10">
                          <span>Children</span>
                          <div className="flex items-center gap-2.5 font-xs text-black">
                            <button
                              disabled={options.children <= 0}
                              className="w-[30px] h-[30px] border-solid border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
                              onClick={() => handleOption("children", "d")}
                            >
                              -
                            </button>
                            <span>{options.children}</span>
                            <button
                              className="w-[30px] h-[30px] border-solid border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
                              onClick={() => handleOption("children", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="w-[200px] flex justify-between m-10">
                          <span>Room</span>
                          <div className="flex items-center gap-2.5 font-xs text-black">
                            <button
                              disabled={options.room <= 1}
                              className="w-[30px] h-[30px] border-solid border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
                              onClick={() => handleOption("room", "d")}
                            >
                              -
                            </button>
                            <span>{options.room}</span>
                            <button
                              className="w-[30px] h-[30px] border-solid border border-[#0071c2] text-[#0071c2] cursor-pointer bg-white disabled:cursor-not-allowed"
                              onClick={() => handleOption("room", "i")}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-grow items-center gap-2.5">
                    <button
                      className="bg-[#0071c2] text-white font-medium border-none py-2.5 w-[85vw] m-1 cursor-pointer rounded-xl md:p-2.5 md:w-full"
                      onClick={handleSearch}
                    >
                      Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Header;
