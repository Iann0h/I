'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';

export function useAuth() {
  const router = useRouter();
  const { user, isAuthenticated, setUser, setAuthenticated } = useAppStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/session');
        const data = await response.json();

        if (data.authenticated) {
          setUser(data.user);
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          router.push('/auth/login');
        }
      } catch (error) {
        setAuthenticated(false);
        router.push('/auth/login');
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch('/api/auth/session', { method: 'POST' });
      useAppStore.setState({ user: null, isAuthenticated: false });
      router.push('/auth/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { user, isAuthenticated, logout };
}
