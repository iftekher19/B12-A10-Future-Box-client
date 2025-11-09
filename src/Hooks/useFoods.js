import { useEffect, useState } from "react";
import axios from "../axios.config"; // importing custom axios instance

const useFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // cleanup flag

    const fetchFoods = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/foods");
        if (isMounted) {
          console.log("Fetched foods:", res.data);
          setFoods(res.data);
        }
      } catch (err) {
        console.error("Error fetching foods:", err);
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchFoods();
    return () => {
      isMounted = false; // cleanup to prevent memory leak
    };
  }, []);

  return { foods, loading, error };
};

export default useFoods;
