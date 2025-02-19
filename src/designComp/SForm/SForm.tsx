import React from "react";
import SInput from "@/designComp/SInput/SInput";
import SButton from "@/designComp/SButton/SButton";

interface SFormProps<T> {
  title: string;
  fields: { name: keyof T; placeholder: string; type?: string }[];
  onSubmit: (data: T) => Promise<void>;
  submitText?: string;
  loading?: boolean; // 🛑 Add loading prop
}

const SForm = <T extends Record<string, any>>({
  title,
  fields,
  onSubmit,
  submitText = "შექმნა",
  loading = false, // 🛑 Default to false
}: SFormProps<T>) => {
  const [formData, setFormData] = React.useState<T>(
    fields.reduce((acc, field) => {
      acc[field.name] = "" as any;
      return acc;
    }, {} as T)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return; // 🛑 Prevent form submission while loading
    await onSubmit(formData);
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
              type={field.type || "text"}
              value={formData[field.name] as string}
              onChange={handleChange}
            />
          ))}
        </div>

        <SButton
          text={loading ? "იტვირთება..." : submitText} // Show loading state
          onClick={handleSubmit}
          fullWidth
          color="yellow"
          className="mt-4"
        //   disabled={loading} // 🛑 Disable button while loading
        />
      </div>
    </div>
  );
};

export default SForm;
