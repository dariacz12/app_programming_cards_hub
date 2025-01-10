import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { QuizeSetData } from "../../types/QuizeSetData";
import { ErrorResponse } from "../../types/ErrorResponse";

const useQuizeSetData = (documentId: string) => {
  const [data, setData] = useState<QuizeSetData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_URL}/quizes/${documentId}?populate[sliderPhotos]=*&populate[quiz_questions_elements][populate][quiz_answer_options]=*`,
        );
        setData(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching current quize set data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useQuizeSetData;
