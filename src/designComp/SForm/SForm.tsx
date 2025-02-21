import React, { useEffect, useState } from "react";
import SInput from "@/designComp/SInput/SInput";
import SButton from "@/designComp/SButton/SButton";

interface SFormProps<T> {
  title: string;
  fields: {
    name: keyof T;
    placeholder: string;
    type?: string;
    defaultValue?: string | number;
  }[];
  onSubmit: (data: T) => Promise<void>;
  onCancel?: () => void;
  submitText?: string;
  loading?: boolean;
}

const SForm = <T extends Record<string, any>>({
  title,
  fields,
  onSubmit,
  onCancel,
  submitText = "შენახვა",
  loading = false,
}: SFormProps<T>) => {
  const [formData, setFormData] = useState<T>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "" as any;
      return acc;
    }, {} as T)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    let newValue: any = value;

    if (name === "price") {
      newValue = value.replace(/[^0-9.]/g, ""); 
      if (newValue.split(".").length > 2) return;
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async () => {
    if (loading) return;

    const finalData = { ...formData, price: parseFloat(formData.price) || 0 };
    await onSubmit(finalData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-beige">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-center text-xl font-semibold mb-4">{title}</h2>

        <div className="space-y-4">
          {fields.map((field) => (
            <SInput
              key={String(field.name)}
              name={String(field.name)}
              placeholder={field.placeholder}
              type={field.name === "price" ? "text" : field.type || "text"}
              value={formData[field.name] as string}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <SButton text={loading ? "იტვირთება..." : submitText} onClick={handleSubmit} fullWidth color="yellow" />
          {onCancel && <SButton text="გაუქმება" onClick={onCancel} fullWidth color="red" />} 
        </div>
      </div>
    </div>
  );
};

export default SForm;
