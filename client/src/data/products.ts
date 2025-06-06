export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  colors: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Áo Thun Nam',
    price: 299000,
    originalPrice: 399000,
    images: [
      '/images/thun.jpg',
      '/images/thun.jpg',
      '/images/thun.jpg',
      '/images/thun.jpg',
    ],
    description: 'Áo thun nam chất liệu cotton 100%, kiểu dáng regular fit, thoáng mát',
    colors: ['Đen', 'Trắng', 'Xám'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '2',
    name: 'Áo Ba Lỗ',
    price: 199000,
    originalPrice: 299000,
    images: [
      '/images/aobalo.jpg',
      '/images/aobalo.jpg',
      '/images/aobalo.jpg',
      '/images/aobalo.jpg',
    ],
    description: 'Áo ba lỗ nam cotton 100%, thiết kế đơn giản, phù hợp mùa hè',
    colors: ['Đen', 'Trắng', 'Xanh'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '3',
    name: 'Đôi Tất Nam',
    price: 99000,
    originalPrice: 129000,
    images: [
      '/images/doitat.jpg',
      '/images/doitat.jpg',
      '/images/doitat.jpg',
      '/images/doitat.jpg',
    ],
    description: 'Tất nam cotton 80%, spandex 20%, co giãn tốt, thoáng mát',
    colors: ['Đen', 'Trắng', 'Xám'],
    sizes: ['39', '40', '41', '42', '43'],
  },
  {
    id: '4',
    name: 'Quần Short Nam',
    price: 399000,
    originalPrice: 499000,
    images: [
      '/images/short.jpg',
      '/images/short.jpg',
      '/images/short.jpg',
      '/images/short.jpg',
    ],
    description: 'Quần short nam cotton 100%, kiểu dáng regular fit, thoải mái',
    colors: ['Đen', 'Xanh', 'Xám'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '5',
    name: 'Áo Polo Nam',
    price: 259000,
    originalPrice: 299000,
    images: [
      '/images/Polo.jpg',
      '/images/Polo.jpg',
      '/images/Polo.jpg',
      '/images/Polo.jpg',
    ],
    description: 'Áo polo nam cotton 100%, kiểu dáng regular fit, lịch lãm',
    colors: ['Đen', 'Trắng', 'Xanh Navy'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '6',
    name: 'Quần Lót Nam',
    price: 129000,
    originalPrice: 159000,
    images: [
      '/images/Do_lotz.jpg',
      '/images/Do_lotz.jpg',
      '/images/Do_lotz.jpg',
      '/images/Do_lotz.jpg',
    ],
    description: 'Quần lót nam cotton 95%, spandex 5%, co giãn tốt, thoáng mát',
    colors: ['Đen', 'Trắng', 'Xám'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '7',
    name: 'Đồ Bơi Nam',
    price: 199000,
    originalPrice: 249000,
    images: [
      '/images/Do_boiz.jpg',
      '/images/Do_boiz.jpg',
      '/images/Do_boiz.jpg',
      '/images/Do_boiz.jpg',
    ],
    description: 'Đồ bơi nam polyester 80%, spandex 20%, chống nước tốt',
    colors: ['Đen', 'Xanh dương', 'Đỏ'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '8',
    name: 'Phụ Kiện Nam',
    price: 99000,
    originalPrice: 129000,
    images: [
      '/images/z.jpg',
      '/images/z.jpg',
      '/images/z.jpg',
      '/images/z.jpg',
    ],
    description: 'Phụ kiện nam đa dạng, chất lượng cao, thiết kế hiện đại',
    colors: ['Đen', 'Trắng', 'Xám'],
    sizes: ['One size'],
  },
]; 