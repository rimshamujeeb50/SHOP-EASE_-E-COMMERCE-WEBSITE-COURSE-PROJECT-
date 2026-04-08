import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, Tag } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const cartItems = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max - 256GB',
    price: 134900,
    originalPrice: 159900,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=200',
    inStock: true,
  },
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    price: 8999,
    originalPrice: 14999,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1761641466573-f240b6e446de?w=200',
    inStock: true,
  },
  {
    id: '3',
    name: 'Smart Watch Ultra',
    price: 32999,
    originalPrice: 45999,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1760520338238-4137dd2dc28f?w=200',
    inStock: false,
  },
];

export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState(cartItems);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const updateQuantity = (id: string, change: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setAppliedPromo('SAVE10');
    }
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = items.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );
  const discount = appliedPromo ? Math.floor(subtotal * 0.1) : 0;
  const deliveryCharge = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="text-center py-16">
          <div className="mb-4 text-6xl">🛒</div>
          <h2 className="mb-2">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">Add items to get started</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6">Shopping Cart ({items.length} items)</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex gap-4 rounded-lg border border-border bg-card p-4"
            >
              <Link to={`/product/${item.id}`} className="shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-24 w-24 rounded-md object-cover"
                />
              </Link>

              <div className="flex-1">
                <Link to={`/product/${item.id}`}>
                  <h3 className="mb-2 hover:text-primary">{item.name}</h3>
                </Link>

                <div className="mb-3 flex items-center gap-2">
                  <span className="text-lg">₹{item.price.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-success">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                    off
                  </span>
                </div>

                {!item.inStock && (
                  <p className="mb-2 text-sm text-destructive">Out of Stock</p>
                )}

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      disabled={!item.inStock}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      disabled={!item.inStock}
                      className="flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="flex items-center gap-1 text-sm text-destructive hover:underline"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="text-lg">
                  ₹{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          <Link to="/" className="block">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-3">Apply Promo Code</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={applyPromoCode} disabled={!promoCode}>
                  Apply
                </Button>
              </div>
              {appliedPromo && (
                <div className="mt-2 flex items-center gap-2 text-sm text-success">
                  <Tag className="h-4 w-4" />
                  <span>{appliedPromo} applied - ₹{discount.toLocaleString()} off</span>
                </div>
              )}
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="mb-4">Price Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    Price ({items.reduce((sum, item) => sum + item.quantity, 0)} items)
                  </span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-success">
                  <span>Discount</span>
                  <span>-₹{(savings + discount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery Charges</span>
                  <span className={deliveryCharge === 0 ? 'text-success' : ''}>
                    {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge}`}
                  </span>
                </div>
                {deliveryCharge > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add items worth ₹{(500 - subtotal).toLocaleString()} more for free delivery
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between text-lg">
                  <span>Total Amount</span>
                  <span>₹{total.toLocaleString()}</span>
                </div>
                <div className="text-success">
                  You will save ₹{(savings + discount).toLocaleString()} on this order
                </div>
              </div>
            </div>

            <Button
              size="lg"
              fullWidth
              onClick={() => navigate('/checkout')}
              disabled={items.some((item) => !item.inStock)}
            >
              Proceed to Checkout
            </Button>

            {items.some((item) => !item.inStock) && (
              <p className="text-sm text-center text-destructive">
                Remove out of stock items to proceed
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
