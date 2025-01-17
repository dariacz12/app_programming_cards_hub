import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../context/AuthContext";

const useUpdateUserPhoto = (newPhotoUrl?: string) => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const updateUserPhoto = async (newPhotoUrl?: string) => {
      try {
        if (!newPhotoUrl) {
          console.warn("Missing photo URL or user ID");
          return;
        }
        const response = await axios.put(
          `${API_URL}/users/me`,
          { avatar: newPhotoUrl },
          {
            headers: {
              Authorization: `Bearer ${newPhotoUrl}`,
            },
          },
        );

        console.log("User photo updated successfully:", response.data);
        return response;
      } catch (error: any) {
        console.error(
          "Error updating image:",
          error.response?.data || error.message,
        );
        throw error;
      }
    };

    if (newPhotoUrl) {
      updateUserPhoto(newPhotoUrl);
    }
  }, [newPhotoUrl]);

  return { data, loading, error };
};

export default useUpdateUserPhoto;
