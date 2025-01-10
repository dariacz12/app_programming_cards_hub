import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { CardSetData } from "../../types/CardSetData";
import { ErrorResponse } from "../../types/ErrorResponse";

const useCardSetTestQustions = (documentId: string, cardTest: boolean) => {
  const [data, setData] = useState<CardSetData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_URL}/cards/${documentId}?populate[cards_items][populate][answerImage]=*&populate[cards_categories]=*&filters[cards_items][toTest][$eq]=${cardTest}`,
        );
        setData(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching current card set test data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCardSetTestQustions;
