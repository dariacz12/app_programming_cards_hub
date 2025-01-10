import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { Card } from "../../types/Card";
import { ErrorResponse } from "../../types/ErrorResponse";

const useCardList = () => {
  const [data, setData] = useState<Card[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/cards?populate[logo]=*`);
        setData(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching card data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCardList;
