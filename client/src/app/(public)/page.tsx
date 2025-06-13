import Image from "next/image";
import CategorySection from '@/components/home/CategorySection';
import CategoryProductsList from '@/components/home/CategoryProductsList';
import Footer from "@/components/layout/Footer";
import AdBannerSlider from '@/components/AdBannerSlider';

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-gray-900">
      <main className="pt-12">
        <AdBannerSlider />
        <CategorySection />
        <section className="bg-white dark:bg-gray-900">
          <CategoryProductsList />
        </section>
      </main>
      <Footer />
    </div>
  );
}
