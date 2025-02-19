import { useState } from "react";

interface Field {
  name: string;
  placeholder: string;
  type?: string;
}

interface UseFormHandlerProps {
  fields: Field[];
  onSubmit: (data: Record<string, string>) => Promise<void>;
}

const useFormHandler = ({ fields, onSubmit }: UseFormHandlerProps) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    await onSubmit(formData);
    setFormData(initialState);
    setLoading(false);
  };

  return { formData, handleChange, handleSubmit, loading };
};

export default useFormHandler;
