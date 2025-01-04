import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { Card } from "../../types/Card";
import { CardSetData } from "../../types/CardSetData";
interface ErrorResponse {
  msg: string;
}
const useCardSetData = (documentId: string) => {
  const [data, setData] = useState<CardSetData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_URL}/cards/${documentId}?populate[logo]=*`,
        );
        setData(response.data.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching card set data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId]);

  return { data, loading, error };
};

export default useCardSetData;
