import Layout from '../components/Layout';
import EducationCenter from '../components/EducationCenter';

export default function EducationPage({ auth }) {
  if (auth.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Please log in to access the education center.</p>
        </div>
      </div>
    );
  }

  return (
    <Layout auth={auth}>
      <EducationCenter />
    </Layout>
  );
}