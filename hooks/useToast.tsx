import { useState } from 'react';

type ToastConfig = {
  title: string;
  description: string;
  variant: 'success' | 'error' | 'info';
};

export const useToast = () => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const showToast = (config: ToastConfig) => {
    setToastConfig(config);
  };

  const hideToast = () => {
    setToastConfig(null);
  };

  return { toastConfig, showToast, hideToast };
};