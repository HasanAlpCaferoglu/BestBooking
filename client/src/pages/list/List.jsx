import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Navbar from "../../components/navbar/Navbar";

const List = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);

  const { data, loading, error, reFetch } = useFetch(
    `?city=${destination}&min=${min || 0}&max=${max || 9999}`
  );

  const handleClick = () => {
    reFetch(); // refetch with same url that we used for useFetch above
  };

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="flex justify-center mt-2">
        <div className="w-full flex flex-col gap-5 mx-3 lg:mx-8 lg:flex-row">
          <div className="flex-1 bg-[#febb02] p-2.5 rounded-[10px] top-2.5 h-max lg:sticky ">
            <h1 className="text-xl text-[#555] mb-2.5 ">Search</h1>
            <div className="flex flex-col gap-[5px] mb-2.5 ">
              <label className="text-xs ">Destination</label>
              <input
                className="h=[30px] border-none p-[5px] "
                placeholder={destination}
                type="text"
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[5px] mb-2.5 ">
              <label className="text-xs">Check-in Date</label>
              <span
                className="h-[30px] p-[5px] bg-white flex items-center cursor-pointer "
                onClick={() => setOpenDate(!openDate)}
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDates([item.selection])}
                  minDate={new Date()}
                  ranges={dates}
                />
              )}
            </div>
            <div className=" flex flex-col gap-[5px] mb-2.5 ">
              <label className="text-xs">Options</label>
              <div className="p-2.5">
                <div className="flex justify-between mb-2.5 text-[#555] text-xs ">
                  <span>
                    Min price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMin(e.target.value)}
                    className=" w-[50px]"
                  />
                </div>
                <div className="flex justify-between mb-2.5 text-[#555] text-xs ">
                  <span >
                    Max price <small>per night</small>
                  </span>
                  <input
                    type="number"
                    onChange={(e) => setMax(e.target.value)}
                    className="w-[50px]"
                  />
                </div>
                <div className="flex justify-between mb-2.5 text-[#555] text-xs ">
                  <span>Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    placeholder={options.adult}
                  />
                </div>
                <div className="flex justify-between mb-2.5 text-[#555] text-xs ">
                  <span>Children</span>
                  <input
                    type="number"
                    min={0}
                    className="w-[50px]"
                    placeholder={options.children}
                  />
                </div>
                <div className="flex justify-between mb-2.5 text-[#555] text-xs ">
                  <span>Room</span>
                  <input
                    type="number"
                    min={1}
                    className="w-[50px]"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button
              className="p-2.5 bg-[#0071c2] text-white border-none w-full font-medium cursor-pointer "
              onClick={handleClick}
            >
              Search
            </button>
          </div>

          <div className="flex-[3_3_0%] flex flex-col items-center justify-center">
            {loading ? (
              <div className="flex flex-col items-center justify-center flex-1">
                <img
                  src="https://c.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
                  alt=""
                />
                <p className="text-2xl w-full text-center border-4">
                  Loading...
                </p>
              </div>
            ) : (
              <div className="w-full">
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
