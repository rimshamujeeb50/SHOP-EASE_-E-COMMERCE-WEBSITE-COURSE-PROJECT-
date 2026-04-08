import { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router';
import { Search, ShoppingCart, Heart, User, Menu, Bell, Sun, Moon } from 'lucide-react';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const categories = [
    'Electronics',
    'Fashion',
    'Home & Kitchen',
    'Beauty',
    'Sports',
    'Books',
    'Toys',
    'Grocery',
  ];

  return (
    <div className="min-h-screen bg-background">
      <header
        className={`sticky top-0 z-50 w-full border-b border-border bg-primary transition-shadow ${
          isScrolled ? 'shadow-md' : ''
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center gap-4 lg:gap-8">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <ShoppingCart className="h-7 w-7 text-primary-foreground" />
              <span className="text-2xl font-bold text-primary-foreground">ShopEase</span>
            </Link>

            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
              <div className="relative flex-1">
                <input
                  type="search"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-l-md border-0 bg-white px-4 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 flex h-10 items-center justify-center rounded-r-md bg-white px-4 hover:bg-gray-50"
                >
                  <Search className="h-5 w-5 text-primary" />
                </button>
              </div>
            </form>

            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={() => setIsDark(!isDark)}
                className="hidden lg:flex h-10 w-10 items-center justify-center rounded-full text-primary-foreground hover:bg-primary-foreground/10"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              <Link
                to="/account"
                className="hidden lg:flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>

              <Link
                to="/wishlist"
                className="hidden lg:flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md relative"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>

              <Link
                to="/cart"
                className="flex items-center gap-2 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md relative"
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden lg:inline">Cart</span>
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-warning text-xs text-warning-foreground">
                  3
                </span>
              </Link>

              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="lg:hidden flex h-10 w-10 items-center justify-center text-primary-foreground"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>

          <form onSubmit={handleSearch} className="md:hidden mt-3">
            <div className="relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-md bg-white px-4 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-primary" />
              </button>
            </div>
          </form>
        </div>

        {showMobileMenu && (
          <div className="lg:hidden border-t border-primary-foreground/10 bg-primary">
            <nav className="mx-auto max-w-7xl px-4 py-4 space-y-2">
              <Link
                to="/account"
                className="flex items-center gap-3 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
              <Link
                to="/wishlist"
                className="flex items-center gap-3 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <button
                onClick={() => {
                  setIsDark(!isDark);
                  setShowMobileMenu(false);
                }}
                className="flex items-center gap-3 text-primary-foreground hover:bg-primary-foreground/10 px-3 py-2 rounded-md w-full"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </nav>
          </div>
        )}

        <div className="hidden lg:block border-t border-primary-foreground/10">
          <div className="mx-auto max-w-7xl px-4">
            <nav className="flex items-center gap-8 py-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products/${category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  className="text-sm text-primary-foreground hover:underline"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      <main className="min-h-[calc(100vh-200px)]">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-muted mt-16">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
                <li><Link to="/careers" className="hover:text-foreground">Careers</Link></li>
                <li><Link to="/press" className="hover:text-foreground">Press</Link></li>
                <li><Link to="/blog" className="hover:text-foreground">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Help</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/support" className="hover:text-foreground">Customer Support</Link></li>
                <li><Link to="/shipping" className="hover:text-foreground">Shipping Info</Link></li>
                <li><Link to="/returns" className="hover:text-foreground">Returns</Link></li>
                <li><Link to="/faq" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Policy</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground">Terms of Use</Link></li>
                <li><Link to="/security" className="hover:text-foreground">Security</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4">Social</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Facebook</a></li>
                <li><a href="#" className="hover:text-foreground">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground">Instagram</a></li>
                <li><a href="#" className="hover:text-foreground">LinkedIn</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2026 ShopEase. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Link
        to="/support"
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-transform hover:scale-110"
      >
        <Bell className="h-6 w-6" />
      </Link>
    </div>
  );
}
