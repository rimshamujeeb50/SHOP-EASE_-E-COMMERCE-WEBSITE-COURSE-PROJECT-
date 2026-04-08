import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import { Mail, Lock, User, Eye, EyeOff, Phone } from 'lucide-react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register:', formData);
    navigate('/');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join ShopEase today</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-[42px] h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                name="name"
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-[42px] h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-3 top-[42px] h-5 w-5 text-muted-foreground" />
              <Input
                type="tel"
                name="phone"
                label="Phone Number"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-[42px] h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="password"
                label="Password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[42px] text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-[42px] h-5 w-5 text-muted-foreground" />
              <Input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="pl-10"
              />
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-0.5 rounded border-border" required />
              <span className="text-muted-foreground">
                I agree to the{' '}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <Button type="submit" fullWidth>
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
