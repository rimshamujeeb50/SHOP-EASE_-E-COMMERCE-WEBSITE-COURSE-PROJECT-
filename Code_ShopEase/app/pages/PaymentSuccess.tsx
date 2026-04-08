import { Link } from 'react-router';
import { CheckCircle, Download, Home } from 'lucide-react';
import Button from '../components/Button';

export default function PaymentSuccess() {
  const orderDetails = {
    orderId: 'OD' + Math.random().toString(36).substr(2, 9).toUpperCase(),
    date: new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    amount: 152898,
    deliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-success/10">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
        </div>

        <h1 className="mb-2">Order Placed Successfully!</h1>
        <p className="mb-8 text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed.
        </p>

        <div className="mb-8 rounded-lg border border-border bg-card p-6 text-left">
          <h2 className="mb-4">Order Details</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-mono">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span>{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Amount</span>
              <span className="text-lg">₹{orderDetails.amount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expected Delivery</span>
              <span className="text-success">{orderDetails.deliveryDate}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders">
            <Button size="lg">Track Order</Button>
          </Link>
          <Button size="lg" variant="outline">
            <Download className="h-5 w-5" />
            Download Invoice
          </Button>
          <Link to="/">
            <Button size="lg" variant="ghost">
              <Home className="h-5 w-5" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        <div className="mt-8 rounded-lg bg-primary/5 p-4 text-sm">
          <p className="text-muted-foreground">
            A confirmation email has been sent to your registered email address
          </p>
        </div>
      </div>
    </div>
  );
}
