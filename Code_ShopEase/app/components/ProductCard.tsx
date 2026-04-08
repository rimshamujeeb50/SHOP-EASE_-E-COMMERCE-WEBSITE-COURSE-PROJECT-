import { Link } from 'react-router';
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  discount?: number;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  rating,
  reviews,
  image,
  discount,
}: ProductCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="group block overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-shadow"
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 text-sm text-foreground">{name}</h3>
        <div className="mb-2 flex items-center gap-1">
          <div className="flex items-center gap-0.5 rounded bg-success px-1.5 py-0.5">
            <span className="text-xs text-success-foreground">{rating}</span>
            <Star className="h-3 w-3 fill-success-foreground text-success-foreground" />
          </div>
          <span className="text-xs text-muted-foreground">({reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg text-foreground">₹{price.toLocaleString()}</span>
          {originalPrice && (
            <>
              <span className="text-sm text-muted-foreground line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="text-sm text-success">{discount}% off</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
