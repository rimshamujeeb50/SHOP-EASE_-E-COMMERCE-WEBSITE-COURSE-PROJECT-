import { useState } from 'react';
import { Link } from 'react-router';
import Button from '../components/Button';
import Input from '../components/Input';
import { Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password reset requested for:', email);
    setSent(true);
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="mb-2">Reset Password</h1>
          <p className="text-muted-foreground">
            {sent
              ? 'Check your email for reset instructions'
              : 'Enter your email to receive reset instructions'}
          </p>
        </div>

        <div className="rounded-lg border border-border bg-card p-8">
          {!sent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-3 top-[42px] h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  label="Email Address"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>

              <Button type="submit" fullWidth>
                Send Reset Link
              </Button>

              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                <Mail className="h-8 w-8 text-success" />
              </div>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <strong>{email}</strong>. Please check
                your inbox and follow the instructions.
              </p>
              <Button onClick={() => setSent(false)} variant="outline" fullWidth>
                Try Another Email
              </Button>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 text-sm text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
