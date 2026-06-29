import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
  duration?: number;
}

interface ToastState {
  toasts: (Toast & { id: string })[];
}

let toastCount = 0;
const toastListeners: Set<(state: ToastState) => void> = new Set();
let toastState: ToastState = { toasts: [] };

const addToastListener = (listener: (state: ToastState) => void) => {
  toastListeners.add(listener);
  return () => toastListeners.delete(listener);
};

const notifyListeners = () => {
  toastListeners.forEach((listener) => listener(toastState));
};

export function useToast() {
  const [, setToasts] = useState<ToastState['toasts']>([]);

  const toast = (props: Toast) => {
    const id = String(toastCount++);
    const newToast = { ...props, id };

    toastState.toasts.push(newToast);
    setToasts([...toastState.toasts]);
    notifyListeners();

    const duration = props.duration || 3000;
    setTimeout(() => {
      toastState.toasts = toastState.toasts.filter((t) => t.id !== id);
      setToasts([...toastState.toasts]);
      notifyListeners();
    }, duration);
  };

  return { toast };
}
