"use client";
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  image: string;
  link: string;
}

const categoriesNam: Category[] = [
  {
    id: '1',
    name: 'ÁO THUN',
    image: '/images/Thun_Namz.jpg',
    link: '/category/ao-thun'
  },
  {
    id: '2',
    name: 'ÁO POLO',
    image: '/images/Polo.jpg',
    link: '/category/ao-polo'
  },
  {
    id: '3',
    name: 'QUẦN SHORT',
    image: '/images/Shortss.jpg',
    link: '/category/quan-short'
  },
  {
    id: '4',
    name: 'QUẦN LÓT',
    image: '/images/Do_lotz.jpg',
    link: '/category/quan-lot'
  },
  {
    id: '5',
    name: 'ĐỒ BƠI',
    image: '/images/Do_boiz.jpg',
    link: '/category/do-boi'
  },
  {
    id: '6',
    name: 'PHỤ KIỆN',
    image: '/images/z.jpg',
    link: '/category/phu-kien'
  }
];

const categoriesNu: Category[] = [
  {
    id: '1',
    name: 'ÁO THUN',
    image: '/images/ao-thun-nu.jpg',
    link: '/category/ao-thun'
  },
  {
    id: '2',
    name: 'ÁO POLO',
    image: '/images/ao-polo-nu.jpg',
    link: '/category/ao-polo'
  },
  {
    id: '3',
    name: 'QUẦN SHORT',
    image: '/images/quan-short-nu.jpg',
    link: '/category/quan-short'
  },
  {
    id: '4',
    name: 'QUẦN LÓT',
    image: '/images/quan-lot-nu.jpg',
    link: '/category/quan-lot'
  },
  {
    id: '5',
    name: 'ĐỒ BƠI',
    image: '/images/do-boi-nu.jpg',
    link: '/category/do-boi'
  },
  {
    id: '6',
    name: 'PHỤ KIỆN',
    image: '/images/phu-kien-nu.jpg',
    link: '/category/phu-kien'
  }
];

const CategorySection = () => {
  const [tab, setTab] = useState<'nam' | 'nu'>('nam');
  const categories = tab === 'nam' ? categoriesNam : categoriesNu;

  return (
    <section className="py-16 bg-white">
      <h2 className="text-2xl text-black font-bold mb-8 px-8">DANH MỤC SẢN PHẨM</h2>
      <div className="w-full px-8">
        <div className="flex justify-center gap-6 mb-12">
          <button
            className={`px-8 py-3 rounded-full font-semibold text-lg ${tab === 'nam' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setTab('nam')}
          >
            ĐỒ NAM
          </button>
          <button
            className={`px-8 py-3 rounded-full font-semibold text-lg ${tab === 'nu' ? 'bg-black text-white' : 'bg-gray-200 text-black'}`}
            onClick={() => setTab('nu')}
          >
            ĐỒ NỮ
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.link}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-sm bg-white">
                <div className="aspect-[3/4] relative w-full min-h-[340px]">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-center py-4 font-bold text-base uppercase tracking-wide text-black group-hover:text-blue-600 transition-colors duration-200">
                  {category.name}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection; 