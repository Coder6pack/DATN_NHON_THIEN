'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';

export default function CartContent() {
  const { cart, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold mb-4">Giỏ hàng trống</h2>
        <p className="text-gray-600">Hãy thêm sản phẩm vào giỏ hàng của bạn</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Giỏ hàng của bạn ({cart.length} sản phẩm)</h2>
      </div>

      <div className="divide-y">
        {cart.map(item => {
          // Create a unique key by combining id, color, and size
          const uniqueKey = `${item.id}-${item.color || 'no-color'}-${item.size || 'no-size'}`;
          
          return (
            <div key={uniqueKey} className="p-4 flex items-center gap-4">
              <div className="relative w-24 h-24">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>

              <div className="flex-grow">
                <h3 className="font-medium">{item.name}</h3>
                {item.color && <p className="text-sm text-gray-600">Màu: {item.color}</p>}
                {item.size && <p className="text-sm text-gray-600">Size: {item.size}</p>}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.color, item.size)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.color, item.size)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.color, item.size)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Xóa
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-medium">
                  {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                </p>
                {item.originalPrice && (
                  <p className="text-sm text-gray-500 line-through">
                    {(item.originalPrice * item.quantity).toLocaleString('vi-VN')}đ
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 