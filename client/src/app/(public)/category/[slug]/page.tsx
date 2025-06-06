"use client";
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

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

const sampleProducts: Record<string, Product[]> = {
  "ao-thun": [
    {
      id: "1",
      name: "Áo Polo Thể Thao Pro Active 1595 Phối Màu",
      image: "/images/thun.jpg",
      price: 249000,
      oldPrice: null,
      discount: null,
      rating: 4.9,
      reviews: 38,
      label: "ĐÁNG MUA",
      colors: [
        { code: "#222", name: "Đen" },
        { code: "#fff", name: "Trắng" },
        { code: "#bdbdbd", name: "Xám" },
      ],
    },
    {
      id: "2",
      name: "Pack 3 Áo Polo nam Pique Cotton",
      image: "/images/thun.jpg",
      price: 759000,
      oldPrice: 897000,
      discount: 15,
      rating: 4.8,
      reviews: 284,
      label: "SAVING PACKS",
      colors: [
        { code: "#795548", name: "Nâu" },
        { code: "#f5f5dc", name: "Be" },
        { code: "#222", name: "Đen" },
      ],
    },
    {
      id: "3",
      name: "Áo Polo Nam Ice Cooling",
      image: "/images/thun.jpg",
      price: 299000,
      oldPrice: 349000,
      discount: 14,
      rating: 4.9,
      reviews: 32,
      label: null,
      colors: [
        { code: "#90caf9", name: "Xanh nhạt" },
        { code: "#fff", name: "Trắng" },
      ],
    },
    {
      id: "4",
      name: "Áo Polo Nam Pique Cotton USA",
      image: "/images/thun.jpg",
      price: 149000,
      oldPrice: 399000,
      discount: 63,
      rating: 4.9,
      reviews: 170,
      label: "OUTLET",
      colors: [
        { code: "#789262", name: "Xanh rêu" },
        { code: "#222", name: "Đen" },
      ],
    },
    {
      id: "5",
      name: "Áo Polo Nam Pique Cotton",
      image: "/images/thun.jpg",
      price: 259000,
      oldPrice: 299000,
      discount: 13,
      rating: 4.8,
      reviews: 284,
      label: "ĐÁNG MUA",
      colors: [
        { code: "#795548", name: "Nâu" },
        { code: "#f5f5dc", name: "Be" },
        { code: "#222", name: "Đen" },
      ],
    },
    {
      id: "6",
      name: "Polo thể thao nam Promax Sideflow",
      image: "/images/thun.jpg",
      price: 249000,
      oldPrice: null,
      discount: null,
      rating: 4.8,
      reviews: 284,
      label: "NEW",
      colors: [
        { code: "#222", name: "Đen" },
        { code: "#fff", name: "Trắng" },
      ],
    },
    {
      id: "7",
      name: "Áo Polo thể thao Graphene",
      image: "/images/thun.jpg",
      price: 279000,
      oldPrice: null,
      discount: null,
      rating: 4.8,
      reviews: 284,
      label: null,
      colors: [
        { code: "#bdbdbd", name: "Xám" },
        { code: "#222", name: "Đen" },
      ],
    },
    {
      id: "8",
      name: "Áo Polo Nam Cafe Essentials",
      image: "/images/thun.jpg",
      price: 269000,
      oldPrice: 299000,
      discount: 10,
      rating: 4.9,
      reviews: 56,
      label: "OUTLET",
      colors: [
        { code: "#222", name: "Đen" },
        { code: "#fff", name: "Trắng" },
      ],
    },
    {
      id: "ao-thun-9",
      name: "Áo Polo Nam Pique Cotton",
      image: "/images/thun.jpg",
      price: 259000,
      oldPrice: 299000,
      discount: 13,
      rating: 4.8,
      reviews: 284,
      label: null,
      colors: [
        { code: "#795548", name: "Nâu" },
        { code: "#f5f5dc", name: "Be" },
        { code: "#222", name: "Đen" },
      ],
    },
    {
      id: "ao-thun-10",
      name: "Polo thể thao nam Promax Sideflow",
      image: "/images/thun.jpg",
      price: 249000,
      oldPrice: null,
      discount: null,
      rating: 4.8,
      reviews: 284,
      label: "NEW",
      colors: [
        { code: "#222", name: "Đen" },
        { code: "#fff", name: "Trắng" },
      ],
    },
    {
      id: "ao-thun-11",
      name: "Áo Polo thể thao Graphene",
      image: "/images/thun.jpg",
      price: 279000,
      oldPrice: null,
      discount: null,
      rating: 4.8,
      reviews: 284,
      label: null,
      colors: [
        { code: "#bdbdbd", name: "Xám" },
        { code: "#222", name: "Đen" },
      ],
    },
    {
      id: "ao-thun-12",
      name: "Áo Polo Nam Cafe Essentials",
      image: "/images/thun.jpg",
      price: 269000,
      oldPrice: 299000,
      discount: 10,
      rating: 4.9,
      reviews: 56,
      label: "OUTLET",
      colors: [
        { code: "#222", name: "Đen" },
        { code: "#fff", name: "Trắng" },
      ],
    },
  ],
  "ao-polo": Array.from({ length: 12 }, (_, i) => ({
    id: `ao-polo-${i+1}`,
    name: `Áo Polo Sản phẩm ${i+1}`,
    image: '/images/nam-ao-polo.jpg',
    price: 249000 + (i % 4) * 50000,
  })),
  "quan-short": Array.from({ length: 12 }, (_, i) => ({
    id: `quan-short-${i+1}`,
    name: `Quần Short Sản phẩm ${i+1}`,
    image: '/images/nam-quan-short.jpg',
    price: 179000 + (i % 4) * 40000,
  })),
  "quan-lot": Array.from({ length: 12 }, (_, i) => ({
    id: `quan-lot-${i+1}`,
    name: `Quần Lót Sản phẩm ${i+1}`,
    image: '/images/nam-quan-lot.jpg',
    price: 99000 + (i % 4) * 20000,
  })),
  "do-boi": Array.from({ length: 12 }, (_, i) => ({
    id: `do-boi-${i+1}`,
    name: `Đồ Bơi Sản phẩm ${i+1}`,
    image: '/images/nam-do-boi.jpg',
    price: 159000 + (i % 4) * 30000,
  })),
  "phu-kien": Array.from({ length: 12 }, (_, i) => ({
    id: `phu-kien-${i+1}`,
    name: `Phụ Kiện Sản phẩm ${i+1}`,
    image: '/images/nam-phu-kien.jpg',
    price: 59000 + (i % 4) * 10000,
  })),
  // Đồ Nữ
  "nu-ao-thun": Array.from({ length: 12 }, (_, i) => ({
    id: `nu-ao-thun-${i+1}`,
    name: `Áo Thun Nữ Sản phẩm ${i+1}`,
    image: '/images/nu-ao-thun.jpg',
    price: 189000 + (i % 4) * 40000,
  })),
  "nu-ao-polo": Array.from({ length: 12 }, (_, i) => ({
    id: `nu-ao-polo-${i+1}`,
    name: `Áo Polo Nữ Sản phẩm ${i+1}`,
    image: '/images/nu-ao-polo.jpg',
    price: 229000 + (i % 4) * 40000,
  })),
  "nu-quan-short": Array.from({ length: 12 }, (_, i) => ({
    id: `nu-quan-short-${i+1}`,
    name: `Quần Short Nữ Sản phẩm ${i+1}`,
    image: '/images/nu-quan-short.jpg',
    price: 159000 + (i % 4) * 30000,
  })),
  "nu-quan-lot": Array.from({ length: 12 }, (_, i) => ({
    id: `nu-quan-lot-${i+1}`,
    name: `Quần Lót Nữ Sản phẩm ${i+1}`,
    image: '/images/nu-quan-lot.jpg',
    price: 89000 + (i % 4) * 10000,
  })),
  "nu-do-boi": Array.from({ length: 12 }, (_, i) => ({
    id: `nu-do-boi-${i+1}`,
    name: `Đồ Bơi Nữ Sản phẩm ${i+1}`,
    image: '/images/nu-do-boi.jpg',
    price: 139000 + (i % 4) * 20000,
  })),
  "nu-phu-kien": Array.from({ length: 12 }, (_, i) => ({
    id: `nu-phu-kien-${i+1}`,
    name: `Phụ Kiện Nữ Sản phẩm ${i+1}`,
    image: '/images/nu-phu-kien.jpg',
    price: 49000 + (i % 4) * 10000,
  })),
};

const CategoryPage = () => {
  const { slug } = useParams();
  const router = useRouter();
  const [showCount, setShowCount] = useState(12);
  const products: Product[] = sampleProducts[slug as string] || [];
  const canShowMore = products.length > showCount;
  const [selectedColors, setSelectedColors] = useState<{ [id: string]: string }>({});

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  // Sửa hàm chuyển trang để nhận id sản phẩm
  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-8 uppercase">{slug?.toString().replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, showCount).map((p: Product) => (
          <div key={p.id} className="bg-white rounded-2xl shadow p-4 flex flex-col relative group transition hover:shadow-lg cursor-pointer" onClick={() => handleProductClick(p.id)}>
            {/* Rating và label phía trên ảnh */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1 text-xs font-semibold">
                <span className="text-blue-600">{p.rating}★</span>
                <span className="text-black">({p.reviews})</span>
              </div>
              {p.label && (
                <span className="bg-black text-white text-xs px-2 py-1 rounded">{p.label}</span>
              )}
            </div>
            {/* Ảnh sản phẩm */}
            <div className="w-full aspect-[4/5] mb-3 relative overflow-hidden rounded-xl flex items-center justify-center bg-gray-50">
              <Image src={p.image} alt={p.name} fill className="object-contain" />
            </div>
            {/* Màu sắc */}
            <div className="flex gap-1 mb-2 justify-center">
              {p.colors?.map((c, idx) => (
                <button
                  key={idx}
                  className={`inline-block w-5 h-5 rounded-full border-2 transition
                    ${selectedColors[p.id] === c.code ? "border-blue-600 scale-110" : "border-gray-300"}
                  `}
                  style={{ background: c.code }}
                  onClick={() => handleColorSelect(p.id, c.code)}
                  aria-label={`Chọn màu ${c.name}`}
                  type="button"
                />
              ))}
            </div>
            {/* Tên sản phẩm */}
            <div className="font-semibold text-center mb-1 text-base line-clamp-2 min-h-[40px]">{p.name}</div>
            {/* Giá */}
            <div className="flex items-center gap-2 justify-center">
              <span className="text-black font-bold text-base">{p.price.toLocaleString('vi-VN')}đ</span>
              {p.discount && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded ml-1">-{p.discount}%</span>
              )}
              {p.oldPrice && (
                <span className="text-gray-400 line-through text-sm">{p.oldPrice.toLocaleString('vi-VN')}đ</span>
              )}
            </div>
          </div>
        ))}
      </div>
      {canShowMore && (
        <div className="flex justify-center mt-6">
          <button
            className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition"
            onClick={() => setShowCount((c) => c + 12)}
          >
            XEM THÊM
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryPage; 