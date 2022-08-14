import { Link } from "react-router-dom";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem border border-solid border-gray-300 p-2.5 rounded-[5px] gap-5 mb-5 flex flex-col sm:flex-row justify-between h-max">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg  h-[200px] rounded-md object-cover sm:w-[200px]"
      />

      <div id="item-infos" className="flex w-full justify-between ">
        <div className="siDesc flex flex-col gap-2.5 flex-2 w-1/2">
          <h1 className="siTitle text-[20px] text-[#0071c2] ">{item.name}</h1>
          <span className="siDistance text-xs ">
            {item.distance}m from center
          </span>
          <span className="siTaxiOp text-xs bg-[#008009] color-white w-max p-[3px] rounded-[5px] ">
            Free airport taxi
          </span>
          <span className="siSubtitle text-xs font-bold hidden md:block">
            Studio Apartment with Air conditioning
          </span>
          <span className="siFeatures text-xs ">{item.desc.length > 40 ? item.desc.slice(0, 100) + "..." : item.desc} </span>
          <span className="siCancelOp text-xs text-[#008009] font-bold ">
            Free cancellation
          </span>
          <span className="siCancelOpSubtitle text-xs text-[#008009] hidden md:block">
            You can cancel later, so lock in this great price today!
          </span>
        </div>

        <div className="siDetails flex-1 flex flex-col justify-between w-1/2">
          {item.rating && (
            <div className="siRating flex justify-between">
              <span className=" font-medium ">Excellent</span>
              <button className=" bg-[#003580] text-white p-[5px] font-bold border-none ">
                {item.rating}
              </button>
            </div>
          )}
          <div className="siDetailTexts text-right flex flex-col gap-[5px] ">
            <span className="siPrice text-2xl ">${item.cheapestPrice}</span>
            <span className="siTaxOp text-xs text-gray ">
              Includes taxes and fees
            </span>
            
            <Link to={`/api/hotels/find/${item._id}`}>
              <button className="siCheckButton bg-[#0071c2] text-white font-bold px-[5px] py-2.5 border-none cursor-pointer rounded-[5px] ">
                See availability
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
