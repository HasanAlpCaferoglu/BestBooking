import useFetch from "../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=berlin,madrid,london"
  ); 

  return (
    <div className=" w-full flex justify-between gap-5 z-1 flex-wrap">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className=" text-white h-[250px] flex-auto">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
              alt=""
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div className=" relative bottom-16 left-5 font-bold">
              <h1 className=" text-3xl ">Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
          <div className=" text-white  overflow-hidden h-[250px] flex-auto">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
              alt=""
              className="w-full h-full object-cover rounded-[10px]"
            />
            <div className="relative bottom-16 left-5 font-bold">
              <h1 className=" text-3xl ">Madrid</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className=" text-white overflow-hidden h-[250px] flex-auto">
            <img
              src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
              alt=""
              className=" w-full h-full object-cover rounded-[10px]"
            />
            <div className="relative bottom-16 left-5  font-bold ">
              <h1 className="text-3xl ">London</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>{" "}
        </>
      )}
    </div>
  );
};

export default Featured;

