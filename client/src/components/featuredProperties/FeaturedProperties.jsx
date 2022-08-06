import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=6"); // you can limit the number of item by adding "&limit=4"
  const navigate = useNavigate();
  const { city, dates, options, dispatch } = useContext(SearchContext);

  const handleClick = (hotelItemId, hotelItemCity) => {
    navigate(`/hotels/${hotelItemId}`, {
      state: { hotelItemCity, dates, options },
    });

  };

  
  return (
    <div className="flex justify-between gap-8 overflow-x-auto scrollbar-hide ">
      {loading ? (
        "Loading"
      ) : (
        <>
          {data.length !==0 ? data.map((item) => (
            <div
              onClick={() => handleClick(item._id, item.city)}
              className="flex-none gap-2.5 flex flex-col cursor-pointer"
              key={item._id}
            >
              <img
                src={item.photos[0]}
                alt=""
                className="h-[250px] object-cover rounded-xl overflow-hidden aspect-[4/3] 2xl:aspect-[5/3]"
              />
              <span className=" text-[#333] font-bold ">{item.name}</span>
              <span className=" font-light capitalize">{item.city}</span>
              <span className=" font-medium">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div>
                  <button className="bg-[#003580] text-white border-none p-[3px] mr-2.5 font-bold ">
                    {item.rating}
                  </button>
                  <span className="text-sm ">Excellent</span>
                </div>
              )}
            </div>
          )) : null}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
 