import { useState } from 'react';
import { useSearchParams } from 'react-router';
import { X } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const searchResults = [
  {
    id: '30',
    name: 'iPhone 15 Pro Max',
    price: 134900,
    originalPrice: 159900,
    discount: 15,
    rating: 4.5,
    reviews: 2453,
    image: 'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=400',
  },
  {
    id: '31',
    name: 'MacBook Pro 14"',
    price: 189900,
    originalPrice: 209900,
    discount: 10,
    rating: 4.8,
    reviews: 1876,
    image: 'https://images.unsplash.com/photo-1636614223954-db6a663293ef?w=400',
  },
];

const recentSearches = ['iPhone', 'Laptop', 'Headphones', 'Watch'];
const trendingSearches = ['iPhone 15', 'Samsung TV', 'Nike Shoes', 'PlayStation 5'];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);

  const handleSearch = (term: string) => {
    setInputValue(term);
    setSearchParams({ q: term });
  };

  const clearSearch = () => {
    setInputValue('');
    setSearchParams({});
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-6">
        <div className="relative">
          <input
            type="search"
            placeholder="Search for products..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && inputValue) {
                handleSearch(inputValue);
              }
            }}
            className="h-12 w-full rounded-lg border border-border bg-background px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {inputValue && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>

      {!query ? (
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="mb-4">Recent Searches</h2>
            <div className="space-y-2">
              {recentSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="flex w-full items-center justify-between rounded-lg border border-border bg-card px-4 py-3 text-left hover:bg-muted transition-colors"
                >
                  <span>{term}</span>
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4">Trending Searches</h2>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="rounded-full border border-border bg-card px-4 py-2 hover:bg-muted transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="mb-6 text-muted-foreground">
            Showing results for <strong>"{query}"</strong> ({searchResults.length} products)
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
