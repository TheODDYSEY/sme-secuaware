import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Shield, AlertTriangle, BookOpen, BarChart3, CheckCircle, Users, Globe } from 'lucide-react';

export default function Home({ auth }) {
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (auth.isAuthenticated) {
      router.push('/dashboard');
    }
  }, [auth.isAuthenticated, router]);

  if (auth.isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const features = [
    {
      icon: Shield,
      title: 'Security Assessment',
      description: 'Evaluate your current cybersecurity posture with our comprehensive assessment tool.'
    },
    {
      icon: AlertTriangle,
      title: 'Threat Alerts',
      description: 'Stay informed about the latest cybersecurity threats targeting Kenyan SMEs.'
    },
    {
      icon: BookOpen,
      title: 'Education Center',
      description: 'Learn cybersecurity best practices through our curated educational resources.'
    },
    {
      icon: BarChart3,
      title: 'Security Dashboard',
      description: 'Monitor your security score and track improvements over time.'
    }
  ];

  const stats = [
    { number: '90%', label: 'of SMEs are vulnerable to cyber attacks' },
    { number: '40%', label: 'of SMEs contribute to Kenya\'s GDP' },
    { number: '80%', label: 'of workforce employed by SMEs' },
    { number: '24/7', label: 'protection and monitoring' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SME SecuAware</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Protect Your SME from Cyber Threats
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              A comprehensive cybersecurity awareness and protection platform designed specifically for Small and Medium Enterprises in Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register" className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                Start Free Assessment
              </Link>
              <Link href="#features" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-lg text-lg transition-colors">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Cybersecurity Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything your SME needs to stay protected from cyber threats, designed with Kenyan businesses in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Why Choose SME SecuAware?
              </h2>
              <div className="space-y-4">
                {[
                  'Tailored specifically for Kenyan SMEs',
                  'Affordable and easy-to-use platform',
                  'Regular threat updates and alerts',
                  'Comprehensive security education',
                  'Industry-specific recommendations',
                  'Multilingual support (coming soon)'
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-success-600 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-6">
                Join hundreds of Kenyan SMEs already protecting their businesses with SecuAware.
              </p>
              <Link href="/register" className="btn-primary w-full text-center block">
                Create Free Account
              </Link>
              <p className="text-sm text-gray-500 text-center mt-4">
                No credit card required • Free security assessment
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-primary-400" />
                <span className="ml-2 text-xl font-bold">SME SecuAware</span>
              </div>
              <p className="text-gray-400">
                Protecting Kenyan SMEs from cyber threats through education, awareness, and practical security solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Security Assessment</li>
                <li>Threat Alerts</li>
                <li>Education Center</li>
                <li>Dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Getting Started</li>
                <li>Documentation</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
            <p>&copy; 2025 SME SecuAware. All rights reserved. Built for Kenyan SMEs.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}