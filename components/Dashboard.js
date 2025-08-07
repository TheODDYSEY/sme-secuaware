import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  AlertTriangle,
  BookOpen,
  TrendingUp,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export default function Dashboard({ auth }) {
  const [threats, setThreats] = useState([]);
  const [recentAssessment, setRecentAssessment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if user is authenticated
    if (auth && auth.isAuthenticated && !auth.loading) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [auth]);

  const fetchDashboardData = async () => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
        setLoading(false);
        return;
      }
      
      // Fetch threats with timeout
      const threatsPromise = fetch('/api/threats', {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 10000 // 10 second timeout
      });
      
      // Fetch recent assessment with timeout  
      const assessmentPromise = fetch('/api/assessment', {
        headers: { 'Authorization': `Bearer ${token}` },
        timeout: 10000
      });

      // Use Promise.allSettled to handle partial failures
      const [threatsResult, assessmentResult] = await Promise.allSettled([
        threatsPromise,
        assessmentPromise
      ]);

      // Handle threats response
      if (threatsResult.status === 'fulfilled' && threatsResult.value.ok) {
        const threatsData = await threatsResult.value.json();
        setThreats(threatsData.threats?.slice(0, 3) || []);
      } else {
        console.warn('Failed to fetch threats:', threatsResult.reason);
      }

      // Handle assessment response
      if (assessmentResult.status === 'fulfilled' && assessmentResult.value.ok) {
        const assessmentData = await assessmentResult.value.json();
        setRecentAssessment(assessmentData.assessments?.[0] || null);
      } else {
        console.warn('Failed to fetch assessment:', assessmentResult.reason);
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-danger-600';
  };

  const getScoreBg = (score) => {
    if (score >= 80) return 'bg-success-50 border-success-200';
    if (score >= 60) return 'bg-warning-50 border-warning-200';
    return 'bg-danger-50 border-danger-200';
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-danger-600 bg-danger-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'medium': return 'text-warning-600 bg-warning-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Show error state
  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-danger-50 border border-danger-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-danger-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-danger-900 mb-2">Dashboard Error</h3>
          <p className="text-danger-700 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  // Ensure we have auth data
  if (!auth || !auth.user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-warning-50 border border-warning-200 rounded-lg p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-warning-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-warning-900 mb-2">Authentication Required</h3>
          <p className="text-warning-700 mb-4">Please log in to view your dashboard.</p>
          <Link href="/login" className="btn-primary">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Security Dashboard</h1>
        <p className="text-gray-600">Monitor your cybersecurity posture and stay protected</p>
      </div>

      {/* Security Score Card */}
      <div className={`card ${getScoreBg(auth.user?.securityScore || 0)}`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Current Security Score</h3>
            <p className="text-gray-600 mt-1">
              {recentAssessment ? 
                `Last assessed ${new Date(recentAssessment.completedAt).toLocaleDateString()}` :
                'Complete your first assessment to get your score'
              }
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${getScoreColor(auth.user?.securityScore || 0)}`}>
              {auth.user?.securityScore || 0}/100
            </div>
            {!recentAssessment && (
              <Link href="/assessment" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                Take Assessment →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="bg-primary-100 p-3 rounded-lg">
              <Shield className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Protection Status</p>
              <p className="text-lg font-semibold text-gray-900">
                {auth.user?.securityScore >= 60 ? 'Protected' : 'At Risk'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-danger-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-danger-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Threats</p>
              <p className="text-lg font-semibold text-gray-900">{threats.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-success-100 p-3 rounded-lg">
              <CheckCircle className="h-6 w-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Last Assessment</p>
              <p className="text-lg font-semibold text-gray-900">
                {recentAssessment ? 'Complete' : 'Pending'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="bg-warning-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Risk Level</p>
              <p className="text-lg font-semibold text-gray-900 capitalize">
                {recentAssessment?.riskLevel || 'Unknown'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Threats */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Threat Alerts</h3>
          <Link href="/threats" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            View All →
          </Link>
        </div>
        
        {threats.length > 0 ? (
          <div className="space-y-4">
            {threats.map((threat) => (
              <div key={threat._id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-danger-500 mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-1">
                    <h4 className="font-medium text-gray-900 truncate">{threat.title}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{threat.description}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(threat.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No active threats detected</p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/assessment" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <Shield className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Security Assessment</h3>
            <p className="text-sm text-gray-600">Evaluate your current security posture</p>
          </div>
        </Link>

        <Link href="/education" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <BookOpen className="h-12 w-12 text-success-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Learn & Improve</h3>
            <p className="text-sm text-gray-600">Access cybersecurity resources</p>
          </div>
        </Link>

        <Link href="/threats" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="text-center">
            <AlertTriangle className="h-12 w-12 text-warning-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Threat Center</h3>
            <p className="text-sm text-gray-600">Stay updated on latest threats</p>
          </div>
        </Link>
      </div>
    </div>
  );
}