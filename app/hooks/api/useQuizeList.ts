import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { Quiz } from "../../types/Quize";
import { ErrorResponse } from "../../types/ErrorResponse";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  QuizeStartPage: {
    documentId: string;
  };
};
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QuizeStartPage"
>;
const useQuizeList = (navigation: NavigationProp, documentId?: string) => {
  const [data, setData] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `${API_URL}/quizes?populate[quize_attempts]=*&populate[logo]=*`,
          );
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
    });
    return unsubscribe;
  }, [navigation, documentId]);

  return { data, loading, error };
};

export default useQuizeList;
