import { useState } from 'react';
import { useNavigate } from 'react-router';
import { MapPin, Plus, CreditCard, Wallet, Banknote } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const savedAddresses = [
  {
    id: '1',
    type: 'Home',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    address: '123, MG Road, Bangalore, Karnataka - 560001',
    default: true,
  },
  {
    id: '2',
    type: 'Work',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    address: '456, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
    default: false,
  },
];

const cartItems = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max - 256GB',
    price: 134900,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=200',
  },
  {
    id: '2',
    name: 'Wireless Earbuds Pro',
    price: 8999,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1761641466573-f240b6e446de?w=200',
  },
];

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const handlePlaceOrder = () => {
    navigate('/payment-success');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6">Checkout</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className={step >= 1 ? 'text-foreground' : 'text-muted-foreground'}>
                1. Delivery Address
              </h2>
              {step > 1 && (
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-primary hover:underline"
                >
                  Change
                </button>
              )}
            </div>

            {step === 1 && (
              <div className="space-y-4">
                {savedAddresses.map((address) => (
                  <label
                    key={address.id}
                    className={`block cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                      selectedAddress === address.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="address"
                      value={address.id}
                      checked={selectedAddress === address.id}
                      onChange={(e) => setSelectedAddress(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-muted text-xs">
                            {address.type}
                          </span>
                          {address.default && (
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-xs text-primary">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="mb-1">{address.name}</p>
                        <p className="text-sm text-muted-foreground">{address.address}</p>
                        <p className="text-sm text-muted-foreground">{address.phone}</p>
                      </div>
                    </div>
                  </label>
                ))}

                {!showAddAddress ? (
                  <button
                    onClick={() => setShowAddAddress(true)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 text-primary hover:border-primary hover:bg-primary/5 transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                    Add New Address
                  </button>
                ) : (
                  <div className="rounded-lg border border-border p-4 space-y-4">
                    <h3>Add New Address</h3>
                    <Input label="Full Name" placeholder="Enter your name" />
                    <Input label="Phone Number" placeholder="+91 98765 43210" />
                    <Input label="Pincode" placeholder="560001" />
                    <Input label="Address" placeholder="House No., Street Name" />
                    <Input label="City" placeholder="Bangalore" />
                    <Input label="State" placeholder="Karnataka" />
                    <div className="flex gap-2">
                      <Button onClick={() => setShowAddAddress(false)}>Save Address</Button>
                      <Button variant="outline" onClick={() => setShowAddAddress(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                <Button onClick={() => setStep(2)} fullWidth>
                  Deliver Here
                </Button>
              </div>
            )}

            {step > 1 && (
              <div className="text-sm text-muted-foreground">
                {savedAddresses.find((a) => a.id === selectedAddress)?.address}
              </div>
            )}
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <h2
              className={`mb-4 ${
                step >= 2 ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              2. Payment Method
            </h2>

            {step === 2 && (
              <div className="space-y-4">
                <label
                  className={`block cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p>Credit / Debit Card</p>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, Amex, Rupay
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`block cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                    paymentMethod === 'upi'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p>UPI</p>
                      <p className="text-sm text-muted-foreground">
                        Google Pay, PhonePe, Paytm
                      </p>
                    </div>
                  </div>
                </label>

                <label
                  className={`block cursor-pointer rounded-lg border-2 p-4 transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-3">
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p>Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive
                      </p>
                    </div>
                  </div>
                </label>

                <Button onClick={handlePlaceOrder} fullWidth disabled={!paymentMethod}>
                  Place Order
                </Button>
              </div>
            )}

            {step > 2 && paymentMethod && (
              <div className="text-sm text-muted-foreground">
                {paymentMethod === 'card' && 'Credit / Debit Card'}
                {paymentMethod === 'upi' && 'UPI'}
                {paymentMethod === 'cod' && 'Cash on Delivery'}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-lg border border-border bg-card p-4">
            <h3 className="mb-4">Order Summary</h3>

            <div className="mb-4 space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-md object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{item.name}</p>
                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    <p className="text-sm">₹{item.price.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className="text-success">FREE</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between text-lg">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 rounded-lg bg-success/10 p-3 text-sm text-success">
              You're saving ₹18,000 on this order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
