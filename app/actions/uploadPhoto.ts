import axios from "axios";
import { API_URL } from "../context/AuthContext";

export const uploadPhoto = async (imageUri: string, userName?: string) => {
  try {
    const formData = new FormData();
    formData.append("files", {
      uri: imageUri,
      name: `${userName}.png`,
      type: "image/png",
    } as any);
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error uploading image:",
      error.response?.data || error.message,
    );
    throw error;
  }
};
