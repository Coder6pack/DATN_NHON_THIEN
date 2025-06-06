'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number | null;
  discount?: number | null;
  rating?: number;
  reviews?: number;
  label?: string | null;
  colors?: { code: string; name: string }[];
}

interface CategoryProductsProps {
  title: string;
  products: Product[];
  category: string;
}

export default function CategoryProducts({ title, products, category }: CategoryProductsProps) {
  const [firstIndex, setFirstIndex] = useState(0);
  const productsPerPage = 4;
  const maxFirstIndex = Math.max(0, products.length - productsPerPage);

  const handlePrev = () => {
    setFirstIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setFirstIndex((prev) => Math.min(maxFirstIndex, prev + 1));
  };

  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrev}
              disabled={firstIndex === 0}
              className={`rounded-full transition-all duration-300 ${
                firstIndex === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 hover:scale-110 active:scale-95'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNext}
              disabled={firstIndex === maxFirstIndex}
              className={`rounded-full transition-all duration-300 ${
                firstIndex === maxFirstIndex
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-100 hover:scale-110 active:scale-95'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            {firstIndex + 1}/{products.length - productsPerPage + 1}
          </div>
        </div>
      </div>

      <div className="overflow-hidden w-full">
        <div
          className="flex transition-transform duration-500"
          style={{
            width: `${products.length * 25}%`,
            transform: `translateX(-${firstIndex * 100 / productsPerPage}%)`,
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="w-1/4 px-2 flex-shrink-0"
            >
              <Link
                href={`/product/${product.id}`}
                className="block transform transition-all duration-300 hover:scale-105"
              >
                <div className="bg-white rounded-2xl shadow p-4 flex flex-col relative group transition-all duration-300 hover:shadow-lg">
                  {/* Rating và label phía trên ảnh */}
                  <div className="flex items-center justify-between mb-2 px-1">
                    <div className="flex items-center gap-1 text-xs font-semibold">
                      <span className="text-blue-600">{product.rating}★</span>
                      <span className="text-black">({product.reviews})</span>
                    </div>
                    {product.label && (
                      <span className="bg-black text-white text-xs px-2 py-1 rounded">{product.label}</span>
                    )}
                  </div>
                  {/* Ảnh sản phẩm */}
                  <div className="w-full aspect-[4/5] mb-3 relative overflow-hidden rounded-xl flex items-center justify-center bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="100vw"
                      className="object-contain transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  {/* Màu sắc */}
                  {product.colors && (
                    <div className="flex gap-1 mb-2 justify-center">
                      {product.colors.map((c, idx) => (
                        <button
                          key={idx}
                          className="inline-block w-5 h-5 rounded-full border-2 border-gray-300 transition-all duration-300 hover:scale-110 hover:border-blue-500"
                          style={{ background: c.code }}
                          aria-label={`Chọn màu ${c.name}`}
                          type="button"
                        />
                      ))}
                    </div>
                  )}
                  {/* Tên sản phẩm */}
                  <div className="font-semibold text-center mb-1 text-base line-clamp-2 min-h-[40px] group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </div>
                  {/* Giá */}
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-black font-bold text-base">{product.price.toLocaleString('vi-VN')}đ</span>
                    {product.discount && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded ml-1">-{product.discount}%</span>
                    )}
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through text-sm">{product.oldPrice.toLocaleString('vi-VN')}đ</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 