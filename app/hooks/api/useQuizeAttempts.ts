// import { useState, useEffect } from "react";
// import axios, { AxiosError } from "axios";
// import { API_URL } from "../../context/AuthContext";
// import { QuizAttempt } from "../../types/QuizeAttempt";
// import { ErrorResponse } from "../../types/ErrorResponse";

// const useQuizeAttempts = (navigation: any, documentId: string) => {
//   const [data, setData] = useState<QuizAttempt[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {}, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null);

//       try {
//         const response = await axios.get(
//           `${API_URL}/quize-attempts?filters[quize][documentId][$eq]=${documentId}`,
//         );
//         console.log("response useQuizeAttempts", response)
//         console.log("response useQuizeAttempts datadata", response)
//         setData(response.data.data);
//       } catch (err) {
//         const axiosError = err as AxiosError<ErrorResponse>;
//         console.error("Error fetching quiz data:", axiosError);
//         setError(axiosError.response?.data?.msg || "An error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();

//     const unsubscribe = navigation.addListener("focus", fetchData);

//     return unsubscribe;
//   }, [navigation]);

//   return { data, loading, error };
// };

// export default useQuizeAttempts;
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { QuizAttempt } from "../../types/QuizeAttempt";
import { ErrorResponse } from "../../types/ErrorResponse";

const useQuizeAttempts = (navigation: any, documentId: string) => {
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
        console.log("response useQuizeAttempts", response);
        console.log("response useQuizeAttempts data", response.data);
        console.log("response useQuizeAttempts datadata", response.data.data);
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
