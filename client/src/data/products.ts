export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number | null;
  discount?: number | null;
  rating?: number;
  reviews?: number;
  label?: string | null;
  image: string;
  images?: string[];
  description: string;
  colors?: { code: string; name: string }[];
  sizes: string[];
  category: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Áo Thun Nam',
    price: 299000,
    oldPrice: 399000,
    discount: 25,
    rating: 4.8,
    reviews: 150,
    label: "SALE",
    image: '/images/thun.jpg',
    images: [
      '/images/thun-1.jpg',
      '/images/thun-2.jpg'
    ],
    description: 'Áo thun nam chất liệu cotton 100%, kiểu dáng regular fit, thoáng mát',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#fff', name: 'Trắng' }, { code: '#808080', name: 'Xám' }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'ao-thun',
  },
  {
    id: '2',
    name: 'Áo Ba Lỗ',
    price: 199000,
    oldPrice: 299000,
    discount: 33,
    rating: 4.5,
    reviews: 80,
    label: "HOT",
    image: '/images/aobalo.jpg',
    images: [
      '/images/aobalo.jpg',
      '/images/aobalo-2.jpg',
      '/images/aobalo-3.jpg'
    ],
    description: 'Áo ba lỗ nam cotton 100%, thiết kế đơn giản, phù hợp mùa hè',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#fff', name: 'Trắng' }, { code: '#0000ff', name: 'Xanh' }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'ao-thun',
  },
  {
    id: '3',
    name: 'Đôi Tất Nam',
    price: 99000,
    oldPrice: 129000,
    discount: 23,
    rating: 4.0,
    reviews: 50,
    label: null,
    image: '/images/doitat.jpg',
    images: [
      '/images/doitat.jpg',
      '/images/doitat-2.jpg',
      '/images/doitat-3.jpg',
      '/images/doitat-4.jpg',
      '/images/doitat-5.jpg'
    ],
    description: 'Tất nam cotton 80%, spandex 20%, co giãn tốt, thoáng mát',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#fff', name: 'Trắng' }, { code: '#808080', name: 'Xám' }],
    sizes: ['39', '40', '41', '42', '43'],
    category: 'ao-thun',
  },
  {
    id: '4',
    name: 'Quần Short Nam',
    price: 399000,
    oldPrice: 499000,
    discount: 20,
    rating: 4.7,
    reviews: 120,
    label: "NEW",
    image: '/images/short.jpg',
    images: [
      '/images/short.jpg',
      '/images/short-2.jpg',
      '/images/short-3.jpg',
      '/images/short-4.jpg'
    ],
    description: 'Quần short nam cotton 100%, kiểu dáng regular fit, thoải mái',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#0000ff', name: 'Xanh' }, { code: '#808080', name: 'Xám' }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'quan-short',
  },
  {
    id: '5',
    name: 'Áo Polo Nam',
    price: 259000,
    oldPrice: 299000,
    discount: 13,
    rating: 4.9,
    reviews: 200,
    label: "BEST SELLER",
    image: '/images/Polo.jpg',
    images: [
      '/images/Polo.jpg',
      '/images/Polo-2.jpg',
      '/images/Polo-3.jpg',
      '/images/Polo-4.jpg',
      '/images/Polo-5.jpg'
    ],
    description: 'Áo polo nam cotton 100%, kiểu dáng regular fit, lịch lãm',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#fff', name: 'Trắng' }, { code: '#000080', name: 'Xanh Navy' }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'ao-polo',
  },
  {
    id: '6',
    name: 'Quần Lót Nam',
    price: 129000,
    oldPrice: 159000,
    discount: 19,
    rating: 4.2,
    reviews: 60,
    label: null,
    image: '/images/Do_lotz.jpg',
    images: [
      '/images/Do_lotz.jpg',
      '/images/Do_lotz-2.jpg',
      '/images/Do_lotz-3.jpg'
    ],
    description: 'Quần lót nam cotton 95%, spandex 5%, co giãn tốt, thoáng mát',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#fff', name: 'Trắng' }, { code: '#808080', name: 'Xám' }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'quan-short',
  },
  {
    id: '7',
    name: 'Đồ Bơi Nam',
    price: 199000,
    oldPrice: 249000,
    discount: 20,
    rating: 4.6,
    reviews: 90,
    label: "SALE",
    image: '/images/Do_boiz.jpg',
    images: [
      '/images/Do_boiz.jpg',
      '/images/Do_boiz-2.jpg',
      '/images/Do_boiz-3.jpg',
      '/images/Do_boiz-4.jpg'
    ],
    description: 'Đồ bơi nam polyester 80%, spandex 20%, chống nước tốt',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#0000ff', name: 'Xanh dương' }, { code: '#ff0000', name: 'Đỏ' }],
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'do-boi',
  },
  {
    id: '8',
    name: 'Phụ Kiện Nam',
    price: 99000,
    oldPrice: 129000,
    discount: 23,
    rating: 4.3,
    reviews: 40,
    label: null,
    image: '/images/z.jpg',
    images: [
      '/images/z.jpg',
      '/images/z-2.jpg',
      '/images/z-3.jpg',
      '/images/z-4.jpg'
    ],
    description: 'Phụ kiện nam đa dạng, chất lượng cao, thiết kế hiện đại',
    colors: [{ code: '#000', name: 'Đen' }, { code: '#fff', name: 'Trắng' }, { code: '#808080', name: 'Xám' }],
    sizes: ['One size'],
    category: 'ao-thun',
  },
]; 