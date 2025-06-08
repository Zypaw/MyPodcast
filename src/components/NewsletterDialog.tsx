import React, { useState } from 'react';
import { X, Mail } from 'lucide-react';

interface NewsletterDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewsletterDialog: React.FC<NewsletterDialogProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const response = await fetch('http://podcast.matteodupond.fr:3001/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing!');
        setEmail('');
        // Close the dialog after a short delay on success
        setTimeout(() => {
          onClose();
          setMessage('');
        }, 2000);
      } else {
        setIsError(true);
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('Failed to connect to the server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-neutral-900 rounded-2xl p-8 max-w-lg w-full mx-4 relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">Subscribe to Our Podcast</h2>
          <p className="text-neutral-300">
            Get notified about new episodes and exclusive content directly in your inbox.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-primary-600 hover:bg-primary-500 text-white font-medium py-4 px-8 rounded-xl transition-colors duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Subscribing...' : 'Subscribe Now'}
          </button>

          {message && (
            <p
              className={`text-sm text-center ${
                isError ? 'text-red-500' : 'text-green-500'
              }`}
            >
              {message}
            </p>
          )}

          <p className="text-sm text-neutral-500 text-center">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </div>
  );
};

export default NewsletterDialog; 