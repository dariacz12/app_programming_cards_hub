import axios from "axios";
import { API_URL } from "../context/AuthContext";

export const changePassword = async (
  currentPassword: string,
  password: string,
  passwordConfirmation: string,
) => {
  return await axios.post(`${API_URL}/auth/change-password`, {
    currentPassword,
    password,
    passwordConfirmation,
  });
};
