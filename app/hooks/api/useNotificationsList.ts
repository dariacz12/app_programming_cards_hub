import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { ErrorResponse } from "../../types/ErrorResponse";
import { Notification } from "../../types/Notification";

const useNotificationsList = (navigation: any) => {
  const [data, setData] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(`${API_URL}/notifications`);
          setData(response.data.data);
        } catch (err) {
          const axiosError = err as AxiosError<ErrorResponse>;
          console.error("Error fetching notifications data:", axiosError);
          setError(axiosError.response?.data?.msg || "An error occurred.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubscribe;
  }, [navigation]);

  return { data, loading, error };
};

export default useNotificationsList;
