import Image from "next/image";
import Banner from '@/components/home/Banner';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CareShareBanner from '@/components/home/CareShareBanner';
import CategoryProductsList from '@/components/home/CategoryProductsList';
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <main className="pt-12">
        <Banner />
        <CategorySection />
        <FeaturedProducts />
        <section className="bg-white">
        <CategoryProductsList />
        </section>
      </main>
      <Footer />
    </div>
  );
}
