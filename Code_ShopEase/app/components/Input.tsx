import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-foreground">{label}</label>}
      <input
        className={`h-10 w-full rounded-md border border-border bg-input-background px-3 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}
