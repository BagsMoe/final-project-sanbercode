import { useEffect, useState } from 'react';

type ToastProps = {
  title: string;
  description: string;
  variant: 'success' | 'error' | 'info';
  onClose?: () => void;
};

export const Toast = ({ title, description, variant, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const variantStyles = {
    success: 'bg-green-500 border-green-600',
    error: 'bg-red-500 border-red-600',
    info: 'bg-blue-500 border-blue-600',
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`${variantStyles[variant]} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-4 border`}>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="hover:bg-white/10 p-1 rounded-full"
        >
          &times;
        </button>
      </div>
    </div>
  );
};