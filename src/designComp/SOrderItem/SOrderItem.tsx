import React, { useState } from "react";

interface SOrderItemProps {
  product: {
    name: string;
    category: string;
    price: number;
    quantity: number;
  };
  onClick?: () => void;
  onQuantityChange?: (value: string) => void;
  editable?: boolean;
}

const SOrderItem: React.FC<SOrderItemProps> = ({ product, onClick, onQuantityChange, editable = false }) => {
  const [tempQuantity, setTempQuantity] = useState(product.quantity.toString());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempQuantity(e.target.value);
  };

  const handleBlur = () => {
    if (onQuantityChange) {
      onQuantityChange(tempQuantity);
    }
  };

  return (
    <div
      className={`grid grid-cols-4 gap-2 md:gap-4 text-center border border-yellow-400 p-2 rounded-md mt-2 ${
        onClick && !editable ? "cursor-pointer hover:bg-yellow-100 transition" : ""
      }`}
      onClick={!editable ? onClick : undefined} // Only allow clicks when not editing
    >
      <span>{product.name}</span>
      <span className="text-gray-500">{product.category || "-"}</span>
      <span>{product.price}₾</span>
      {editable ? (
        <input
          type="text"
          value={tempQuantity}
          onChange={handleInputChange}
          onBlur={handleBlur} // Only update when user finishes typing
          className="border border-yellow-400 p-1 w-full text-center"
        />
      ) : (
        <span>{product.quantity}</span>
      )}
    </div>
  );
};

export default SOrderItem;
