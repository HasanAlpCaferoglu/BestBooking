import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (urlEntry) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  let url = "";
  

  if (process.env.NODE_ENV === "production") {
    url = "api" + {urlEntry};
  } else {
    url = urlEntry;
  }

 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await axios.get(url);
        setData(res.data);
      } catch (err) {
        setError(err);
      }

      setLoading(false);
    };

    fetchData();

  }, [url]);

  const reFetch = async () => {
    setLoading(true);

    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (err) {
      setError(err);
    }

    setLoading(false);
  };

  return {data, loading, error, reFetch}
};

export default useFetch;