import { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const banners = [
  {
    id: 1,
    title: 'Summer Sale',
    subtitle: 'Up to 70% off on fashion',
    image: 'https://images.unsplash.com/photo-1641839629833-4838a270e2ce?w=1080',
    link: '/products/fashion',
  },
  {
    id: 2,
    title: 'Latest Electronics',
    subtitle: 'New arrivals at best prices',
    image: 'https://images.unsplash.com/photo-1760587162690-95608c8ab2da?w=1080',
    link: '/products/electronics',
  },
  {
    id: 3,
    title: 'Home Makeover',
    subtitle: 'Transform your space',
    image: 'https://images.unsplash.com/photo-1662059361834-d361807d63e7?w=1080',
    link: '/products/home-kitchen',
  },
];

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=400', link: '/products/electronics' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1641839588934-6d481144605b?w=400', link: '/products/fashion' },
  { name: 'Home & Kitchen', image: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=400', link: '/products/home-kitchen' },
  { name: 'Beauty', image: 'https://images.unsplash.com/photo-1660324579818-0160263f0d55?w=400', link: '/products/beauty' },
  { name: 'Sports', image: 'https://images.unsplash.com/photo-1636614223954-db6a663293ef?w=400', link: '/products/sports' },
  { name: 'Books', image: 'https://images.unsplash.com/photo-1633557614023-f37613f7c4b7?w=400', link: '/products/books' },
];

const trendingProducts = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 134900,
    originalPrice: 159900,
    discount: 15,
    rating: 4.5,
    reviews: 2453,
    image: 'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=400',
  },
  {
    id: '2',
    name: 'MacBook Pro 14"',
    price: 189900,
    originalPrice: 209900,
    discount: 10,
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1636614223954-db6a663293ef?w=400',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    rating: 4.7,
    reviews: 3201,
    image: 'https://images.unsplash.com/photo-1630148198235-6bd561ba72a4?w=400',
  },
  {
    id: '4',
    name: 'Premium Leather Jacket',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.3,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1629373915883-944ae752da19?w=400',
  },
  {
    id: '5',
    name: 'Designer Watch',
    price: 12499,
    originalPrice: 19999,
    discount: 37,
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1760520338238-4137dd2dc28f?w=400',
  },
  {
    id: '6',
    name: 'Modern Armchair',
    price: 15999,
    originalPrice: 24999,
    discount: 36,
    rating: 4.4,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=400',
  },
  {
    id: '7',
    name: 'Smart Watch Pro',
    price: 24999,
    originalPrice: 29999,
    discount: 17,
    rating: 4.5,
    reviews: 1543,
    image: 'https://images.unsplash.com/photo-1760520338238-4137dd2dc28f?w=400',
  },
  {
    id: '8',
    name: 'Wireless Earbuds',
    price: 7999,
    originalPrice: 12999,
    discount: 38,
    rating: 4.2,
    reviews: 2876,
    image: 'https://images.unsplash.com/photo-1761641466573-f240b6e446de?w=400',
  },
];

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div>
      <section className="relative h-[500px] overflow-hidden bg-muted">
        {banners.map((banner, index) => (
          <motion.div
            key={banner.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentBanner === index ? 1 : 0,
              scale: currentBanner === index ? 1 : 1.1,
            }}
            transition={{ duration: 0.7 }}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent">
              <div className="mx-auto max-w-7xl px-4 h-full flex items-center">
                <motion.div
                  className="max-w-xl text-white"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{
                    opacity: currentBanner === index ? 1 : 0,
                    x: currentBanner === index ? 0 : -50,
                  }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <h1 className="mb-4 text-5xl text-white">{banner.title}</h1>
                  <p className="mb-8 text-xl text-white/90">{banner.subtitle}</p>
                  <Link to={banner.link}>
                    <Button size="lg">
                      Shop Now <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}

        <button
          onClick={prevBanner}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextBanner}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 rounded-full transition-all ${
                currentBanner === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.link}
              className="group block overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="text-sm">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-warning/10 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2>Deals of the Day</h2>
              <p className="text-muted-foreground">Limited time offers</p>
            </div>
            <Link to="/products/deals" className="text-primary hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2>Trending Products</h2>
            <p className="text-muted-foreground">Most popular this week</p>
          </div>
          <Link to="/products/trending" className="text-primary hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-white">Join ShopEase Premium</h2>
          <p className="mb-8 text-xl text-white/90">
            Get free shipping, exclusive deals, and early access to sales
          </p>
          <Button variant="secondary" size="lg">
            Learn More
          </Button>
        </div>
      </section>
    </div>
  );
}
