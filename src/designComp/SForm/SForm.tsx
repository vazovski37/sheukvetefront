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
  onCancel?: () => void; // ✅ Cancel button support
  submitText?: string;
  loading?: boolean;
}

const SForm = <T extends Record<string, any>>({
  title,
  fields,
  onSubmit,
  onCancel, // ✅ Added cancel button functionality
  submitText = "შენახვა",
  loading = false,
}: SFormProps<T>) => {
  const [formData, setFormData] = useState<T>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? "" as any;
      return acc;
    }, {} as T)
  );

  // ✅ Handle Input Change (with validation for price)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    let newValue: any = value;

    // ✅ If the field is "price", enforce number validation
    if (name === "price") {
      newValue = value.replace(/[^0-9.]/g, ""); // Allow only numbers and dots
      if (newValue.split(".").length > 2) return; // Prevent multiple dots
    }

    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    // Convert price to a valid number before submission
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
              type={field.name === "price" ? "text" : field.type || "text"} // ✅ Ensure price is text for validation
              value={formData[field.name] as string}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <SButton text={loading ? "იტვირთება..." : submitText} onClick={handleSubmit} fullWidth color="yellow" />
          {onCancel && <SButton text="გაუქმება" onClick={onCancel} fullWidth color="red" />} {/* ✅ Cancel Button */}
        </div>
      </div>
    </div>
  );
};

export default SForm;
