"use client";

import React, { useState } from "react";
import SButton from "@/designComp/SButton/SButton";

const OrderPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([
    { name: "ხინკალი - ხვეულები", category: "აფხაზური", price: 1.5, quantity: 11 },
    { name: "კოკა-კოლა", category: "ფანტასტიკან", price: 22, quantity: 5 },
    { name: "ჭაჭუშული", category: "", price: 22, quantity: 6 },
    { name: "ფანტა", category: "", price: 22.99, quantity: 7 },
  ]);

  const [orderedProducts, setOrderedProducts] = useState([
    { name: "ვალის შეკვეთა", category: "ბოთლი", price: 1.5, quantity: 5 },
  ]);

  const totalOrderPrice = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPaidPrice = orderedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf4e3] p-8">
      <div className="grid grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Left Side - Order List */}
        <div className="border-2 border-yellow-500 p-6 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-4">შეკვეთები</h2>
          <div className="grid grid-cols-4 gap-4 text-center font-medium">
            <span>პროდუქტი</span>
            <span>კატეგორია</span>
            <span>ფასი</span>
            <span>რაოდენობა</span>
          </div>
          {selectedProducts.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 text-center border border-yellow-400 p-2 rounded-md mt-2">
              <span>{item.name}</span>
              <span className="text-gray-500">{item.category || "-"}</span>
              <span>{item.price}₾</span>
              <span>{item.quantity}</span>
            </div>
          ))}

          {/* Total Price & Select All Button */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-lg font-semibold">დარეგისტრირებული თანხა</span>
            <span className="text-lg font-semibold">{totalOrderPrice.toFixed(2)}₾</span>
          </div>
          <SButton text="ყველას არჩევა" onClick={() => console.log("ყველას არჩევა")} fullWidth className="mt-4" />
        </div>

        {/* Right Side - Paid Orders */}
        <div className="border-2 border-yellow-500 p-6 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-4">პროდუქტები</h2>
          <div className="grid grid-cols-4 gap-4 text-center font-medium">
            <span>პროდუქტი</span>
            <span>კატეგორია</span>
            <span>ფასი</span>
            <span>რაოდენობა</span>
          </div>
          {orderedProducts.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 text-center border border-yellow-400 p-2 rounded-md mt-2">
              <span>{item.name}</span>
              <span className="text-gray-500">{item.category || "-"}</span>
              <span>{item.price}₾</span>
              <span>{item.quantity}</span>
            </div>
          ))}

          {/* Total Paid & Confirm Button */}
          <div className="flex justify-between items-center mt-6">
            <span className="text-lg font-semibold">თანხა</span>
            <span className="text-lg font-semibold">{totalPaidPrice.toFixed(2)}₾</span>
          </div>
          <SButton text="გადახდა" onClick={() => console.log("გადახდა")} fullWidth className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
