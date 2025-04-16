
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/home/HeroSection';
import TrendingSection from '@/components/home/TrendingSection';
import AnimeCategories from '@/components/home/AnimeCategories';
import ProductCategories from '@/components/home/ProductCategories';
import ReviewsSection from '@/components/home/ReviewsSection';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <HeroSection />
      <TrendingSection />
      <AnimeCategories />
      <ProductCategories />
      <ReviewsSection />
      <Footer />
    </div>
  );
};

export default Home;
