"use client";

import React, { useState } from "react";
import SButton from "@/designComp/SButton/SButton";

const PayOrderPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([
    { name: "ხინკალი - ხვეულები", category: "აფხაზური", price: 1.5, quantity: 11 },
    { name: "კოკა-კოლა", category: "ფანტასტიკან", price: 22, quantity: 5 },
    { name: "ჭაჭუშული", category: "", price: 22, quantity: 6 },
    { name: "ფანტა", category: "", price: 22.99, quantity: 7 },
  ]);

  const [orderedProducts, setOrderedProducts] = useState<any[]>([]);

  // Move item from left to right
  const handleSelectProduct = (product: any) => {
    const existingOrdered = orderedProducts.find((item) => item.name === product.name);

    if (existingOrdered) {
      // If the product already exists in the ordered list, update its quantity
      const newQuantity = existingOrdered.quantity + 1;
      if (newQuantity > existingOrdered.originalQuantity) return; // Prevent exceeding original quantity

      setOrderedProducts((prevOrdered) =>
        prevOrdered.map((item) =>
          item.name === product.name ? { ...item, quantity: newQuantity } : item
        )
      );

      // Update the selectedProducts list
      setSelectedProducts((prevSelected) =>
        prevSelected.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    } else {
      // If the product is not in the ordered list, add it
      setOrderedProducts((prevOrdered) => [
        ...prevOrdered,
        { ...product, originalQuantity: product.quantity, quantity: 1 },
      ]);

      // Update the selectedProducts list
      setSelectedProducts((prevSelected) =>
        prevSelected.map((item) =>
          item.name === product.name ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Move item back from right to left
  const handleRemoveProduct = (product: any) => {
    setSelectedProducts((prevSelected) => {
      const existingLeftProduct = prevSelected.find((item) => item.name === product.name);

      if (existingLeftProduct) {
        return prevSelected.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevSelected, { ...product, quantity: product.quantity }];
      }
    });

    setOrderedProducts((prevOrdered) =>
      prevOrdered.filter((item) => item.name !== product.name)
    );
  };

  // Handle Quantity Change in Right Column
  const handleQuantityChange = (product: any, newQuantity: number) => {
    if (isNaN(newQuantity)) return; // Prevent NaN values

    const existingOrdered = orderedProducts.find((item) => item.name === product.name);
    if (!existingOrdered) return;

    const originalQuantity = existingOrdered.originalQuantity || product.quantity;

    if (newQuantity > originalQuantity || newQuantity < 0) return; // Prevent invalid values

    // Calculate the difference between the old and new quantity
    const quantityDifference = existingOrdered.quantity - newQuantity;

    // Update the orderedProducts list
    setOrderedProducts((prevOrdered) =>
      prevOrdered.map((item) =>
        item.name === product.name ? { ...item, quantity: newQuantity } : item
      )
    );

    // Update the selectedProducts list
    setSelectedProducts((prevSelected) => {
      const existingLeftProduct = prevSelected.find((item) => item.name === product.name);

      if (existingLeftProduct) {
        return prevSelected.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + quantityDifference }
            : item
        );
      } else {
        return [...prevSelected, { ...product, quantity: quantityDifference }];
      }
    });

    // If quantity is set to 0, remove it from the right list
    if (newQuantity === 0) {
      handleRemoveProduct(product);
    }
  };

  const totalOrderPrice = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalPaidPrice = orderedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#fdf4e3] p-8">
      <div className="grid grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Left Side - Order List */}
        <div className="border-2 border-yellow-500 p-6 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-4">შეკვეთები</h2>
          <div className="grid grid-cols-4 gap-4 text-center font-medium border-b border-yellow-400 pb-2">
            <span>პროდუქტი</span>
            <span>კატეგორია</span>
            <span>ფასი</span>
            <span>რაოდენობა</span>
          </div>
          {selectedProducts.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 text-center border border-yellow-400 p-2 rounded-md mt-2 cursor-pointer hover:bg-yellow-100 transition"
              onClick={() => handleSelectProduct(item)}
            >
              <span>{item.name}</span>
              <span className="text-gray-500">{item.category || "-"}</span>
              <span>{item.price}₾</span>
              <span>{item.quantity}</span>
            </div>
          ))}

          {/* Total Price & Select All Button */}
          <div className="flex justify-between items-center mt-6 border-t border-yellow-400 pt-4">
            <span className="text-lg font-semibold">დარეგისტრირებული თანხა</span>
            <span className="text-lg font-semibold">{totalOrderPrice.toFixed(2)}₾</span>
          </div>
          <SButton
            text="ყველას არჩევა"
            onClick={() => {
              setOrderedProducts([
                ...orderedProducts,
                ...selectedProducts.map((item) => ({
                  ...item,
                  originalQuantity: item.quantity,
                })),
              ]);
              setSelectedProducts([]);
            }}
            fullWidth
            className="mt-4"
          />
        </div>

        {/* Right Side - Paid Orders */}
        <div className="border-2 border-yellow-500 p-6 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-4">პროდუქტები</h2>
          <div className="grid grid-cols-4 gap-4 text-center font-medium border-b border-yellow-400 pb-2">
            <span>პროდუქტი</span>
            <span>კატეგორია</span>
            <span>ფასი</span>
            <span>რაოდენობა</span>
          </div>
          {orderedProducts.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-4 text-center border border-yellow-400 p-2 rounded-md mt-2">
              <span className="cursor-pointer" onClick={() => handleRemoveProduct(item)}>
                {item.name}
              </span>
              <span className="text-gray-500">{item.category || "-"}</span>
              <span>{item.price}₾</span>
              <input
                type="number"
                min="0"
                max={item.originalQuantity} // Prevent increasing above original quantity
                value={item.quantity}
                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value, 10))}
                className="border border-yellow-400 p-1 w-12 text-center"
              />
            </div>
          ))}

          {/* Total Paid & Confirm Button */}
          <div className="flex justify-between items-center mt-6 border-t border-yellow-400 pt-4">
            <span className="text-lg font-semibold">თანხა</span>
            <span className="text-lg font-semibold">{totalPaidPrice.toFixed(2)}₾</span>
          </div>
          <SButton text="გადახდა" onClick={() => console.log("გადახდა")} fullWidth className="mt-4" />
        </div>
      </div>
    </div>
  );
};

export default PayOrderPage;