"use client";
import { useState, useMemo } from 'react';
import { useParams, useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';
import { categoriesNam, categoriesNu } from '@/data/categories';
import { Check } from 'lucide-react';

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
  const pathname = usePathname();
  const [showCount, setShowCount] = useState(12);
  const products: Product[] = sampleProducts[slug as string] || [];
  const canShowMore = products.length > showCount;
  const [selectedColors, setSelectedColors] = useState<{ [id: string]: string }>({});

  // Filter states
  const [minPriceInput, setMinPriceInput] = useState('');
  const [maxPriceInput, setMaxPriceInput] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState(0);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState(1000000);

  const [selectedRating, setSelectedRating] = useState(0); // New state for rating filter

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Price filter
      if (product.price < appliedMinPrice || product.price > appliedMaxPrice) {
        return false;
      }

      // Rating filter
      if (selectedRating > 0 && (product.rating === undefined || product.rating < selectedRating)) {
        return false;
      }

      return true;
    });
  }, [products, appliedMinPrice, appliedMaxPrice, selectedRating]);

  const handleColorSelect = (productId: string, color: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: color }));
  };

  const handleProductClick = (id: string) => {
    router.push(`/product/${id}`);
  };

  const handlePriceApply = () => {
    const newMinPrice = Number(minPriceInput || 0);
    const newMaxPrice = Number(maxPriceInput || 1000000);
    setAppliedMinPrice(newMinPrice);
    setAppliedMaxPrice(newMaxPrice);
    console.log(`Applied Min Price: ${newMinPrice}, Applied Max Price: ${newMaxPrice}`);
  };

  const handleClearAllFilters = () => {
    setMinPriceInput('');
    setMaxPriceInput('');
    setAppliedMinPrice(0);
    setAppliedMaxPrice(1000000);
    setSelectedRating(0);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  }

  // Get all unique categories for the left sidebar
  const allCategories = useMemo(() => {
    const combinedCategories = [...categoriesNam, ...categoriesNu];
    const uniqueCategoryMap = new Map();
    combinedCategories.forEach(cat => {
      if (!uniqueCategoryMap.has(cat.link)) {
        uniqueCategoryMap.set(cat.link, cat);
      }
    });
    return Array.from(uniqueCategoryMap.values());
  }, []);

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 flex gap-8">
      {/* Left Sidebar for Filters */}
      <div className="w-full md:w-1/4 flex-shrink-0">
        {/* All Categories */}
        <div className="mb-8">
          <h2 className="text-red-600 font-bold mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
            Tất cả danh mục
          </h2>
          <ul>
            {allCategories.map(cat => {
              const isSelected = pathname === cat.link;
              return (
                <li key={cat.id} className="mb-2">
                  <a href={cat.link} className={`flex items-center justify-between text-black hover:text-blue-600 ${isSelected ? 'font-semibold text-blue-600' : ''}`}>
                    {cat.name}
                    {isSelected && <Check className="w-4 h-4 ml-2" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Search Filter Title */}
        <h2 className="font-bold mb-6 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            BỘ LỌC TÌM KIẾM
        </h2>

        {/* Price Range Filter */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Khoảng giá</h3>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="number"
              placeholder="Từ"
              value={minPriceInput}
              onChange={(e) => setMinPriceInput(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Đến"
              value={maxPriceInput}
              onChange={(e) => setMaxPriceInput(e.target.value)}
              className="w-1/2 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={handlePriceApply}
            className="w-full px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition"
          >
            ÁP DỤNG
          </button>
        </div>

        {/* Rating Filter */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Đánh giá</h3>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div
                key={rating}
                className="flex items-center cursor-pointer"
                onClick={() => setSelectedRating(rating)}
              >
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.683-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.565-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-2 text-sm text-black">{rating} Trở lên</span>
                {selectedRating === rating && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-blue-600 ml-auto"><polyline points="20 6 9 17 4 12"/></svg>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Clear All Filters Button */}
        <button
          onClick={handleClearAllFilters}
          className="w-full px-6 py-2 bg-red-600 text-white rounded font-semibold hover:bg-red-700 transition"
        >
          XÓA TẤT CẢ
        </button>
      </div>

      {/* Right Content Area for Products */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-8 uppercase text-center md:text-left text-gray-900 dark:text-gray-100">{slug?.toString().replace(/-/g, ' ')}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0, showCount).map((p: Product) => (
          <div key={p.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex flex-col relative group transition hover:shadow-lg cursor-pointer" onClick={() => handleProductClick(p.id)}>
            {/* Rating và label phía trên ảnh */}
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1 text-xs font-semibold">
                <span className="text-blue-600 dark:text-blue-400">{p.rating}★</span>
                <span className="text-black dark:text-gray-300">({p.reviews})</span>
              </div>
              {p.label && (
                <span className="bg-black dark:bg-gray-700 text-white text-xs px-2 py-1 rounded">{p.label}</span>
              )}
            </div>
            {/* Ảnh sản phẩm */}
            <div className="w-full aspect-[4/5] mb-3 relative overflow-hidden rounded-xl flex items-center justify-center bg-gray-50 dark:bg-gray-700">
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
                    onClick={(e) => {
                      e.stopPropagation();
                      handleColorSelect(p.id, c.code);
                    }}
                  aria-label={`Chọn màu ${c.name}`}
                  type="button"
                />
              ))}
            </div>
            {/* Tên sản phẩm */}
            <div className="font-semibold text-center mb-1 text-base line-clamp-2 min-h-[40px]">{p.name}</div>
            {/* Giá */}
            <div className="flex items-center gap-2 justify-center">
                <span className="text-black font-bold text-base">{formatPrice(p.price)}</span>
              {p.discount && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded ml-1">-{p.discount}%</span>
              )}
              {p.oldPrice && (
                  <span className="text-gray-400 line-through text-sm">{formatPrice(p.oldPrice)}</span>
              )}
            </div>
          </div>
        ))}
      </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp với bộ lọc</p>
          </div>
        )}

        {canShowMore && filteredProducts.length > showCount && (
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
    </div>
  );
};

export default CategoryPage; 