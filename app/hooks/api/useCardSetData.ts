import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { CardSetData } from "../../types/CardSetData";
import { ErrorResponse } from "../../types/ErrorResponse";
const useCardSetData = (
  documentId: string,
  cardTest?: boolean,
  cardCategoryId?: string,
) => {
  const [data, setData] = useState<CardSetData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        let response;
        if (cardTest) {
          response = await axios.get(
            `${API_URL}/cards/${documentId}?populate[cards_items][populate][answerImage]=*&populate[cards_categories]=*&filters[cards_items][toTest][$eq]=${cardTest}`,
          );
        } else if (cardCategoryId) {
          response = await axios.get(
            `${API_URL}/cards/${documentId}?populate[cards_items][populate][answerImage]=*&populate[cards_categories]=*&filters[cards_categories][documentId][$eq]=${cardCategoryId}`,
          );
        } else {
          response = await axios.get(
            `${API_URL}/cards/${documentId}?populate[logo]=*&populate[sliderPhotos]=*&populate[cards_items][populate][answerImage]=*&populate[cards_categories][populate][iconCategory]=*`,
          );
        }
        setData(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching card set data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [documentId, cardCategoryId, cardTest]);

  return { data, loading, error };
};

export default useCardSetData;
