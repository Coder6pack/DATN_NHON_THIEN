// 'use client';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { useState } from 'react';
// import CartProvider from '@/context/CartContext';
// import Header from '@/components/layout/Header';
// import Footer from '@/components/layout/Footer';

// export default function ClientProviders({ children }: { children: React.ReactNode }) {
//   const [queryClient] = useState(() => new QueryClient());

//   return (
//     <QueryClientProvider client={queryClient}>
//       <CartProvider>
//         <div className="bg-white min-h-screen">
//           <Header />
//           <main className="flex-grow">{children}</main>
//           <Footer />
//         </div>
//       </CartProvider>
//     </QueryClientProvider>
//   );
// } 