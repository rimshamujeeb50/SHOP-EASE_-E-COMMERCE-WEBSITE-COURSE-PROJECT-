import { useState } from 'react';
import { Link } from 'react-router';
import { User, MapPin, Lock, Phone, Mail } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

export default function Account() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-6">My Account</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <aside className="md:col-span-1">
          <nav className="space-y-1 rounded-lg border border-border bg-card p-2">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                activeTab === 'profile'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <User className="h-5 w-5" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                activeTab === 'addresses'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <MapPin className="h-5 w-5" />
              Addresses
            </button>
            <Link
              to="/orders"
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Orders
            </Link>
            <button
              onClick={() => setActiveTab('password')}
              className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-left transition-colors ${
                activeTab === 'password'
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <Lock className="h-5 w-5" />
              Password
            </button>
          </nav>
        </aside>

        <div className="md:col-span-3">
          {activeTab === 'profile' && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-6">Personal Information</h2>
              <form className="space-y-4">
                <Input label="Full Name" defaultValue="Rajesh Kumar" />
                <Input label="Email" type="email" defaultValue="rajesh@example.com" />
                <Input label="Phone" defaultValue="+91 98765 43210" />
                <div className="flex gap-3">
                  <Button>Save Changes</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="rounded-lg border border-border bg-card p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2>Saved Addresses</h2>
                <Button>Add New Address</Button>
              </div>
              <div className="space-y-4">
                {[
                  {
                    type: 'Home',
                    address: '123, MG Road, Bangalore, Karnataka - 560001',
                    default: true,
                  },
                  {
                    type: 'Work',
                    address: '456, Tech Park, Whitefield, Bangalore, Karnataka - 560066',
                    default: false,
                  },
                ].map((addr, i) => (
                  <div key={i} className="rounded-lg border border-border p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-muted text-xs">{addr.type}</span>
                      {addr.default && (
                        <span className="px-2 py-0.5 rounded bg-primary/10 text-xs text-primary">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mb-3 text-sm text-muted-foreground">{addr.address}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Edit
                      </Button>
                      <Button size="sm" variant="outline">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'password' && (
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="mb-6">Change Password</h2>
              <form className="space-y-4">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm New Password" type="password" />
                <div className="flex gap-3">
                  <Button>Update Password</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
