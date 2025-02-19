import { useState } from "react";
import { addWaiterService } from "@/services/waiterService";

export const useAddWaiter = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addWaiter = async (formData: { username: string; password: string; confirmPassword: string }) => {
    setLoading(true);
    setError(null);

    try {
      await addWaiterService(formData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return { addWaiter, loading, error };
};
