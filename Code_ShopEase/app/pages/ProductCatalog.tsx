import { useState } from 'react';
import { useParams } from 'react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';

const allProducts = Array.from({ length: 24 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Product ${i + 1}`,
  price: Math.floor(Math.random() * 50000) + 5000,
  originalPrice: Math.floor(Math.random() * 70000) + 10000,
  discount: Math.floor(Math.random() * 50) + 10,
  rating: (Math.random() * 2 + 3).toFixed(1),
  reviews: Math.floor(Math.random() * 5000) + 100,
  image: `https://images.unsplash.com/photo-${
    [
      '1758186374131-d542d2beae0c',
      '1636614223954-db6a663293ef',
      '1630148198235-6bd561ba72a4',
      '1641839629833-4838a270e2ce',
      '1567016526105-22da7c13161a',
      '1760587162690-95608c8ab2da',
    ][i % 6]
  }?w=400`,
}));

export default function ProductCatalog() {
  const { category } = useParams();
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');

  const brands = ['Apple', 'Samsung', 'Sony', 'LG', 'Nike', 'Adidas', 'Puma'];

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <h1 className="mb-2 capitalize">{category?.replace(/-/g, ' ')}</h1>
        <p className="text-muted-foreground">{allProducts.length} products found</p>
      </div>

      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="w-full"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters & Sort
        </Button>
      </div>

      <div className="flex gap-6">
        <aside
          className={`${
            showFilters ? 'fixed inset-0 z-50 bg-background p-4 overflow-y-auto' : 'hidden'
          } lg:block lg:sticky lg:top-24 lg:h-fit lg:w-64 lg:shrink-0`}
        >
          {showFilters && (
            <div className="mb-4 flex items-center justify-between lg:hidden">
              <h2>Filters</h2>
              <button onClick={() => setShowFilters(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹0</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="rounded-full"
                    />
                    <span>{rating}★ & above</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="rounded"
                    />
                    <span>{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-3">Discount</h3>
              <div className="space-y-2">
                {['50% or more', '40% or more', '30% or more', '20% or more', '10% or more'].map(
                  (discount) => (
                    <label key={discount} className="flex items-center gap-2 text-sm cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span>{discount}</span>
                    </label>
                  )
                )}
              </div>
            </div>

            <div>
              <h3 className="mb-3">Availability</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>In Stock</span>
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" className="rounded" />
                  <span>Include Out of Stock</span>
                </label>
              </div>
            </div>

            {showFilters && (
              <div className="lg:hidden pt-4 border-t border-border">
                <Button onClick={() => setShowFilters(false)} fullWidth>
                  Apply Filters
                </Button>
              </div>
            )}
          </div>
        </aside>

        <div className="flex-1">
          <div className="mb-4 flex items-center justify-between rounded-lg border border-border bg-card p-4">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="popularity">Popularity</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
              <option value="newest">Newest First</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
                rating={parseFloat(product.rating)}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`flex h-10 w-10 items-center justify-center rounded-md border ${
                  page === 1
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-background hover:bg-muted'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
