import { Link } from 'react-router';
import { Package, Truck, CheckCircle, X } from 'lucide-react';
import Button from '../components/Button';

const orders = [
  {
    id: 'OD123456',
    date: '2026-04-05',
    status: 'Delivered',
    total: 152898,
    items: [
      {
        name: 'iPhone 15 Pro Max - 256GB',
        price: 134900,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=200',
      },
    ],
    deliveredDate: '2026-04-07',
  },
  {
    id: 'OD123455',
    date: '2026-03-28',
    status: 'In Transit',
    total: 32999,
    items: [
      {
        name: 'Smart Watch Ultra',
        price: 32999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1760520338238-4137dd2dc28f?w=200',
      },
    ],
    expectedDate: '2026-04-10',
  },
  {
    id: 'OD123454',
    date: '2026-03-20',
    status: 'Cancelled',
    total: 15999,
    items: [
      {
        name: 'Modern Armchair',
        price: 15999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=200',
      },
    ],
  },
];

export default function Orders() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'text-success';
      case 'In Transit':
        return 'text-primary';
      case 'Cancelled':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <CheckCircle className="h-5 w-5" />;
      case 'In Transit':
        return <Truck className="h-5 w-5" />;
      case 'Cancelled':
        return <X className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
              <div>
                <p className="mb-1 text-sm text-muted-foreground">Order ID: {order.id}</p>
                <p className="text-sm text-muted-foreground">
                  Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className={`flex items-center gap-2 ${getStatusColor(order.status)}`}>
                {getStatusIcon(order.status)}
                <span>{order.status}</span>
              </div>
            </div>

            {order.items.map((item, index) => (
              <div key={index} className="flex gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-20 w-20 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                  <p className="text-sm">₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Amount</p>
                <p className="text-lg">₹{order.total.toLocaleString()}</p>
                {order.status === 'In Transit' && order.expectedDate && (
                  <p className="text-sm text-success mt-1">
                    Expected by {new Date(order.expectedDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                )}
                {order.status === 'Delivered' && order.deliveredDate && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Delivered on {new Date(order.deliveredDate).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                    })}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                {order.status === 'In Transit' && (
                  <Button variant="outline">Track Order</Button>
                )}
                {order.status === 'Delivered' && (
                  <>
                    <Button variant="outline">Return</Button>
                    <Button variant="outline">Review</Button>
                  </>
                )}
                <Link to={`/product/${order.items[0].name}`}>
                  <Button variant="outline">Buy Again</Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <Package className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="mb-2">No orders yet</h2>
          <p className="mb-6 text-muted-foreground">Start shopping to see your orders here</p>
          <Link to="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
