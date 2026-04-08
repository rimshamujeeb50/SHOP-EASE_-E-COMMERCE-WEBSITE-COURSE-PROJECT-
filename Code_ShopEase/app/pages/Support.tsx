import { useState } from 'react';
import { Send, X } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';

const faqs = [
  {
    question: 'What is your return policy?',
    answer: 'We offer a 7-day return policy on most products. Items must be unused and in original packaging.',
  },
  {
    question: 'How long does delivery take?',
    answer: 'Standard delivery takes 3-5 business days. Express delivery is available for select locations.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Currently, we only ship within India. International shipping will be available soon.',
  },
  {
    question: 'How can I track my order?',
    answer: 'You can track your order from the Orders section in your account. A tracking link is also sent via email.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept Credit/Debit Cards, UPI, Net Banking, and Cash on Delivery.',
  },
];

const messages = [
  { id: 1, text: 'Hello! How can I help you today?', sender: 'support', time: '10:30 AM' },
];

export default function Support() {
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState(messages);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = () => {
    if (inputMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          text: inputMessage,
          sender: 'user',
          time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setInputMessage('');

      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: 'Thank you for your message. Our team will respond shortly.',
            sender: 'support',
            time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-6">Customer Support</h1>

      <div className="mb-8 rounded-lg border border-border bg-card p-6">
        <h2 className="mb-4">Get Help</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <button
            onClick={() => setShowChat(true)}
            className="rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
          >
            <div className="mb-2 text-2xl">💬</div>
            <h3 className="mb-1">Live Chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our support team</p>
          </button>
          <a
            href="mailto:support@shopease.com"
            className="rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
          >
            <div className="mb-2 text-2xl">📧</div>
            <h3 className="mb-1">Email Us</h3>
            <p className="text-sm text-muted-foreground">support@shopease.com</p>
          </a>
          <a
            href="tel:+911800123456"
            className="rounded-lg border border-border p-4 text-left hover:bg-muted transition-colors"
          >
            <div className="mb-2 text-2xl">📞</div>
            <h3 className="mb-1">Call Us</h3>
            <p className="text-sm text-muted-foreground">1800-123-456</p>
          </a>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h2 className="mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="group rounded-lg border border-border p-4">
              <summary className="cursor-pointer list-none font-medium">
                {faq.question}
              </summary>
              <p className="mt-3 text-sm text-muted-foreground">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>

      {showChat && (
        <div className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b border-border bg-primary px-4 py-3 text-primary-foreground rounded-t-lg">
            <h3>Customer Support</h3>
            <button onClick={() => setShowChat(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-lg px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="mt-1 text-xs opacity-70">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage();
                  }
                }}
                className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={sendMessage}
                className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
