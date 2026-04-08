import { Heart } from 'lucide-react';
import { Link } from 'react-router';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const wishlistItems = [
  {
    id: '20',
    name: 'Premium Leather Jacket',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.3,
    reviews: 567,
    image: 'https://images.unsplash.com/photo-1629373915883-944ae752da19?w=400',
  },
  {
    id: '21',
    name: 'Designer Watch',
    price: 12499,
    originalPrice: 19999,
    discount: 37,
    rating: 4.6,
    reviews: 892,
    image: 'https://images.unsplash.com/photo-1760520338238-4137dd2dc28f?w=400',
  },
  {
    id: '22',
    name: 'Modern Armchair',
    price: 15999,
    originalPrice: 24999,
    discount: 36,
    rating: 4.4,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=400',
  },
  {
    id: '23',
    name: 'Wireless Earbuds',
    price: 7999,
    originalPrice: 12999,
    discount: 38,
    rating: 4.2,
    reviews: 2876,
    image: 'https://images.unsplash.com/photo-1761641466573-f240b6e446de?w=400',
  },
];

export default function Wishlist() {
  if (wishlistItems.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center py-16">
          <div className="mb-4 text-6xl">❤️</div>
          <h2 className="mb-2">Your wishlist is empty</h2>
          <p className="mb-6 text-muted-foreground">Save items you love for later</p>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1>My Wishlist ({wishlistItems.length} items)</h1>
        <Button variant="outline">Clear All</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlistItems.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard {...product} />
            <button className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md hover:bg-red-50 transition-colors">
              <Heart className="h-5 w-5 fill-red-500 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
