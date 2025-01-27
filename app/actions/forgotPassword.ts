import axios from "axios";
import { API_URL } from "../context/AuthContext";

export const forgotPassword = async (email: string) => {
  return await axios.post(`${API_URL}/auth/forgot-password`, {
    email,
  });
};
