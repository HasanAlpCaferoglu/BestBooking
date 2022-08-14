import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, SetSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/api/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const date = new Date(start.getTime());

    let list = [];

    while (date <= end) {
      list.push(new Date(date).getTime());
      //with getTime, it will give timestamps and
      //it is much easier to compare dates or handle dates because all dates are not the same
      date.setDate(date.getDate() + 1);
    }

    return list; // all dates seperately exist in the array
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound; // if the date is found in unavailable dates then the room is unavailable
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value; // remember value will be the rooms id
    SetSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    // need to update unavailable dates when a room is reserved
    // first need to get selected dates at the home page --> useContext
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data; // no need
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };


  return (
    <div className="w-screen h-screen fixed top-0 left-0 z-50">
      <div className="reserve w-screen h-screen bg-black opacity-70 fixed top-0 left-0 flex items-center justify-center"></div>
      <div className=" bg-white opacity-100 p-2 w-1/2 left-1/4 top-[60px] lg:w-1/3 lg:left-1/3 relative rounded-lg">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="absolute top-0 right-0 cursor-pointer"
          onClick={() => {
            setOpen(false);
          }}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div
            className="flex items-center justify-between mt-5 p-[5px] border-b-2 border-gray-200"
            key={item._id}
          >
            <div className="flex flex-col gap-[5px] w-3/4">
              <div className="font-medium text-sm capitalize">
                {item.title}{" "}
              </div>
              <div className="font-light text-sm ">{item.desc} </div>
              <div className="text-xs">
                Max people: <b>{item.maxPeople}</b>{" "}
              </div>
              <div className="font-medium ">${item.price}</div>
            </div>
            <div className="flex flex-wrap justify-center gap-[5px] text-[8px] text-gray-500 w-1/4">
              {item.roomNumbers.map((roomNumber) => (
                <div className="flex flex-col " key={roomNumber._id}>
                  <label>{roomNumber.number} </label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="border-none py-2.5 px-5 bg-[#0071c2] text-white font-bold cursor-pointer rounded-[5px] w-full mt-5 "
        >
          Reserve Now
        </button>
      </div>
    </div>
  );
};
