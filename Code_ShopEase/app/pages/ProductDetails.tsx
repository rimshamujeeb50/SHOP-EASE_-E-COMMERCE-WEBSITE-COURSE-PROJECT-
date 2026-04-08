import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Star, Heart, ShoppingCart, ZoomIn, Truck, Shield, RotateCcw } from 'lucide-react';
import Button from '../components/Button';
import ProductCard from '../components/ProductCard';

const productImages = [
  'https://images.unsplash.com/photo-1758186374131-d542d2beae0c?w=800',
  'https://images.unsplash.com/photo-1761877945239-4d15febdeddb?w=800',
  'https://images.unsplash.com/photo-1761641466573-f240b6e446de?w=800',
  'https://images.unsplash.com/photo-1760587162690-95608c8ab2da?w=800',
];

const reviews = [
  {
    id: 1,
    user: 'Rajesh Kumar',
    rating: 5,
    date: '2026-03-15',
    comment: 'Excellent product! Highly recommended. The quality is outstanding.',
    verified: true,
  },
  {
    id: 2,
    user: 'Priya Sharma',
    rating: 4,
    date: '2026-03-10',
    comment: 'Good product but delivery was slightly delayed.',
    verified: true,
  },
  {
    id: 3,
    user: 'Amit Patel',
    rating: 5,
    date: '2026-03-05',
    comment: 'Worth every penny! Amazing build quality.',
    verified: false,
  },
];

const relatedProducts = [
  {
    id: '10',
    name: 'Wireless Earbuds Pro',
    price: 8999,
    originalPrice: 14999,
    discount: 40,
    rating: 4.4,
    reviews: 1234,
    image: 'https://images.unsplash.com/photo-1761641466573-f240b6e446de?w=400',
  },
  {
    id: '11',
    name: 'Smart Watch Ultra',
    price: 32999,
    originalPrice: 45999,
    discount: 28,
    rating: 4.6,
    reviews: 876,
    image: 'https://images.unsplash.com/photo-1760520338238-4137dd2dc28f?w=400',
  },
  {
    id: '12',
    name: 'Tablet Pro 11"',
    price: 54999,
    originalPrice: 69999,
    discount: 21,
    rating: 4.7,
    reviews: 543,
    image: 'https://images.unsplash.com/photo-1636614597280-3dde89cbd6cc?w=400',
  },
  {
    id: '13',
    name: 'Bluetooth Speaker',
    price: 5999,
    originalPrice: 9999,
    discount: 40,
    rating: 4.3,
    reviews: 2341,
    image: 'https://images.unsplash.com/photo-1627704671340-0969d7dbac25?w=400',
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div>
          <div className="sticky top-24">
            <div className="relative mb-4 overflow-hidden rounded-lg border border-border bg-muted aspect-square">
              <img
                src={productImages[selectedImage]}
                alt="Product"
                className="h-full w-full object-cover cursor-zoom-in"
                onClick={() => setShowZoom(true)}
              />
              <button className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
                <ZoomIn className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`overflow-hidden rounded-md border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="aspect-square object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h1 className="mb-2">iPhone 15 Pro Max - 256GB</h1>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex items-center gap-1 rounded bg-success px-2 py-1">
              <span className="text-sm text-success-foreground">4.5</span>
              <Star className="h-4 w-4 fill-success-foreground text-success-foreground" />
            </div>
            <span className="text-sm text-muted-foreground">2,453 ratings & 342 reviews</span>
          </div>

          <div className="mb-6 rounded-lg bg-success/10 p-4">
            <div className="mb-2 flex items-baseline gap-3">
              <span className="text-3xl text-foreground">₹134,900</span>
              <span className="text-xl text-muted-foreground line-through">₹159,900</span>
              <span className="text-lg text-success">15% off</span>
            </div>
            <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
          </div>

          <div className="mb-6 space-y-4">
            <div>
              <h3 className="mb-2">Color</h3>
              <div className="flex gap-2">
                {['#000000', '#0066cc', '#ffffff', '#ff0000'].map((color) => (
                  <button
                    key={color}
                    className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2">Storage</h3>
              <div className="flex gap-2">
                {['128GB', '256GB', '512GB', '1TB'].map((storage) => (
                  <button
                    key={storage}
                    className={`rounded-md border px-4 py-2 transition-colors ${
                      storage === '256GB'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {storage}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2">Quantity</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-muted"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="h-10 w-16 rounded-md border border-border bg-background text-center focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-border hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="mb-6 flex gap-3">
            <Button size="lg" className="flex-1" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button size="lg" variant="secondary" onClick={() => navigate('/checkout')}>
              Buy Now
            </Button>
            <Button size="lg" variant="outline">
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-3 rounded-lg border border-border p-4">
            <div className="flex items-center gap-3">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">Free Delivery</p>
                <p className="text-xs text-muted-foreground">On orders above ₹500</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RotateCcw className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">7 Days Replacement</p>
                <p className="text-xs text-muted-foreground">Easy returns & exchanges</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm">1 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Manufacturer warranty included</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-12 rounded-lg border border-border p-6">
        <h2 className="mb-4">Product Description</h2>
        <div className="space-y-4 text-muted-foreground">
          <p>
            Experience the pinnacle of smartphone technology with the iPhone 15 Pro Max. Featuring
            the revolutionary A17 Pro chip, titanium design, and advanced camera system.
          </p>
          <h3>Key Features:</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>6.7-inch Super Retina XDR display with ProMotion</li>
            <li>A17 Pro chip with 6-core GPU for incredible performance</li>
            <li>Pro camera system with 48MP main camera</li>
            <li>Action button for quick access to favorite features</li>
            <li>Up to 29 hours video playback</li>
            <li>Aerospace-grade titanium design</li>
          </ul>
        </div>
      </div>

      <div className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2>Ratings & Reviews</h2>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="mb-6 rounded-lg border border-border p-6">
          <div className="flex items-center gap-8">
            <div className="text-center">
              <div className="mb-2 text-5xl">4.5</div>
              <div className="mb-1 flex items-center justify-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= 4
                        ? 'fill-warning text-warning'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">2,453 ratings</p>
            </div>
            <div className="flex-1 space-y-2">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-sm w-4">{star}★</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-warning"
                      style={{ width: `${Math.random() * 80 + 20}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-border p-4">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    {review.user[0]}
                  </div>
                  <div>
                    <p className="text-sm">{review.user}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="rounded bg-success/10 px-2 py-1 text-xs text-success">
                    Verified Purchase
                  </span>
                )}
              </div>
              <div className="mb-2 flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= review.rating
                        ? 'fill-warning text-warning'
                        : 'fill-muted text-muted'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-6">Related Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      {showZoom && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setShowZoom(false)}
        >
          <img
            src={productImages[selectedImage]}
            alt="Zoomed product"
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
