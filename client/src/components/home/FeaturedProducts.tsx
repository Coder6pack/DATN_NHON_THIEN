"use client";
import React from 'react';
import ProductCard from '@/components/product/ProductCard';

const featuredProducts = [
  {
    id: '1',
    name: 'Áo Thun Nam',
    price: 299000,
    originalPrice: 399000,
    discount: 25,
    image: '/images/thun.jpg',
    shortDescription: 'Áo thun nam chất liệu cotton 100%, kiểu dáng regular fit, thoáng mát',
    category: 'Áo',
    brand: 'Coolmate',
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: '2',
    name: 'Áo Ba Lỗ',
    price: 199000,
    originalPrice: 299000,
    discount: 33,
    image: '/images/aobalo.jpg',
    shortDescription: 'Áo ba lỗ nam cotton 100%, thiết kế đơn giản, phù hợp mùa hè',
    category: 'Áo',
    brand: 'Coolmate',
    rating: 4.3,
    reviewCount: 95,
  },
  {
    id: '3',
    name: 'Đôi Tất Nam',
    price: 99000,
    originalPrice: 129000,
    discount: 23,
    image: '/images/doitat.jpg',
    shortDescription: 'Tất nam cotton 80%, spandex 20%, co giãn tốt, thoáng mát',
    category: 'Phụ kiện',
    brand: 'Coolmate',
    rating: 4.7,
    reviewCount: 256,
  },
  {
    id: '4',
    name: 'Quần Short Nam',
    price: 399000,
    originalPrice: 499000,
    discount: 20,
    image: '/images/short.jpg',
    shortDescription: 'Quần short nam cotton 100%, kiểu dáng regular fit, thoải mái',
    category: 'Quần',
    brand: 'Coolmate',
    rating: 4.6,
    reviewCount: 187,
  },
  {
    id: '5',
    name: 'Áo Polo Nam',
    price: 259000,
    originalPrice: 299000,
    discount: 13,
    image: '/images/Polo.jpg'
  },
  {
    id: '6',
    name: 'Quần Lót Nam',
    price: 129000,
    originalPrice: 159000,
    discount: 19,
    image: '/images/Do_lotz.jpg'
  },
  {
    id: '7',
    name: 'Đồ Bơi Nam',
    price: 199000,
    originalPrice: 249000,
    discount: 20,
    image: '/images/Do_boiz.jpg'
  },
  {
    id: '8',
    name: 'Phụ Kiện Nam',
    price: 99000,
    originalPrice: 129000,
    discount: 23,
    image: '/images/z.jpg'
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 