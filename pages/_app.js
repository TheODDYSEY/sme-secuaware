import '../styles/globals.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Ensure we're on the client side
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (payload.exp && payload.exp < currentTime) {
          localStorage.removeItem('token');
          setUser(null);
        } else {
          setUser(payload);
        }
      } catch (error) {
        console.error('Token parsing error:', error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, [isHydrated]);

  const login = (token, userData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      setUser(userData);
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      setUser(null);
      router.push('/login');
    }
  };

  const authContext = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  // Show loading only on initial hydration
  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <Component {...pageProps} auth={authContext} />;
}