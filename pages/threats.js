import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import ThreatAlerts from '../components/ThreatAlerts';

export default function ThreatsPage({ auth }) {
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/login');
    }
  }, [auth.isAuthenticated, router]);

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <Layout auth={auth}>
      <ThreatAlerts />
    </Layout>
  );
}