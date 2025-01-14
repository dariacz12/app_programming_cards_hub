import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { QuizAttempt } from "../../types/QuizeAttempt";
import { ErrorResponse } from "../../types/ErrorResponse";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { QuestionItem } from "../../types/QuizeItem";

type RootStackParamList = {
  QuizeResultPage: {
    documentId: string;
    userId: number;
    questionsList: QuestionItem[];
  };
};
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "QuizeResultPage"
>;
const useQuizeAttempts = (navigation: NavigationProp, documentId: string) => {
  const [data, setData] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {}, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `${API_URL}/quize-attempts?filters[quize][documentId][$eq]=${documentId}`,
        );
        setData(response.data.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching quiz data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const unsubscribe = navigation.addListener("focus", fetchData);

    return unsubscribe;
  }, [navigation]);

  return { data, loading, error };
};

export default useQuizeAttempts;
