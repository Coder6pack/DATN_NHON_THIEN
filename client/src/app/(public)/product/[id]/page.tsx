'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { products, Product } from '@/data/products';
import CategoryProducts from '@/components/home/CategoryProducts';

interface ProductDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetail({ params }: ProductDetailProps) {
  const { addToCart } = useCart();
  
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const id = unwrappedParams.id;
  const product = products.find((p: Product) => p.id === id);

  // Lọc sản phẩm liên quan
  const relatedProducts = product
    ? products.filter((p: Product) => p.category === product.category && p.id !== product.id)
    : [];

  // State cho chọn màu và size
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string>(product?.image || '');

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Sản phẩm không tồn tại</h1>
          <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.oldPrice ?? undefined,
      image: product.image,
      quantity: 1,
      color: selectedColor,
      size: selectedSize,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[product.image, ...(product.images || [])].map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`relative aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === image
                      ? 'border-blue-600 dark:border-blue-400'
                      : 'border-transparent'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6 min-w-0 w-full">
            <div>
              <h1 className="text-3xl font-bold mb-4 mt-8 text-gray-900 dark:text-gray-100">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < 4 ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">(4.0 - 120 đánh giá)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {product.price.toLocaleString('vi-VN')}đ
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                    {product.oldPrice.toLocaleString('vi-VN')}đ
                  </span>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Màu sắc</h3>
              <div className="flex gap-2">
                {product.colors?.map((colorObj, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(colorObj.code)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedColor === colorObj.code
                        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full border-2 border-gray-300 dark:border-gray-600 transition-all duration-300 hover:scale-110 hover:border-blue-500 dark:hover:border-blue-400"
                         style={{ background: colorObj.code }}
                         aria-label={`Chọn màu ${colorObj.name}`}>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Kích thước</h3>
              <div className="flex gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size
                        ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                        : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Số lượng</h3>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 border rounded-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  -
                </button>
                <span className="w-12 text-center text-gray-900 dark:text-gray-100">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 border rounded-lg text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">Mô tả sản phẩm</h3>
          <p className="text-gray-600 dark:text-gray-400">{product.description}</p>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <CategoryProducts
              title="CÓ THỂ BẠN CŨNG THÍCH"
              products={relatedProducts}
              category={product.category}
            />
          </div>
        )}
      </main>
    </div>
  );
} 