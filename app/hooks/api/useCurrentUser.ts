import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { API_URL } from "../../context/AuthContext";
import { Card } from "../../types/Card";
import { User } from "../../types/User";
interface ErrorResponse {
  msg: string;
}
const useCurrentUser = () => {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/users/me`);
        setData(response.data);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorResponse>;
        console.error("Error fetching current user data:", axiosError);
        setError(axiosError.response?.data?.msg || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useCurrentUser;
